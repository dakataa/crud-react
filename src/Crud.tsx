import React from 'react';
import {Route, Routes} from "react-router";
import Requester from 'requester';
import Default from "@src/layout/default";
import {crudToReactPath} from "@src/helper/RouterUtils.tsx";
import {ActionType} from "@src/type/ActionType";
import ViewLoader from "@src/component/ViewLoader";
import {useActions} from "@src/context/ActionContext.tsx";

Requester.defaults = {
    baseURL: import.meta.env.CRUD_API_BASE_URL,
    headers: {
        Accept: 'application/json'
    }
};

function Crud() {

    const {actions} = useActions();

    return (
        <Default>
            <Routes>
                {actions?.filter((a: ActionType) => a.route !== undefined).map((action: ActionType, index: number) => {
                        return (
                            <Route key={index}
                                   path={crudToReactPath(action.route?.path || '')}
                                   element={<ViewLoader action={action}/>}
                            />
                        )
                    })
                }
            </Routes>
        </Default>
    );
}


export default Crud;
