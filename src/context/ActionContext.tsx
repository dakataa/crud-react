import React, {PropsWithChildren, useEffect, useState} from "react";
import {ActionType} from "@src/type/ActionType.tsx";
import Requester from "requester";
import {matchPath} from "react-router-dom";
import {crudToReactPath} from "@src/helper/RouterUtils.tsx";

const STORAGE_KEY = 'actions';
const ActionContext = React.createContext<EntityActionType | null>(null);
type EntityActionType = {
    [key: string]: ActionType[]
}

export function useActions() {
    const context = React.useContext<EntityActionType | null>(ActionContext);

    const getActionByPath = (path: string): ActionType | undefined => {
        const action = Object.entries(context || {}).map(([entity, list]) => {
            return list.filter((a) => a.route?.path && matchPath(crudToReactPath(a.route.path), path));
        }).filter(v => v.length);

        return action.shift()?.shift();
    };

    const getAction = (entity: string, actionName: string): ActionType | undefined => {
        return (context ? context[entity] : []).filter(a => a.name === actionName).shift();
    }

    const getEntity = (): string | null => {
        return (Object.entries(context || {}).filter(([entity, list]) => {
            return list.filter((r) => r.route?.path && matchPath(crudToReactPath(r.route.path), document.location.pathname)).length;
        }).shift() || [null])[0];
    }

    return {
        actions: context,
        getEntity,
        getActionByPath,
        getAction
    };
}

export function ActionProvider(props: PropsWithChildren) {
    let initActions: EntityActionType | null = null;
    try {
        const data = sessionStorage.getItem(STORAGE_KEY);
        initActions = JSON.parse(atob(data || '')) as EntityActionType;
    } catch (e) {

    }

    const [actions, setActions] = useState<EntityActionType | null>(initActions);
    useEffect(() => {
        if (initActions)
            return;

        (new Requester()).get('/_crud/actions', {}).then((response) => {
            if (response.status !== 200) {
                return;
            }

            response.getData().then((data) => {
                sessionStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(data)));
                setActions(data);
            });
        }).catch((e) => {
            console.log('error', e);
        }).finally(() => {

        });
    }, []);

    return (
        <ActionContext.Provider value={actions}>
            {props.children}
        </ActionContext.Provider>
    );
}
