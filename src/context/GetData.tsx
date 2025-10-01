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
    action?: ActionType;
    results: any;
    setParameters?: (v: { [key: string]: string } | undefined) => void;
    setQueryParameters: (v: URLSearchParams | { [key: string]: string }) => void;
    refresh: () => void;
    cancel: () => void;
}

export type GetDataProps = {
    initQueryParameters?: URLSearchParams | { [key: string]: any };
    loadOnInit?: boolean;
}

export type GetDataByActionProps = GetDataProps & {
    initParameters?: { [key: string]: any };
    entityAction: ActionType;
}

export function UseDataProvider(): GetDataType | null {
    return React.useContext<GetDataType | null>(GetDataContext);
}

const GetData = (
    {
        path,
        initQueryParameters,
        loadOnInit = true
    }: GetDataProps & { path: string }): GetDataType => {

    const enabled = useRef(loadOnInit);
    const {navigate, internalToExternalPath} = UseActions();

    const [results, setResults] = useState<ListType | ModifyType | null>();

    const loading = useRef<AbortController | null>(null);
    const [queryParameters, setQueryParameters] = useState<URLSearchParams>(initQueryParameters instanceof URLSearchParams ? initQueryParameters : convertObjectToURLSearchParams(initQueryParameters || {}));
    const [refresh, setRefresh] = useState(1);

    const update = useCallback(() => {
        if (!enabled.current) {
            enabled.current = true;
            return;
        }

        loading.current = new AbortController();

        CrudRequester()
            .get({
                url: path,
                query: queryParameters,
                signal: loading.current?.signal,
            })
            .then(({data, response}) => {
                if (response.redirected && !['cors'].includes(response.type)) {
                    const newURL = internalToExternalPath(new URL(response.url).pathname);
                    navigate(newURL);
                    return;
                }

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
    }, [queryParameters.toString(), refresh, path])

    useEffect(() => {
        update();
    }, [queryParameters.toString(), refresh, path]);

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
        url: path,
        results,
        setQueryParameters: (value: URLSearchParams | { [key: string]: any }) => {
            setQueryParameters(new URLSearchParams(value));
        },
        refresh: () => {
            setRefresh(refresh + 1);
        },
        cancel
    }
}

const GetDataByAction =
    ({
         entityAction,
         initParameters,
         initQueryParameters,
         loadOnInit = true
     }: GetDataByActionProps): GetDataType => {
        if (!entityAction) {
            throw new Error('Invalid Entity Action');
        }

        const {getAction} = UseActions();
        const {generateRoute} = UseActions();
        const [parameters, setParameters] = useState<{
            [key: string]: string
        } | undefined>(initParameters);

        const action = getAction(entityAction.entity, entityAction.name, entityAction.namespace);
        if (!action) {
            throw new Error('Invalid Entity Action');
        }

        const path = generateRoute(action.route, parameters ?? initParameters ?? null);
        const data = GetData({path, initQueryParameters, loadOnInit});

        return {
            ...data,
            setParameters
        }
    }

const DataProvider = ({suspense, children}: {
    children: ReactNode,
    suspense?: ReactNode
}) => {

    const {action, parameters} = UseCurrentAction();
    const {generateRoute} = UseActions();
    const parentDataProvider = UseDataProvider();
    const path = generateRoute(action.route, parameters ?? null);
    const hasParentDataProvider = parentDataProvider?.url === path;

    const data = hasParentDataProvider ? parentDataProvider : GetDataByAction({
        entityAction: action,
        initParameters: parameters
    });
    const {results, setParameters} = data;

    useEffect(() => {
        if (hasParentDataProvider) {
            return;
        }

        setParameters?.(parameters);
    }, [parameters]);

    suspense ??= <>Loading</>;

    return (
        <GetDataContext.Provider value={data}>
            {suspense && !parentDataProvider && !results ? suspense : children}
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

export {DataProvider, WithDataProvider, GetData, GetDataByAction};
