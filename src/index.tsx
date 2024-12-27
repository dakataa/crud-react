import React from 'react';
import ReactDOM from 'react-dom/client';
import Crud from './Crud.tsx';
import {BrowserRouter} from "react-router-dom";
import {SessionProvider} from "@src/context/SessionContext";
import {ActionProvider} from "@src/context/ActionContext.tsx";
import {ModalProvider} from "@src/context/ModalContext.tsx";
import {AlertProvider} from "@src/context/AlertContext.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <ActionProvider>
            <SessionProvider>
                <ModalProvider>
                    <AlertProvider>
                        <Crud/>
                    </AlertProvider>
                </ModalProvider>
            </SessionProvider>
        </ActionProvider>
    </BrowserRouter>
    // </React.StrictMode>
);

// TODO: Add Google WebVitals to measure performance
