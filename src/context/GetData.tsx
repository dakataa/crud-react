import React, {ComponentType, FC, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {ListType} from "@src/type/ListType.tsx";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import {CrudRequester} from "@src/Crud.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";
import {OnClickAction} from "@src/type/OnClickAction.tsx";
import {convertFormDataToObject, Method, RequestBodyType, Response} from "@dakataa/requester";

const GetDataContext = React.createContext<GetDataType | null>(null);

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
}

export type GetDataByActionProps = GetDataProps & {
    action: OnClickAction;
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
        loadOnInit = true
    }: GetDataProps & {
        path: string
        method?: Method,
        body?: FormData | string | { [key: string]: any },
        bodyType?: RequestBodyType,
    }): GetDataType => {

    const enabled = useRef(loadOnInit);
    const {navigate, externalToInternalPath, internalToExternalPath} = UseActions();
    const [results, setResults] = useState<{data: ListType | ModifyType, response: Response} | undefined>();

    const loading = useRef<AbortController | null>(null);
    const [refresh, setRefresh] = useState(1);
    const bodyData = JSON.stringify(body instanceof FormData ? convertFormDataToObject(body) : body)
    path = externalToInternalPath(path);

    const update = useCallback(() => {
        if (!enabled.current) {
            enabled.current = true;
            return;
        }

        loading.current = new AbortController();

        CrudRequester()
            .fetch({
                url: path,
                method: method || Method.GET,
                body: body,
                signal: loading.current?.signal,
            })
            .then(({data, response}) => {
                if (response.redirected && !['cors'].includes(response.type)) {
                    const newURL = internalToExternalPath(new URL(response.url).pathname);
                    navigate(newURL);
                    return;
                }

                setResults({data, response});

                if([401, 403, 404, 500].includes(response.status)) {
                    throw new HttpException(response.status, response.statusText || 'Error', data);
                }
            })
            .finally(() => {
            });

        return () => {
            enabled.current = loadOnInit;
        }
    }, [refresh, path, bodyData, bodyType, method])

    useEffect(() => {

        return () => {
            cancel();
            enabled.current = loadOnInit;
        }
    }, []);

    useEffect(() => {
        update();
    }, [refresh, path, bodyData, bodyType, method]);


    const cancel = () => {
        loading.current?.abort('canceled');
        loading.current = null;
    }

    return {
        url: path,
        status: results?.response.status || 0,
        results: results?.data,
        response: results?.response,
        refresh: () => {
            setRefresh(Date.now());
        },
        cancel
    }
}

const GetDataByAction = ({
         action,
         loadOnInit = true
     }: GetDataByActionProps): GetDataType | null => {
        const {generateActionLink} = UseActions();
        const path = generateActionLink(action);

        return GetData({path, method: action.method, body: action.body, bodyType: action.bodyType, loadOnInit});
    }

const DataProvider = ({suspense, children}: {
    children: ReactNode,
    suspense?: ReactNode
}) => {
    const {action} = UseCurrentAction();
    const {generateActionLink} = UseActions();
    const parentDataProvider = UseDataProvider();
    const url = generateActionLink(action);

    if(parentDataProvider?.url === url) {
        return children;
    }

    const data = GetDataByAction({
        action
    });

    suspense ??= <>Data Loading</>;

    return (
        <GetDataContext.Provider value={data}>
            {suspense && !data?.results ? suspense : children}
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

export {DataProvider, WithDataProvider, GetData, GetDataByAction};
