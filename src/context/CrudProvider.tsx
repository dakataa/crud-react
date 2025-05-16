import React, {ReactNode} from "react";
import {ModalProvider} from "@src/context/ModalContext.tsx";
import {AlertProvider} from "@src/context/AlertContext.tsx";
import {Config, ConfigProvider} from "@src/context/ConfigContext.tsx";
import {DataLoaderIndicatorProvider} from "@src/context/LoaderContext.tsx";

const CrudProvider = ({children, config}: { children: ReactNode, config: Config }) => {
    return (
        <ConfigProvider config={config}>
            <DataLoaderIndicatorProvider>
                <AlertProvider>
                    <ModalProvider>
                        {children}
                    </ModalProvider>
                </AlertProvider>
            </DataLoaderIndicatorProvider>
        </ConfigProvider>
    )
}

export default CrudProvider;
