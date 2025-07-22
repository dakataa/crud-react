import React, {ComponentType, FC, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {ListType} from "@src/type/ListType.tsx";
import {convertObjectToURLSearchParams} from "@dakataa/requester";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import {ExceptionType} from "@src/type/ExceptionType.tsx";
import {CrudRequester} from "@src/Crud.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";

const GetDataContext = React.createContext<GetDataType | null>(null);

export type GetDataType = {
    url: string;
    action: ActionType;
    results: any;
    setParameters: (v: { [key: string]: string } | null) => void;
    setQueryParameters: (v: URLSearchParams | { [key: string]: string }) => void;
    refresh: () => void;
    cancel: () => void;
}

type GetDataProps = {
    entityAction: ActionType,
    initParameters?: { [key: string]: any };
    initQueryParameters?: URLSearchParams | { [key: string]: any },
    loadOnInit?: boolean
}

export function UseDataProvider(): GetDataType | null {
    return React.useContext<GetDataType | null>(GetDataContext);
}

const GetData = ({entityAction, initParameters, initQueryParameters, loadOnInit = true}: GetDataProps): GetDataType => {
    if(!entityAction) {
        throw new Error('Invalid Entity Action');
    }

    const enabled = useRef(loadOnInit);
    const {getAction, generateRoute} = UseActions();
    entityAction = getAction(entityAction.entity, entityAction.name, entityAction.namespace) || entityAction;

    const [results, setResults] = useState<ListType | ModifyType | null>();
    const [parameters, setParameters] = useState<{ [key: string]: string } | null>(initParameters || null);

    const loading = useRef<AbortController|null>(null);
    const [queryParameters, setQueryParameters] = useState<URLSearchParams>(initQueryParameters instanceof URLSearchParams ? initQueryParameters : convertObjectToURLSearchParams(initQueryParameters || {}));
    const key = btoa(encodeURIComponent([entityAction.entity, entityAction.name, entityAction.namespace, ...Object.entries(parameters || {}).map(([key, value]) => key + '-' + value), (queryParameters instanceof URLSearchParams ? queryParameters : convertObjectToURLSearchParams(queryParameters)).toString()].filter(v => v).join('.')));
    const cache = useRef<{ [key: string]: string }>({});
    const [refresh, setRefresh] = useState(1);
    const url = generateRoute(entityAction.route, parameters ?? null);

    const update = useCallback(() => {
        if (!entityAction) {
            return;
        }

        if(!enabled.current) {
            enabled.current = true;
            return;
        }

        loading.current = new AbortController();

        CrudRequester()
            .get({
                url,
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

        return () => {
            enabled.current = loadOnInit;
        }
    }, [JSON.stringify(parameters), queryParameters.toString(), refresh])

    useEffect(() => {
        update();
    }, [JSON.stringify(parameters), queryParameters.toString(), refresh]);

    useEffect(() => {
        return () => {
            cancel();
            enabled.current = loadOnInit;
        }
    }, []);

    const cancel = () => {
        loading.current?.abort('canceled');
        loading.current = null;
    }

    return {
        url,
        action: entityAction,
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

const DataProvider = ({suspense, children}: {
    children: ReactNode,
    suspense?: ReactNode
}) => {

    const {action, parameters} = UseCurrentAction();
    const parentDataProvider = UseDataProvider();
    const hasParentDataProvider = parentDataProvider?.action === action;

    const data = hasParentDataProvider ? parentDataProvider : GetData({entityAction: action, initParameters: parameters});
    const {results, setParameters} = data;

    useEffect(() => {
        if(hasParentDataProvider) {
            return;
        }

        setParameters(parameters || null);
    }, [parameters]);

    suspense ??= <>Loading</>;

    return (
        <GetDataContext.Provider value={data}>
            {suspense && !parentDataProvider && !results  ? suspense : children}
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
