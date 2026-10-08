import React, {ComponentType, FC, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {ListType} from "@crud-react/type/ListType.tsx";
import {ModifyType} from "@crud-react/type/ModifyType.tsx";
import {UseActions} from "@crud-react/context/ActionContext.tsx";
import HttpException from "@crud-react/component/error/HttpException.tsx";
import {CrudRequester} from "@crud-react/Crud.tsx";
import {UseCurrentActionRequest} from "@crud-react/component/crud/CrudLoader.tsx";
import {ActionRequestType} from "@crud-react/type/ActionRequestType.tsx";
import {Method, RequestBodyType} from "@dakataa/requester";

const GetDataContext = React.createContext<GetDataType | null>(null);

const bodyFiles = new WeakMap<Blob, number>();
let nextBodyFileId = 0;

const serializeBody = (body: FormData | string | { [key: string]: any } | undefined) => JSON.stringify(
    body instanceof FormData ? Array.from(body.entries()) : body,
    (_key, value) => {
        if (value instanceof Blob) {
            if (!bodyFiles.has(value)) {
                bodyFiles.set(value, ++nextBodyFileId);
            }

            return {fileId: bodyFiles.get(value)};
        }

        return value;
    }
);

export type GetDataType = {
    url: string;
    status: number;
    results: any;
    response?: Response;
    refresh: () => void;
    cancel: () => void;
}

export type GetDataProps = {
    loadOnInit?: boolean;
    /** Handles the error locally instead of propagating it to the global handler. */
    onError?: (error: unknown) => void;
    /** Propagates unhandled errors by default; false suppresses them without a callback. */
    throwOnError?: boolean;
}

export type GetDataByActionRequestProps = GetDataProps & {
    actionRequest: ActionRequestType;
}

export function UseDataProvider(): GetDataType | null {
    return React.useContext<GetDataType | null>(GetDataContext);
}

const GetData = (
    {
        path,
        method,
        body,
        bodyType,
        loadOnInit = true,
        onError,
        throwOnError = true
    }: GetDataProps & {
        path: string
        method?: Method,
        body?: FormData | string | { [key: string]: any },
        bodyType?: RequestBodyType,
    }): GetDataType => {

    const enabled = useRef(loadOnInit);
    const onErrorRef = useRef(onError);
    const {navigate, externalToInternalPath, internalToExternalPath} = UseActions(false);
    const [results, setResults] = useState<{ data: ListType | ModifyType, response: Response } | undefined>();

    const loading = useRef<AbortController | null>(null);
    const [refresh, setRefresh] = useState(0);
    const bodyData = serializeBody(body);

    path = externalToInternalPath(path);

    const cancel = useCallback(() => {
        loading.current?.abort('canceled');
        loading.current = null;
    }, []);

    useEffect(() => {
        return () => {
            enabled.current = loadOnInit;
        };
    }, []);

    useEffect(() => {
        onErrorRef.current = onError;
    }, [onError]);

    useEffect(() => {
        if (!enabled.current) {
            enabled.current = true;
            return;
        }

        cancel();

        const controller = new AbortController();
        loading.current = controller;
        // Keep the handler tied to this request without reloading when callback identity changes.
        const handleError = onErrorRef.current;

        CrudRequester()
            .fetch({
                url: path,
                method: method || Method.GET,
                body,
                bodyType,
                signal: controller.signal,
            })
            .then(({data, response}) => {
                if (controller.signal.aborted) {
                    return;
                }

                const primaryStatus = Math.floor(response.status / 100) * 100;

                if (response.redirected && primaryStatus === 200) {
                    const redirectURL = new URL(response.url);
                    const redirectPath = redirectURL.pathname + redirectURL.search + redirectURL.hash;
                    if (redirectPath !== path) {
                        navigate(internalToExternalPath(redirectPath));
                        return;
                    }
                }

                const isForm = data !== null && typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'form');
                if ([400, 500].includes(primaryStatus) && isForm === false) {
                    throw new HttpException(response.status, response.statusText, data);
                }

                setResults({data, response});
            })
            .catch((error: unknown) => {
                // Check this request's signal: a newer request may already be loading.
                if (controller.signal.aborted) {
                    return;
                }

                if (handleError) {
                    handleError(error);
                    return;
                }

                if (throwOnError) {
                    throw error;
                }
            })
            .finally(() => {
                if (loading.current === controller) {
                    loading.current = null;
                }
            });
        return () => {
            controller.abort('canceled');
            if (loading.current === controller) {
                loading.current = null;
            }
        };
    }, [refresh, path, bodyData, bodyType, method, cancel, throwOnError]);

    return {
        url: path,
        status: results?.response.status || 0,
        results: results?.data,
        response: results?.response,
        refresh: () => {
            setRefresh(value => value + 1);
        },
        cancel
    }
}

const GetDataByAction = ({
                             actionRequest,
                             loadOnInit = true,
                             onError,
                             throwOnError = true
                         }: GetDataByActionRequestProps): GetDataType | null => {
    const {generateActionLink} = UseActions();
    const path = generateActionLink(actionRequest);

    return GetData({
        path,
        method: actionRequest.method,
        body: actionRequest.body,
        bodyType: actionRequest.bodyType,
        loadOnInit,
        onError,
        throwOnError
    });
}

const DataProvider = ({suspense, children}: {
    children: ReactNode,
    suspense?: ReactNode
}) => {
    const {actionRequest} = UseCurrentActionRequest();
    const {generateActionLink, externalToInternalPath} = UseActions();
    const parentDataProvider = UseDataProvider();
    const url = externalToInternalPath(generateActionLink(actionRequest));

    if (parentDataProvider?.url === url) {
        return children;
    }

    return <RequestDataProvider actionRequest={actionRequest} suspense={suspense}>{children}</RequestDataProvider>;
}

const RequestDataProvider = ({actionRequest, suspense, children}: {
    actionRequest: ActionRequestType;
    children: ReactNode;
    suspense?: ReactNode;
}) => {
    const data = GetDataByAction({
        actionRequest
    });

    suspense ??= <>Data Loading</>;

    return (
        <DataContextProvider data={data}>
            {suspense && !data?.response ? suspense : children}
        </DataContextProvider>
    );
}

const DataContextProvider = ({data, children}: { data: GetDataType | null, children: ReactNode }) => {
    return (
        <GetDataContext.Provider value={data}>
            {children}
        </GetDataContext.Provider>
    );
}

function WithDataProvider<P extends object>(Component: ComponentType<P>): FC<P> {

    return (props: P) => {
        return (
            <DataProvider>
                <Component {...props}/>
            </DataProvider>
        )
    };
}

export {DataProvider, DataContextProvider, WithDataProvider, GetData, GetDataByAction};
