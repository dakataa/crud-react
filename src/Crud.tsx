import React, {ReactElement} from 'react';
import Requester, {Config} from '@dakataa/requester';
import ErrorBoundary from "@src/component/error/ErrorBoundary.tsx";
import Error from "@src/layout/default/Error.tsx";
import CrudLoader from "@src/CrudLoader.tsx";
import CrudContext from "@src/CrudContext.tsx";
import {ConfigProvider} from "@src/context/ConfigContext.tsx";
import {UseActions, withRouterContext} from "@src/context/ActionContext.tsx";

let requester: Requester;

export const CRUD_NAMESPACE = 'dakataa_crud';

const CrudConfiguration = ({connection}: { connection: Config }) => {
    Requester.namespace[CRUD_NAMESPACE] = connection;

}

const CrudRequester = (): Requester => {
    if (!requester) {
        requester = Requester.instance({namespace: CRUD_NAMESPACE});
    }
    return requester;
}

const Crud = withRouterContext(({path, prefix, errorFallback}: {
    path?: string,
    prefix?: string,
    errorFallback?: ReactElement
}) => {

    const {location} = UseActions();
    path ??= location.pathname;

    if (prefix) {
        path = path.replace(new RegExp('^/' + prefix.replace(new RegExp('^/'), '') + '(/)?'), '/');
    }

    return (
        <ConfigProvider config={{
            link: {
                prefix: prefix,
            }
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
