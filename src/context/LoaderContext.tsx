import React, {PropsWithChildren, useEffect, useReducer} from "react";
import Requester, {InterceptEvent, Response} from "@dakataa/requester";
import {UseActions} from "@src/context/ActionContext.tsx";

type DataLoaderIndicatorItemType = {url: string, requestId: number};

type DataLoaderIndicatorContextType = {
    requests: DataLoaderIndicatorItemType[];
}

const DataLoaderIndicatorContext = React.createContext<DataLoaderIndicatorContextType>({
    requests: []
});

export function UseLoaderIndicator(url?: string) {
    const context = React.useContext<DataLoaderIndicatorContextType>(DataLoaderIndicatorContext);
    if (context === undefined) {
        throw new Error("UseLoaderIndicator must be within DataLoaderIndicatorProvider")
    }

    const {requests: urls} = context;
    const {matchPath, getActionByPath, generateActionLink} = UseActions();

    const isLoading = (url: string) => {
        const action = getActionByPath(url);
        if(!action) {
            return false;
        }

        const {params: parameters} = matchPath(action.route?.path || '', url) ?? {params: undefined};
        const link = generateActionLink({action, parameters});

        return !!urls.filter(v => v.url === link).length;
    };

    return {
        isLoading: url ? isLoading(url.toString()) : false
    };
}

export function DataLoaderIndicatorProvider({...props}: PropsWithChildren) {
    const [state, dispatch] = useReducer((state: DataLoaderIndicatorContextType, command: {
        action: 'load' | 'complete' | 'cancel',
        requestId: number;
        url: string
    }): DataLoaderIndicatorContextType => {
        const {action, requestId, url} = command;
        const pathname = new URL(url).pathname;
        state = {requests: state.requests.filter(v => v.requestId !== requestId)};
        switch (action) {
            case 'cancel':
            case 'complete': {

                break;
            }
            default: {
                state.requests.push({url: pathname, requestId: requestId});
                state = {requests: state.requests};
            }
        }

        return state;
    }, {requests: []});

    useEffect(() => {
        const requestInterceptId = Requester.on(InterceptEvent.PRE_REQUEST, (requestId: number, url: URL | string, options: any) => {
            dispatch({action: 'load', requestId: requestId, url: url.toString()})
        });

        const preResponseInterceptId = Requester.on(InterceptEvent.POST_RESPONSE, (requestId: number, response: Response, url: URL | string, options: any) => {
            dispatch({action: 'complete', requestId: requestId, url: url.toString()})
        });

        const errorInterceptId = Requester.on(InterceptEvent.ERROR, (requestId: number, reason: any, url: URL | string, options: any) => {
            dispatch({action: 'cancel', requestId: requestId,url: url.toString()})
        });

        return () => {
            Requester
                .off(requestInterceptId)
                .off(preResponseInterceptId)
                .off(errorInterceptId);
        }
    }, []);

    return (
        <DataLoaderIndicatorContext.Provider value={state}>
            {props.children}
        </DataLoaderIndicatorContext.Provider>
    );
}
