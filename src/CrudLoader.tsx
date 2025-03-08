import ViewLoader from "@src/component/ViewLoader.tsx";
import React, {use} from "react";
import {UseActions} from "@src/context/ActionContext.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import {UseCurrentReactRoute} from "@src/helper/RouterUtils.tsx";

const CrudLoader = ({path}: { path?: string }) => {
    const currentRoute = UseCurrentReactRoute();

    path ??= document.location.pathname.replace(new RegExp('^' + currentRoute?.pathnameBase + '(/)?'), '/');

    const {getOnClickActionByPath} = UseActions();
    const onClickAction = use(getOnClickActionByPath(path));
    if (!onClickAction) {
        throw new HttpException(404, 'Missing Route');
    }

    return (
        <ViewLoader
            view={onClickAction.action.name}
            namespace={onClickAction.action.namespace || ''}
            props={{action: onClickAction}}
        />
    );
}

export default CrudLoader;
