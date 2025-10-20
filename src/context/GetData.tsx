import React, {ComponentType, FC, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {ListType} from "@src/type/ListType.tsx";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import {ExceptionType} from "@src/type/ExceptionType.tsx";
import {CrudRequester} from "@src/Crud.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";
import {OnClickAction} from "@src/component/crud/GridView.tsx";

const GetDataContext = React.createContext<GetDataType | null>(null);

export type GetDataType = {
    url: string;
    results: any;
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
        loadOnInit = true
    }: GetDataProps & { path: string }): GetDataType => {

    const enabled = useRef(loadOnInit);
    const {navigate, internalToExternalPath} = UseActions();

    const [results, setResults] = useState<ListType | ModifyType | null>();

    const loading = useRef<AbortController | null>(null);
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
    }, [refresh, path])

    useEffect(() => {
        update();
    }, [refresh, path]);

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
        refresh: () => {
            setRefresh(refresh + 1);
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
        return GetData({path, loadOnInit});
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
