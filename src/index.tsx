import React from 'react';
import ReactDOM from 'react-dom/client';
import Crud, {CrudConfiguration} from './Crud.tsx';
import {BrowserRouter, Outlet, Route, Routes} from "react-router";
import Main from "@src/layout/default/Main.tsx";
import Requester from "@dakataa/requester";

Requester.defaults = {
    headers: {
        Accept: 'application/json',
    }
};

CrudConfiguration({
    connection: {
        baseURL: import.meta.env.CRUD_API_BASE_URL,
    },

    templates: import.meta.glob('@crud/**')
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Main><Outlet/></Main>}>
                    <Route path={"*"} element={<Crud/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
