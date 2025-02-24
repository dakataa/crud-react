import React from 'react';
import {Route, Routes} from "react-router";
import Requester from '@dakataa/requester';
import Default from "@src/layout/default/Main.tsx";
import {crudToReactPath} from "@src/helper/RouterUtils.tsx";
import {ActionType} from "@src/type/ActionType";
import ViewLoader from "@src/component/ViewLoader";
import {UseActions} from "@src/context/ActionContext.tsx";
import Auth from "@src/layout/default/Auth.tsx";
import {isRouteErrorResponse} from "react-router-dom";
import {ErrorBoundary} from "@src/ErrorBoundary.tsx";

Requester.defaults = {
    baseURL: import.meta.env.CRUD_API_BASE_URL,
    headers: {
        Accept: 'application/json'
    }
};

function Crud() {
    const {actions} = UseActions();

    return (
        <Routes>
            <Route path={"/auth"} element={<Auth/>}>

            </Route>
            <Route element={<Default/>}>
                {actions?.filter((a: ActionType) => a.route !== undefined).map((action: ActionType, index: number) => {
                    return (
                        <Route
                            key={index}
                            path={crudToReactPath(action.route?.path || '')}
                            element={
                                <ViewLoader
                                    view={action.name || ''}
                                    namespace={action.namespace || ''}
                                    props={{action}}
                                />
                            }
                        />
                    )
                })
                }
            </Route>
        </Routes>
    );
}

export default Crud;
