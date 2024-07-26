import React, {PropsWithChildren, useEffect, useState} from "react";
import {ActionType} from "@src/type/ActionType.tsx";
import Requester from "requester";
import {matchPath} from "react-router-dom";
import {crudToReactPath} from "@src/component/Router.tsx";

const STORAGE_KEY = 'actions';
const ActionContext = React.createContext<ControllerActionType | null>(null);
type ControllerActionType = {
    [key: string]: ActionType[]
}

export function useActions() {
    const context = React.useContext<ControllerActionType | null>(ActionContext);

    const getController = (): string | null => {
        return (Object.entries(context || {}).filter(([controller, list]) => {
            return list.filter((r) => r.route?.path && matchPath(crudToReactPath(r.route.path), document.location.pathname)).length;
        }).shift() || [null])[0];
    }

    return [
        context,
        getController(),
    ];
}

export function ActionProvider(props: PropsWithChildren) {
    let initActions: ControllerActionType | null = null;
    try {
        const data = sessionStorage.getItem(STORAGE_KEY);
        initActions = JSON.parse(atob(data || '')) as ControllerActionType;
    } catch (e) {

    }

    const [actions, setActions] = useState<ControllerActionType | null>(initActions);
    useEffect(() => {
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
