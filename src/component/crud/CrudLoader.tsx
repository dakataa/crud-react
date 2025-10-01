import {ViewLoader} from "@src/component/crud/ViewLoader.tsx";
import React, {PropsWithChildren, ReactElement} from "react";
import {UseActions} from "@src/context/ActionContext.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import {OnClickAction} from "@src/component/crud/GridView.tsx";
import Requester from "@dakataa/requester";
import Exception from "@src/component/error/Exception.tsx";
import {CRUD_NAMESPACE} from "@src/Crud.tsx";
import {NamespaceProvider} from "@src/context/NamespaceContext.tsx";
import {DataProvider} from "@src/context/GetData.tsx";
import {UseConfig} from "@src/context/ConfigContext.tsx";

const CurrentActionContext = React.createContext<OnClickAction | undefined>(undefined);

export function UseCurrentAction(): OnClickAction {
    const action = React.useContext<OnClickAction | undefined>(CurrentActionContext);
    if (!action) {
        throw new Error('UseCurrentAction must be used in CurrentActionProvider');
    }

    return action;
}

export function CurrentActionProvider({action, ...props}: { action: OnClickAction } & PropsWithChildren) {
    const {getAction} = UseActions();

    const routeAction = getAction(action.action.entity, action.action.name, action.action.namespace);
    if (!routeAction) {
        throw new Error('Invalid Current Action');
    }

    const currentAction: OnClickAction = {
        ...action,
        action: routeAction
    }

    return (
        <CurrentActionContext.Provider value={currentAction}>
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
    path ??= link?.path ?? location.pathname;

    if (link?.prefix) {
        path = path.replace(new RegExp('^/' + link.prefix.replace(new RegExp('^/'), '') + '(/)?'), '/');
    }

    const {getOnClickActionByPath} = UseActions();
    const onClickAction = getOnClickActionByPath(path);

    if (onClickAction === undefined) {
        return preloader ?? <>Loading</>
    }

    if (onClickAction === null) {
        throw new HttpException(404, 'Page Not Found');
    }

    return (
        <CurrentActionProvider action={onClickAction}>
            <DataProvider key={path}>
                <ViewLoader view={onClickAction.action.name}/>
            </DataProvider>
        </CurrentActionProvider>
    );
}

export default CrudLoader;
