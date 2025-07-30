import React, {PropsWithChildren, useId, useReducer} from "react";

type PreloaderProviderContextType = {
    isLoading: (loader: string) => boolean;
    startLoading: (loader: string) => void;
    stopLoading: (loader: string) => void;
    loaders: LoadersState;
}

const PreloaderProviderContext = React.createContext<PreloaderProviderContextType | undefined>(undefined);
type LoadersState = { [key: string]: boolean };
type LoadersDispatchCommand = [loader: string, loading: boolean]

export const UsePreloaderProvider = () => {
    return React.useContext<PreloaderProviderContextType | undefined>(PreloaderProviderContext);
};

export const PreloaderIndicator = ({loader, children}: { loader?: string } & PropsWithChildren) => {
    const {isLoading} = UsePreloaderProvider() || {};
    loader = UsePreloader() || loader;

    if (!loader || !isLoading?.(loader)) {
        return;
    }

    return <>
        {children}
    </>
}


const PreloaderContext = React.createContext<string | undefined>(undefined);
export const UsePreloader = () => {
    return React.useContext<string | undefined>(PreloaderContext);
};

export const Preloader = ({loader, children}: { loader?: string } & PropsWithChildren) => {
    const id = useId();

    return (
        <PreloaderContext.Provider value={loader || id}>
            {children}
        </PreloaderContext.Provider>
    )
}


const PreloaderProvider = ({children}: PropsWithChildren) => {
    const [loaders, dispatch] = useReducer((loaders: LoadersState, command: LoadersDispatchCommand) => {
        const [loader, loading] = command;

        return {
            ...loaders,
            [loader]: loading,

        }
    }, {})

    const startLoading = (key: string) => {
        dispatch([key, true]);
    }
    const stopLoading = (key: string) => {
        dispatch([key, false]);
    }

    return (
        <PreloaderProviderContext.Provider value={{
            loaders,
            startLoading,
            stopLoading,
            isLoading: (loader: string) => loaders[loader] ?? false,
        }}>
            {children}
        </PreloaderProviderContext.Provider>
    );
};

export default PreloaderProvider;
