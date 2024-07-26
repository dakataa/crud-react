import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {SessionProvider} from "@src/context/SessionContext";
import {ActionProvider} from "@src/context/ActionContext.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <ActionProvider>
            <SessionProvider>
                <App/>
            </SessionProvider>
        </ActionProvider>
    </BrowserRouter>
    // </React.StrictMode>
);

// TODO: Add Google WebVitals to measure performance
