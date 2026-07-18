import React, {PropsWithChildren, ReactElement} from 'react';
import Requester, {Config as RequesterConfig} from '@dakataa/requester';
import ErrorBoundary from "@crud-react/component/error/ErrorBoundary.tsx";
import Error from "@crud-react/layout/default/Error.tsx";
import CrudProvider from "@crud-react/context/CrudProvider.tsx";
import {Config, Environment, Templates} from "@crud-react/context/ConfigContext.tsx";
import {ActionProvider} from "@crud-react/context/ActionContext.tsx";
import {CurrentActionCollectionProvider} from "@crud-react/component/crud/CrudLoader.tsx";

let requester: Requester | null = null;
const globalConfig: { templates?: Templates } = {};

export const CRUD_NAMESPACE = 'dakataa_crud';

const CrudConfiguration = ({connection, templates}: { connection: RequesterConfig, templates?: Templates }) => {
    Requester.namespace[CRUD_NAMESPACE] = connection;
    globalConfig.templates = templates;

    // Reset
    requester = null;
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
            <CurrentActionCollectionProvider>
                <ErrorBoundary fallback={errorFallback ?? <Error/>}>
                    <CrudProvider config={{...(config || {env: Environment.DEV}), templates}}>
                        {children}
                    </CrudProvider>
                </ErrorBoundary>
            </CurrentActionCollectionProvider>
        </ActionProvider>
    );
};

export {
    CrudConfiguration,
    CrudRequester
};

export default Crud;
