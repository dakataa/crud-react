import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router";
import Requester from 'requester';
import Default from "@src/layout/default";
import {crudToReactPath} from "@src/component/Router";
import {ActionType} from "@src/type/ActionType";
import ViewLoader from "@src/component/ViewLoader";

Requester.defaults = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        Accept: 'application/json'
    }
};

function App() {

    const [actions, setActions] = useState<ActionType[]>([]);
    useEffect(() => {
        (new Requester()).get('/_crud/actions', {}).then((response) => {
            if (response.status !== 200) {
                return;
            }

            response.getData().then((data) => {
                setActions(data);
            });
        }).catch((e) => {
            console.log('error', e);
        }).finally(() => {

        });
    }, []);

    return (
        <Default>
            <Routes>
                {actions.filter(a => a.route !== undefined).map((action, index) => {
                    return (
                        <Route key={index} path={crudToReactPath(action.route?.path || '')}
                               element={<><ViewLoader action={action}/></>}/>
                    )
                })}
            </Routes>
        </Default>
    );
}


export default App;
