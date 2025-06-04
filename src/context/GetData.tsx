import React, {ComponentType, FC, ReactNode, useEffect, useRef, useState} from "react";
import {ListType} from "@src/type/ListType.tsx";
import Requester, {convertObjectToURLSearchParams} from "@dakataa/requester";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {ActionProvider, UseActions} from "@src/context/ActionContext.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import {ExceptionType} from "@src/type/ExceptionType.tsx";
import {CrudRequester} from "@src/Crud.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";

const GetDataContext = React.createContext<GetDataType | null>(null);

export type GetDataType = {
    results: any;
    setParameters: (v: { [key: string]: string } | null) => void;
    setQueryParameters: (v: URLSearchParams | { [key: string]: string }) => void;
    refresh: () => void;
    cancel: () => void;
}

type GetDataProps = {
    entityAction: ActionType,
    initParameters?: { [key: string]: any };
    initQueryParameters?: URLSearchParams | { [key: string]: any }
}

export function UseDataProvider(): GetDataType | null {
    return React.useContext<GetDataType | null>(GetDataContext);
}

const GetData = ({entityAction, initParameters, initQueryParameters}: GetDataProps): GetDataType => {
    const {getAction, generateRoute} = UseActions();
    entityAction = getAction(entityAction.entity, entityAction.name, entityAction.namespace) || entityAction;

    const [results, setResults] = useState<ListType | ModifyType | null>();
    const [parameters, setParameters] = useState<{ [key: string]: string } | null>(initParameters || null);

    const loading = useRef<AbortController|null>(null);
    const lastKey = useRef<string | null>(null);
    const [queryParameters, setQueryParameters] = useState<URLSearchParams>(initQueryParameters instanceof URLSearchParams ? initQueryParameters : convertObjectToURLSearchParams(initQueryParameters || {}));
    const key = btoa(encodeURIComponent([entityAction.entity, entityAction.name, entityAction.namespace, ...Object.entries(parameters || {}).map(([key, value]) => key + '-' + value), (queryParameters instanceof URLSearchParams ? queryParameters : convertObjectToURLSearchParams(queryParameters)).toString()].filter(v => v).join('.')));
    const cache = useRef<{ [key: string]: string }>({});
    const [refresh, setRefresh] = useState(1);

    const setCache = (results: any) => {
        // cache.current[key] = btoa(encodeURIComponent(JSON.stringify(results)));
        sessionStorage.setItem(key, btoa(encodeURIComponent(JSON.stringify(results))))
    }

    // const getCache = () => {
    //     return null;
    //     const cachedData = sessionStorage.getItem(key);
    //     // let cachedData = cache.current[key] ?? null;
    //
    //     if(cachedData) {
    //         try {
    //             return JSON.parse(decodeURIComponent(atob(cachedData)));
    //         } catch (e) {
    //             console.log('error', e);
    //         }
    //     }
    //
    //     return null;
    // }

    // useEffect(() => {
    //     if (!results) {
    //         return;
    //     }
    //
    //     setCache(results);
    // }, [JSON.stringify(results)]);

    const update = () => {
        if (!entityAction) {
            return;
        }

        loading.current = new AbortController();

        CrudRequester()
            .get({
                url: generateRoute(entityAction.route, parameters ?? null),
                query: queryParameters,
                signal: loading.current?.signal
            })
            .then(({data, response}) => {
                switch (response.status) {
                    case 201:
                    case 200: {
                        setResults(data);
                        break;
                    }
                    default: {
                        if (data instanceof Object) {
                            const exception = (data as ExceptionType);
                            throw new HttpException(exception.status, exception.detail, exception.trace);
                        }

                        throw new HttpException(response.status, response.statusText);
                    }
                }
            })
            .finally(() => {
            });
    }

    useEffect(() => {
        update();

        return () => {
           cancel();
        }
    }, [JSON.stringify(parameters), queryParameters.toString(), refresh]);

    const cancel = () => {
        loading.current?.abort('canceled');
        loading.current = null;
    }

    return {
        results,
        setParameters,
        setQueryParameters: (value: URLSearchParams | { [key: string]: any }) => {
            setQueryParameters(new URLSearchParams(value));
        },
        refresh: () => {
            setRefresh(refresh + 1);
        },
        cancel
    }
}

const DataProvider = ({suspense, children}: GetDataProps & {
    children: ReactNode,
    suspense?: ReactNode
}) => {

    const {action, parameters} = UseCurrentAction();

    const data = GetData({entityAction: action, initParameters: parameters});

    suspense ??= <>Loading</>;

    return (
        <GetDataContext.Provider value={data}>
            {suspense && !data.results ? suspense : children}
        </GetDataContext.Provider>
    );
}

function WithDataProvider<P extends {}>(Component: ComponentType): FC<P> {

    return (props: P) => {
        return (
            <DataProvider>
                <Component {...props}/>
            </DataProvider>
        )
    };
}

export {DataProvider, WithDataProvider, GetData as default};
