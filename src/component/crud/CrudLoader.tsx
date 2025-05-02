import {ViewLoader} from "@src/component/crud/ViewLoader.tsx";
import React, {ReactElement, useEffect, useState} from "react";
import {UseActions} from "@src/context/ActionContext.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import {OnClickAction} from "@src/component/crud/GridView.tsx";
import Requester from "@dakataa/requester";
import Exception from "@src/component/error/Exception.tsx";
import {CRUD_NAMESPACE} from "@src/Crud.tsx";
import {NamespaceProvider} from "@src/context/NamespaceContext.tsx";

const CrudLoader = ({path, preloader}: {
    path: string,
    errorFallback?: ReactElement,
    preloader?: ReactElement
}) => {
    if (!Requester.namespace[CRUD_NAMESPACE])
        throw new Exception(500, 'Invalid Configuration.');

    const {getOnClickActionByPath} = UseActions();
    const [onClickAction, setOnClickAction] = useState<OnClickAction | null | undefined>();

    useEffect(() => {
        getOnClickActionByPath(path).then((v) => setOnClickAction(v));
    }, [path]);

    if (onClickAction === undefined) {
        return preloader ?? <>Loading</>
    }

    if (!onClickAction) {
        throw new HttpException(404, 'Page Not Found');
    }

    return (
        <NamespaceProvider namespace={onClickAction.action.namespace || ''}>
            <ViewLoader
                view={onClickAction.action.name}
                props={{action: onClickAction}}
            />
        </NamespaceProvider>
    );
}

export default CrudLoader;
