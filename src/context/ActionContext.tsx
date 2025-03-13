import React, {PropsWithChildren, useEffect, useState} from "react";
import {ActionType} from "@src/type/ActionType.tsx";
import {matchPath} from "react-router";
import {crudToReactPathPattern} from "@src/helper/RouterUtils.tsx";
import {OnClickAction} from "@src/component/crud/GridTableView.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import {CrudRequester} from "@src/Crud.tsx";

const STORAGE_KEY = 'actions';
const ActionContext = React.createContext<ActionType[] | null>(null);

export function UseActions() {
    const context = React.useContext<ActionType[] | null>(ActionContext);

    const getContext = (): ActionType[] | undefined => {
        if(!Array.isArray(context)) {
            return;
        }

        return context;
    }

    const getAction = (entity: string, name: string, namespace?: string): ActionType | undefined => {
        return getContext()?.filter(a => a.entity === entity && a.name === name && (namespace === undefined || a.namespace === namespace)).shift();
    }

    const getActionByPath = (path: string): ActionType | undefined => {
        return getContext()?.find((a) => a.route?.path && matchPath(crudToReactPathPattern(a.route.path), path));
    };

    const getOnClickActionByPath = (path: string): Promise<OnClickAction> => {
        const getOnClickAction = () => {
            const action = getActionByPath(path);

            if(!action)
                throw new HttpException(404, 'Page not found.');

            const match = matchPath(crudToReactPathPattern(action.route?.path || ''), path)
            return {
                action,
                parameters: match?.params
            };
        }

        return new Promise<OnClickAction>((resolve, reject) => {
            let retries = 0;
            const timeout = () => {
                if(retries > 10) {
                    throw new HttpException(500, 'Cannot load routes');
                }

                if(context) {
                    return resolve(getOnClickAction());
                }

                setTimeout(timeout, 200);
                retries++;
            }

            timeout();
        });

    }

    return {
        getAction,
        getActionByPath,
        getOnClickActionByPath
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

        CrudRequester().get('/_crud/actions', {}).then((response) => {
            if (response.status !== 200) {
                return;
            }

            response.getData().then((data: ActionType[]) => {
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
