import {ViewLoader} from "@src/component/crud/ViewLoader.tsx";
import React, {PropsWithChildren, ReactElement, useEffect, useReducer, useState} from "react";
import {UseActions} from "@src/context/ActionContext.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import Requester from "@dakataa/requester";
import Exception from "@src/component/error/Exception.tsx";
import {CRUD_NAMESPACE} from "@src/Crud.tsx";
import {NamespaceProvider} from "@src/context/NamespaceContext.tsx";
import {DataProvider} from "@src/context/GetData.tsx";
import {UseConfig} from "@src/context/ConfigContext.tsx";
import {OnClickAction} from "@src/type/OnClickAction.tsx";

type CurrentActionContextType = {
    action: OnClickAction,
    setAction: (action: OnClickAction) => void;
    refresh: () => void;
}

type CurrentActionCollectionContextType = {
    set: (key: string, context: CurrentActionContextType) => void,
    get: (key: string) => CurrentActionContextType | null,
    unset: (key: string) => void,
}

const CurrentActionCollectionContext = React.createContext<CurrentActionCollectionContextType | undefined>(undefined);

export function CurrentActionCollectionProvider({children}: PropsWithChildren) {
    const [actions, dispatch] = useReducer((state: { [key: string]: CurrentActionContextType }, {key, context}: {
        key: string,
        context?: CurrentActionContextType
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
            set: (key: string, context: CurrentActionContextType) => dispatch({key, context}),
            get: (key: string): CurrentActionContextType | null => actions[key] || null,
            unset: (key) => {
                dispatch({key});
            },
        }}>
            {children}
        </CurrentActionCollectionContext.Provider>
    )
}

export function UseCurrentActionCollection(): CurrentActionCollectionContextType {
    const context = React.useContext<CurrentActionCollectionContextType | undefined>(CurrentActionCollectionContext);
    if (!context) {
        throw new Error('UseCurrentActionCollection must be used in CurrentActionCollectionProvider');
    }

    return context;
}


const CurrentActionContext = React.createContext<CurrentActionContextType | undefined>(undefined);

export function UseCurrentAction(): CurrentActionContextType {
    const context = React.useContext<CurrentActionContextType | undefined>(CurrentActionContext);
    if (!context) {
        throw new Error('UseCurrentAction must be used in CurrentActionProvider');
    }

    return context;
}

export function CurrentActionProvider({action, name, ...props}: {
    action: OnClickAction,
    name?: string
} & PropsWithChildren) {
    const {getAction} = UseActions();

    const {set, unset} = UseCurrentActionCollection();

    name ??= [action.action.entity, action.action.name, action.action.namespace].join('-');
    const routeAction = getAction(action.action.entity, action.action.name, action.action.namespace);
    if (!routeAction) {
        throw new Error('Invalid Current Action');
    }

    action = {
        ...action,
        action: routeAction
    };


    const [update, setUpdate] = useState(1);
    const [currentAction, setCurrentAction] = useState(action);
    const context = {
        action: currentAction,
        setAction: setCurrentAction,
        refresh: () => {
            setUpdate(Date.now());
        }
    };

    useEffect(() => {
        setCurrentAction({...action, query: { ...action.query, _ts: update}});
    }, [update]);

    useEffect(() => {
        setCurrentAction(action);
    }, [JSON.stringify(action)])

    useEffect(() => {
        set(name, context);
        return () => {
            unset(name);
        }
    }, []);

    return (
        <CurrentActionContext.Provider value={context}>
            <NamespaceProvider namespace={currentAction.action.namespace || ''}>
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
    path ??= link?.path ?? (location.pathname + location.search);

    if (link?.prefix) {
        path = path.replace(new RegExp('^/' + link.prefix.replace(new RegExp('^/'), '') + '(/)?'), '/');
    }

    const {getOnClickActionByPath, actions} = UseActions();
    const [action, setAction] = useState<OnClickAction | undefined | null>(undefined);

    useEffect(() => {
        setAction(getOnClickActionByPath(path));
    }, [path, JSON.stringify(actions)]);

    useEffect(() => {
        if (action !== null) {
            return;
        }

        throw new HttpException(404, 'Not Found');
    }, [action]);

    if (action === undefined) {
        return preloader ?? <>Loading</>
    }

    if (action === null) {
        return null;
    }

    return (
        <CurrentActionProvider action={action}>
            <DataProvider>
                <ViewLoader view={action.action.name}/>
            </DataProvider>
        </CurrentActionProvider>
    );
}

export default CrudLoader;
