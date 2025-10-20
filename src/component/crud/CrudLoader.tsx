import {ViewLoader} from "@src/component/crud/ViewLoader.tsx";
import React, {PropsWithChildren, ReactElement, useEffect, useState} from "react";
import {UseActions} from "@src/context/ActionContext.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import {OnClickAction} from "@src/component/crud/GridView.tsx";
import Requester from "@dakataa/requester";
import Exception from "@src/component/error/Exception.tsx";
import {CRUD_NAMESPACE} from "@src/Crud.tsx";
import {NamespaceProvider} from "@src/context/NamespaceContext.tsx";
import {DataProvider} from "@src/context/GetData.tsx";
import {UseConfig} from "@src/context/ConfigContext.tsx";

type CurrentActionContextType = {
    action: OnClickAction,
    setAction: (action: OnClickAction) => void;
}

const CurrentActionContext = React.createContext<CurrentActionContextType | undefined>(undefined);

export function UseCurrentAction(): CurrentActionContextType {
    const context = React.useContext<CurrentActionContextType | undefined>(CurrentActionContext);
    if (!context) {
        throw new Error('UseCurrentAction must be used in CurrentActionProvider');
    }

    return context;
}

export function CurrentActionProvider({action, ...props}: { action: OnClickAction } & PropsWithChildren) {
    const {getAction} = UseActions();

    const routeAction = getAction(action.action.entity, action.action.name, action.action.namespace);
    if (!routeAction) {
        throw new Error('Invalid Current Action');
    }

    action = {
        ...action,
        action: routeAction
    };

    const [currentAction, setCurrentAction] = useState(action);

    useEffect(() => {
        setCurrentAction(action);
    }, [JSON.stringify(action)])

    return (
        <CurrentActionContext.Provider value={{action: currentAction, setAction: setCurrentAction}}>
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

    const {getOnClickActionByPath} = UseActions();
    const action = getOnClickActionByPath(path);

    if (action === undefined) {
        return preloader ?? <>Loading</>
    }

    if (action === null) {
        throw new HttpException(404, 'Page Not Found');
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
