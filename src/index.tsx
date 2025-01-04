import React from 'react';
import ReactDOM from 'react-dom/client';
import Crud from './Crud.tsx';
import {BrowserRouter} from "react-router-dom";
import CrudContext from "@src/CrudContext.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <CrudContext>
            <Crud/>
        </CrudContext>
    </BrowserRouter>
    // </React.StrictMode>
);

// TODO: Add Google WebVitals to measure performance
