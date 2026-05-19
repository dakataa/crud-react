import {ViewLoader} from "@src/component/crud/ViewLoader.tsx";
import React, {PropsWithChildren, ReactElement, useEffect, useImperativeHandle, useReducer, useState} from "react";
import {UseActions} from "@src/context/ActionContext.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import Requester from "@dakataa/requester";
import Exception from "@src/component/error/Exception.tsx";
import {CRUD_NAMESPACE} from "@src/Crud.tsx";
import {NamespaceProvider} from "@src/context/NamespaceContext.tsx";
import {DataProvider} from "@src/context/GetData.tsx";
import {UseConfig} from "@src/context/ConfigContext.tsx";
import {ActionRequestType} from "../../type/ActionRequestType.tsx";

type CurrentActionRequestContextType = {
    actionRequest: ActionRequestType,
    setActionRequest: (actionRequest: ActionRequestType) => void;
    refresh: () => void;
}

type CurrentActionRequestCollectionContextType = {
    set: (key: string, context: CurrentActionRequestContextType) => void,
    get: (key: string) => CurrentActionRequestContextType | null,
    unset: (key: string) => void,
}

const CurrentActionCollectionContext = React.createContext<CurrentActionRequestCollectionContextType | undefined>(undefined);

export function CurrentActionCollectionProvider({children}: PropsWithChildren) {
    const [actions, dispatch] = useReducer((state: { [key: string]: CurrentActionRequestContextType }, {key, context}: {
        key: string,
        context?: CurrentActionRequestContextType
    }) => {
        state = {...state};
        if (context) {
            state[key] = context;
        } else {
            delete state[key];
        }

        return state;
    }, {})

    return (
        <CurrentActionCollectionContext.Provider value={{
            set: (key: string, context: CurrentActionRequestContextType) => dispatch({key, context}),
            get: (key: string): CurrentActionRequestContextType | null => actions[key] || null,
            unset: (key) => {
                dispatch({key});
            },
        }}>
            {children}
        </CurrentActionCollectionContext.Provider>
    )
}

export function UseCurrentActionCollection(): CurrentActionRequestCollectionContextType {
    const context = React.useContext<CurrentActionRequestCollectionContextType | undefined>(CurrentActionCollectionContext);
    if (!context) {
        throw new Error('UseCurrentActionCollection must be used in CurrentActionCollectionProvider');
    }

    return context;
}


const CurrentActionContext = React.createContext<CurrentActionRequestContextType | undefined>(undefined);

export function UseCurrentActionRequest(): CurrentActionRequestContextType {
    const context = React.useContext<CurrentActionRequestContextType | undefined>(CurrentActionContext);
    if (!context) {
        throw new Error('UseCurrentActionRequest must be used in CurrentActionRequestProvider');
    }

    return context;
}

export type CurrentActionRequestProviderRef = {
    refresh: () => void
};

export function CurrentActionRequestProvider({actionRequest, name, ref, ...props}: {
    actionRequest: ActionRequestType,
    name?: string,
    ref?: React.Ref<CurrentActionRequestProviderRef>
} & PropsWithChildren) {
    const {getAction} = UseActions();
    const {set, unset} = UseCurrentActionCollection();

    name ??= [actionRequest.action.entity, actionRequest.action.name, actionRequest.action.namespace].join('-');
    const action = getAction(actionRequest.action.entity, actionRequest.action.name, actionRequest.action.namespace);
    if (!action) {
        console.log('Invalid Action Request', actionRequest);
        throw new Error('Invalid Current Action Request');
    }

    actionRequest = {
        ...actionRequest,
        action: action
    };

    const refresh = () => {
        setUpdate(Date.now());
    }

    useImperativeHandle(ref, () => {
        return {
            refresh
        }
    }, []);

    const [update, setUpdate] = useState(1);
    const [currentActionRequest, setCurrentActionRequest] = useState(actionRequest);
    const context = {
        actionRequest: currentActionRequest,
        setActionRequest: setCurrentActionRequest,
        refresh
    };

    useEffect(() => {
        setCurrentActionRequest({...actionRequest, query: { ...actionRequest.query, _ts: update}});
    }, [update]);

    useEffect(() => {
        setCurrentActionRequest(actionRequest);
    }, [JSON.stringify(actionRequest)])

    useEffect(() => {
        set(name, context);
        return () => {
            unset(name);
        }
    }, []);

    return (
        <CurrentActionContext.Provider value={context}>
            <NamespaceProvider namespace={currentActionRequest.action.namespace || ''}>
                {props.children}
            </NamespaceProvider>
        </CurrentActionContext.Provider>
    );
}

const CrudLoader = ({path, preloader}: {
    path?: string,
    errorFallback?: ReactElement,
    preloader?: ReactElement
}) => {
    if (!Requester.namespace[CRUD_NAMESPACE])
        throw new Exception(500, 'Invalid Configuration.');

    const {link} = UseConfig();
    const {getActionRequestByPath, actions} = UseActions();
    const [actionRequest, setActionRequest] = useState<ActionRequestType | undefined | null>(undefined);
    const currentKey = actionRequest ? [
        actionRequest.action.entity,
        actionRequest.action.namespace,
        actionRequest.action.name
    ].filter(v => v).join('-') : Date.now().toString();

    path ??= link?.path ?? (location.pathname + location.search);

    if (link?.prefix) {
        path = path.replace(new RegExp('^/' + link.prefix.replace(new RegExp('^/'), '') + '(/)?'), '/');
    }

    useEffect(() => {
        setActionRequest(getActionRequestByPath(path));
    }, [path, JSON.stringify(actions)]);

    useEffect(() => {
        if (actionRequest !== null) {
            return;
        }

        throw new HttpException(404, 'Not Found');
    }, [actionRequest]);

    if (actionRequest === undefined) {
        return preloader ?? <>Loading</>
    }

    if (actionRequest === null) {
        return null;
    }

    return (
        <CurrentActionRequestProvider key={currentKey} actionRequest={actionRequest}>
            <DataProvider>
                <ViewLoader view={actionRequest.action.name}/>
            </DataProvider>
        </CurrentActionRequestProvider>
    );
}

export default CrudLoader;
