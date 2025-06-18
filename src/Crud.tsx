import React, {ReactElement} from 'react';
import Requester, {Config as RequesterConfig} from '@dakataa/requester';
import ErrorBoundary from "@src/component/error/ErrorBoundary.tsx";
import Error from "@src/layout/default/Error.tsx";
import CrudLoader from "@src/component/crud/CrudLoader.tsx";
import CrudProvider from "@src/context/CrudProvider.tsx";
import {Config, Templates} from "@src/context/ConfigContext.tsx";
import {UseActions, WithRouterContext} from "@src/context/ActionContext.tsx";

let requester: Requester;
const globalConfig: { templates?: Templates } = {};

export const CRUD_NAMESPACE = 'dakataa_crud';

const CrudConfiguration = ({connection, templates}: { connection: RequesterConfig, templates?: Templates }) => {
    Requester.namespace[CRUD_NAMESPACE] = connection;
    globalConfig.templates = templates;
}

const CrudRequester = (): Requester => {
    if (!requester) {
        requester = Requester.instance({namespace: CRUD_NAMESPACE});
    }

    return requester;
}

const Crud = WithRouterContext((
    {path, prefix, errorFallback, config}: {
        path?: string,
        prefix?: string,
        errorFallback?: ReactElement,
        config?: Config
    }) => {

    const {location} = UseActions();
    path ??= location.pathname;

    if (prefix) {
        path = path.replace(new RegExp('^/' + prefix.replace(new RegExp('^/'), '') + '(/)?'), '/');
    }

    const templates = Object.assign(globalConfig.templates ?? {}, config?.templates ?? {});

    return (
        <ErrorBoundary key={path} fallback={errorFallback ?? <Error/>}>
            <CrudProvider config={{...(config || {}), templates, link: {prefix}}}>
                <CrudLoader path={path}/>
            </CrudProvider>
        </ErrorBoundary>
    );
});

export {
    CrudConfiguration,
    CrudRequester
};

export default Crud;
