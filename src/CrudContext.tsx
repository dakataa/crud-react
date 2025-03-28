import React, {ReactNode} from "react";
import {ModalProvider} from "@src/context/ModalContext.tsx";
import {AlertProvider} from "@src/context/AlertContext.tsx";
import {ActionProvider} from "@src/context/ActionContext.tsx";

const CrudContext = ({children}: { children: ReactNode }) => {
    return (
        <AlertProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </AlertProvider>
    )
}

export default CrudContext;
