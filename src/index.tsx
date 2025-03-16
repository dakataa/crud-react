import React from 'react';
import ReactDOM from 'react-dom/client';
import Crud, {CrudConfiguration} from './Crud.tsx';
import {BrowserRouter, Route, Routes} from "react-router";
import Main from "@src/layout/default/Main.tsx";

CrudConfiguration(import.meta.env.CRUD_API_BASE_URL);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Main/>}>
                        <Route path={"*"} element={<Crud/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// TODO: Add Google WebVitals to measure performance
