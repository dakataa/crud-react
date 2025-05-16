import React, {PropsWithChildren, useEffect, useReducer} from "react";
import Requester, {InterceptEvent, Response} from "@dakataa/requester";
import {UseActions} from "@src/context/ActionContext.tsx";

type DataLoaderIndicatorContextType = {
    links: string[];
}

const DataLoaderIndicatorContext = React.createContext<DataLoaderIndicatorContextType>({
    links: []
});

export function UseLoaderIndicator(url?: string) {
    const context = React.useContext<DataLoaderIndicatorContextType>(DataLoaderIndicatorContext);
    if (context === undefined) {
        throw new Error("UseLoaderIndicator must be within DataLoaderIndicatorProvider")
    }

    const {links: urls} = context;
    const {matchPath, getActionByPath, generateActionLink} = UseActions();

    const isLoading = (url: string) => {
        const action = getActionByPath(url);
        if(!action) {
            return false;
        }

        const {params: parameters} = matchPath(action.route?.path || '', url) ?? {params: undefined};
        const link = generateActionLink({action, parameters});

        return urls.includes(link);
    };

    return {
        isLoading: url ? isLoading(url.toString()) : false
    };
}

export function DataLoaderIndicatorProvider({...props}: PropsWithChildren) {
    const [state, dispatch] = useReducer((state: DataLoaderIndicatorContextType, command: {
        action: 'load' | 'complete' | 'cancel',
        url: string
    }): DataLoaderIndicatorContextType => {
        const {action, url} = command;
        const pathname = new URL(url).pathname;
        switch (action) {
            case 'cancel':
            case 'complete': {
                state = {links: state.links.filter(v => v !== pathname)};
                break;
            }
            default: {
                state = {links: [...state.links, pathname]};
            }
        }

        return state;
    }, {links: []});

    useEffect(() => {
        const requestInterceptId = Requester.on(InterceptEvent.PRE_REQUEST, (requestId: number, url: URL | string, options: any) => {
            dispatch({action: 'load', url: url.toString()})
        });

        const preResponseInterceptId = Requester.on(InterceptEvent.POST_RESPONSE, (requestId: number, response: Response, url: URL | string, options: any) => {
            dispatch({action: 'complete', url: url.toString()})
        });

        return () => {
            Requester
                .off(requestInterceptId)
                .off(preResponseInterceptId);
        }
    }, []);

    return (
        <DataLoaderIndicatorContext.Provider value={state}>
            {props.children}
        </DataLoaderIndicatorContext.Provider>
    );
}
