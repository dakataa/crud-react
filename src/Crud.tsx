import React, {PropsWithChildren, ReactElement} from 'react';
import Requester, {Config as RequesterConfig} from '@dakataa/requester';
import ErrorBoundary from "@src/component/error/ErrorBoundary.tsx";
import Error from "@src/layout/default/Error.tsx";
import CrudProvider from "@src/context/CrudProvider.tsx";
import {Config, Templates} from "@src/context/ConfigContext.tsx";
import {ActionProvider} from "@src/context/ActionContext.tsx";

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

const Crud = (
    {children, config, errorFallback}: {
        errorFallback?: ReactElement,
        config?: Config
    } & PropsWithChildren) => {

    const templates = Object.assign(globalConfig.templates ?? {}, config?.templates ?? {});

    return (
        <ActionProvider>
            <ErrorBoundary fallback={errorFallback ?? <Error/>}>
                <CrudProvider config={{...(config || {}), templates}}>
                    {children}
                </CrudProvider>
            </ErrorBoundary>
        </ActionProvider>
    );
};

export {
    CrudConfiguration,
    CrudRequester
};

export default Crud;
