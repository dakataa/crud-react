import React from 'react';
import ReactDOM from 'react-dom/client';
import Crud from './Crud.tsx';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Main from "@src/layout/default/Main.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Main/>}>
                    <Route path={"*"} element={<Crud/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    // </React.StrictMode>
);

// TODO: Add Google WebVitals to measure performance
