import React, {PropsWithChildren, useEffect, useState} from "react";
import {ActionType} from "@src/type/ActionType.tsx";
import Requester from "requester";
import {matchPath} from "react-router-dom";
import {crudToReactPath} from "@src/helper/RouterUtils.tsx";

const STORAGE_KEY = 'actions';
const ActionContext = React.createContext<ActionType[] | null>(null);

export function useActions() {
    const context = React.useContext<ActionType[] | null>(ActionContext);

    const getActionByPath = (path: string): ActionType | undefined => {
        return context?.find((a) => a.route?.path && matchPath(crudToReactPath(a.route.path), path));
    };

    const getAction = (entity: string, name: string, namespace?: string): ActionType | undefined => {
        return context?.filter(a => a.entity === entity && a.name === name && (namespace === undefined || a.namespace === namespace)).shift();
    }

    const getEntity = (): string | undefined => {
        return getActionByPath(document.location.pathname)?.entity;
    }

    return {
        actions: context,
        getEntity,
        getActionByPath,
        getAction
    };
}

export function ActionProvider(props: PropsWithChildren) {
    let initActions: ActionType[] | null = null;
    try {
        const data = sessionStorage.getItem(STORAGE_KEY);
        initActions = JSON.parse(atob(data || '')) as ActionType[];
    } catch (e) {

    }

    const [actions, setActions] = useState<ActionType[] | null>(initActions);
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
