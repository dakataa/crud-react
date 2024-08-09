import {useEffect, useRef, useState} from "react";
import {ListType} from "@src/type/ListType.tsx";
import Requester, {convertObjectToURLSearchParams} from "requester";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {useActions} from "@src/context/ActionContext.tsx";
import {generateRoute} from "@src/helper/RouterUtils.tsx";

const GetData = (entity: string, action: string, initParameters?: { [key: string]: string }, initQueryParameters?: URLSearchParams | { [key: string]: string }) => {
    const [results, setResults] = useState<ListType | ModifyType | null>();
    const [parameters, setParameters] = useState<{ [key: string]: string } | null>(initParameters || null);
    const [queryParameters, setQueryParameters] = useState<URLSearchParams | { [key: string]: string } | null>(initQueryParameters || null);
    const [actions] = useActions();
    const entityAction = ((actions || {})[entity] ?? []).filter((v) => v.name === action)[0] ?? null;
    const lastKey = useRef<string|null>();
    const key = btoa([entity, action, ...Object.entries(parameters || {}).map(([key, value]) => key+'-'+value), (queryParameters instanceof URLSearchParams ? queryParameters : convertObjectToURLSearchParams(queryParameters)).toString()].filter(v => v).join('.'));
    const cache = useRef<{[key: string]: string}>({});

    const setCache = (results) => {
        cache.current[key] = btoa(JSON.stringify(results));
        // sessionStorage.setItem(key, btoa(JSON.stringify(results)))
    }

    const getCache = () => {
        // let cachedData = sessionStorage.getItem(key);
        let cachedData = cache.current[key] || null;
        if(cachedData) {
            try {
                return JSON.parse(atob(cachedData));
            } catch (e) {
                console.log('error', e);
            }
        }

        return null;
    }

    useEffect(() => {
        if(!results) {
            return;
        }

        setCache(results);
    }, [results]);

    useEffect(() => {
        if(lastKey.current === key) {
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
        }

        (new Requester()).get(generateRoute(entityAction.route, parameters ?? null), queryParameters).then((response) => {
            if (response.status === 200) {
                response.getData().then(v => setResults(v));
            }

        }).catch((e) => {
            console.log('error', e);
        }).finally(() => {

        });
    }, [parameters, queryParameters]);

    return {
        results: results,
        setParameters: setParameters,
        setQueryParameters: setQueryParameters
    }
}


export default GetData;