import React, {Suspense} from 'react';
import Requester from '@dakataa/requester';
import ErrorBoundary from "@src/component/error/ErrorBoundary.tsx";
import Error from "@src/layout/default/Error.tsx";
import CrudLoader from "@src/CrudLoader.tsx";
import CrudContext from "@src/CrudContext.tsx";
import Exception from "@src/component/error/Exception.tsx";

let requester: Requester;
export const CRUD_NAMESPACE = 'dakataa_crud';

const CrudConfiguration = (apiBasePath: string) => {
    Requester.namespace[CRUD_NAMESPACE] = {
        baseURL: apiBasePath,
        headers: {
            Accept: 'application/json'
        }
    };
}

const CrudRequester = (): Requester => {
    if(!requester) {
        requester = new Requester({}, CRUD_NAMESPACE);
    }
    return requester;
}

const Crud = () => {

    if (!Requester.namespace[CRUD_NAMESPACE])
        throw new Exception(500, 'Invalid Configuration.');

    return (
        <CrudContext>
            <ErrorBoundary fallback={<Error/>}>
                <Suspense fallback={<>Loading</>}>
                    <CrudLoader/>
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
