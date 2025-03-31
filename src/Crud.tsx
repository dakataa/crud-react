import React, {ReactElement} from 'react';
import Requester, {Config as RequesterConfig} from '@dakataa/requester';
import ErrorBoundary from "@src/component/error/ErrorBoundary.tsx";
import Error from "@src/layout/default/Error.tsx";
import CrudLoader from "@src/CrudLoader.tsx";
import CrudContext from "@src/CrudContext.tsx";
import {ConfigProvider, Templates} from "@src/context/ConfigContext.tsx";
import {UseActions, withRouterContext} from "@src/context/ActionContext.tsx";

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

const Crud = withRouterContext(({path, prefix, errorFallback, templates}: {
    path?: string,
    prefix?: string,
    errorFallback?: ReactElement,
    templates?: { [path: string]: () => Promise<any> }
}) => {

    const {location} = UseActions();
    path ??= location.pathname;

    if (prefix) {
        path = path.replace(new RegExp('^/' + prefix.replace(new RegExp('^/'), '') + '(/)?'), '/');
    }

    templates = Object.assign(globalConfig.templates ?? {}, templates ?? {});

    return (
        <ConfigProvider config={{
            link: {
                prefix
            },
            templates
        }}>
            <CrudContext>
                <ErrorBoundary key={path} fallback={errorFallback ?? <Error/>}>
                    <CrudLoader path={path}/>
                </ErrorBoundary>
            </CrudContext>
        </ConfigProvider>
    );
});

export {
    Crud as default,
    CrudConfiguration,
    CrudRequester
};
