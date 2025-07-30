import React, {ReactNode} from "react";
import {ModalProvider} from "@src/context/ModalContext.tsx";
import {AlertProvider} from "@src/context/AlertContext.tsx";
import {Config, ConfigProvider} from "@src/context/ConfigContext.tsx";
import {DataLoaderIndicatorProvider} from "@src/context/LoaderContext.tsx";
import PreloaderProvider from "@src/component/Preloader.tsx";

const CrudProvider = ({children, config}: { children: ReactNode, config: Config }) => {
    return (
        <ConfigProvider config={config}>
            <DataLoaderIndicatorProvider>
                <PreloaderProvider>
                    <AlertProvider>
                        <ModalProvider>
                            {children}
                        </ModalProvider>
                    </AlertProvider>
                </PreloaderProvider>
            </DataLoaderIndicatorProvider>
        </ConfigProvider>
    )
}

export default CrudProvider;
