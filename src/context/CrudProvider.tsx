import React, {ReactNode} from "react";
import {ModalProvider} from "@crud-react/context/ModalContext.tsx";
import {AlertProvider} from "@crud-react/context/AlertContext.tsx";
import {Config, ConfigProvider} from "@crud-react/context/ConfigContext.tsx";
import {DataLoaderIndicatorProvider} from "@crud-react/context/LoaderContext.tsx";
import PreloaderProvider from "@crud-react/component/Preloader.tsx";

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
