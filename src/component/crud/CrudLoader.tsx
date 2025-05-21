import {ViewLoader} from "@src/component/crud/ViewLoader.tsx";
import React, {PropsWithChildren, ReactElement, useEffect, useState} from "react";
import {UseActions} from "@src/context/ActionContext.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import {OnClickAction} from "@src/component/crud/GridView.tsx";
import Requester from "@dakataa/requester";
import Exception from "@src/component/error/Exception.tsx";
import {CRUD_NAMESPACE} from "@src/Crud.tsx";
import {NamespaceProvider} from "@src/context/NamespaceContext.tsx";

const CurrentActionContext = React.createContext<OnClickAction|undefined>(undefined);

export function UseCurrentAction(): OnClickAction {
    const action =  React.useContext<OnClickAction|undefined>(CurrentActionContext);
    if(!action) {
        throw new Error('UseCurrentAction must be used in CurrentActionProvider');
    }

    return action;
}

export function CurrentActionProvider({action, ...props}: { action: OnClickAction } & PropsWithChildren) {
    return (
        <CurrentActionContext.Provider value={action}>
            {props.children}
        </CurrentActionContext.Provider>
    );
}

const CrudLoader = ({path, preloader}: {
    path: string,
    errorFallback?: ReactElement,
    preloader?: ReactElement
}) => {
    if (!Requester.namespace[CRUD_NAMESPACE])
        throw new Exception(500, 'Invalid Configuration.');

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
            <NamespaceProvider namespace={onClickAction.action.namespace || ''}>
                <ViewLoader view={onClickAction.action.name}/>
            </NamespaceProvider>
        </CurrentActionProvider>
    );
}

export default CrudLoader;
