import React, {ReactNode} from "react";
import {ModalProvider} from "@src/context/ModalContext.tsx";
import {AlertProvider} from "@src/context/AlertContext.tsx";
import {ActionProvider} from "@src/context/ActionContext.tsx";

const CrudContext = ({children}: { children: ReactNode }) => {
    return (
        <ModalProvider>
            <AlertProvider>
                <ActionProvider>
                    {children}
                </ActionProvider>
            </AlertProvider>
        </ModalProvider>
    )
}

export default CrudContext;
