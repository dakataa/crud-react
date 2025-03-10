import React, {Suspense} from 'react';
import Requester from '@dakataa/requester';
import ErrorBoundary from "@src/component/error/ErrorBoundary.tsx";
import Error from "@src/layout/default/Error.tsx";
import CrudLoader from "@src/CrudLoader.tsx";
import CrudContext from "@src/CrudContext.tsx";

Requester.defaults = {
    baseURL: import.meta.env.CRUD_API_BASE_URL,
    headers: {
        Accept: 'application/json'
    }
};


const Crud = () => {

    console.log('crud');
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

export default Crud;
