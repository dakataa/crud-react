import React, {ReactElement, Suspense} from 'react';
import Requester, {Config} from '@dakataa/requester';
import ErrorBoundary from "@src/component/error/ErrorBoundary.tsx";
import Error from "@src/layout/default/Error.tsx";
import CrudLoader from "@src/CrudLoader.tsx";
import CrudContext from "@src/CrudContext.tsx";
import Exception from "@src/component/error/Exception.tsx";

let requester: Requester;
export const CRUD_NAMESPACE = 'dakataa_crud';

const CrudConfiguration = (config: Config) => {
    Requester.namespace[CRUD_NAMESPACE] = config;
}

const CrudRequester = (): Requester => {
    if(!requester) {
        requester = new Requester({}, CRUD_NAMESPACE);
    }
    return requester;
}

const Crud = ({path, errorFallback}: { path?: string, errorFallback?: ReactElement }) => {
    if (!Requester.namespace[CRUD_NAMESPACE])
        throw new Exception(500, 'Invalid Configuration.');

    return (
        <CrudContext>
            <ErrorBoundary fallback={errorFallback ?? <Error/>}>
                <Suspense fallback={<>Loading</>}>
                    <CrudLoader path={path}/>
                </Suspense>
            </ErrorBoundary>
        </CrudContext>
    );
}

export {
    Crud as default,
    CrudConfiguration,
    CrudRequester
};
