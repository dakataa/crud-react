import React, {ReactNode, useEffect, useRef, useState} from "react";
import {ListType} from "@src/type/ListType.tsx";
import Requester, {convertObjectToURLSearchParams} from "@dakataa/requester";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {generateRoute} from "@src/helper/RouterUtils.tsx";
import {ActionType} from "@src/type/ActionType.tsx";

const GetDataContext = React.createContext<GetDataType | null>(null);

export type GetDataType = {
    results: any;
    setParameters: (v: { [key: string]: string } | null) => void;
    setQueryParameters: (v: URLSearchParams | { [key: string]: string }) => void;
    refresh: () => void;
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
    const {getAction} = UseActions();
    entityAction = getAction(entityAction.entity, entityAction.name, entityAction.namespace) || entityAction;

    const [results, setResults] = useState<ListType | ModifyType | null>();
    const [parameters, setParameters] = useState<{ [key: string]: string } | null>(initParameters || null);
    const [queryParameters, setQueryParameters] = useState<URLSearchParams | {
        [key: string]: string
    }>(initQueryParameters || {});
    const lastKey = useRef<string | null>();
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

    useEffect(() => {
        if (!results) {
            return;
        }

        setCache(results);
    }, [JSON.stringify(results)]);

    useEffect(() => {
        /*if(lastKey.current === key) {
            return;
        }

        lastKey.current = key;

        let cachedData = getCache();
        if(cachedData) {
           try {
               setResults(cachedData);
               return;
           } catch (e) {
               console.log('error', e);
           }
        }*/

        if (!entityAction) {
            return;
        }

        (new Requester()).get(generateRoute(entityAction.route, parameters ?? null), queryParameters).then((response) => {
            if (response.status === 200) {
                response.getData().then(v => setResults(v));
            }
        }).catch((e) => {
            console.log('error', e);
        }).finally(() => {
        });
    }, [JSON.stringify(parameters), queryParameters, refresh]);

    return {
        results,
        setParameters,
        setQueryParameters,
        refresh: () => {
            setRefresh(refresh + 1);
        }
    }
}

const DataProvider = ({entityAction, initParameters, initQueryParameters, suspense, children}: GetDataProps & {
    children: ReactNode,
    suspense?: ReactNode
}) => {

    const data = GetData({entityAction, initParameters, initQueryParameters});

    return (
        <GetDataContext.Provider value={data}>
            {suspense && !data.results ? suspense : children}
        </GetDataContext.Provider>
    );
}

export {DataProvider, GetData as default};
