import React, {ComponentType, FC, PropsWithChildren, ReactNode, useEffect, useMemo, useState} from "react";
import {ActionType} from "@crud-react/type/ActionType.tsx";
import {ActionRequestType} from "@crud-react/type/ActionRequestType.tsx";
import {CrudRequester} from "@crud-react/Crud.tsx";
import {UseConfig} from "@crud-react/context/ConfigContext.tsx";
import {RouteType} from "@crud-react/type/RouteType.tsx";
import {convertObjectToURLSearchParams, convertURLSearchParamsToObject} from "@dakataa/requester";

window.history.pushState = new Proxy(window.history.pushState, {
    apply: (target, thisArg, argArray: any) => {
        target.apply(thisArg, argArray);
        window.dispatchEvent(new Event('pushstate'));
    },
});

window.history.replaceState = new Proxy(window.history.replaceState, {
    apply: (target, thisArg, argArray: any) => {
        target.apply(thisArg, argArray);

        window.dispatchEvent(new Event('replacestate'));
    },
});

const STORAGE_KEY = 'actions';

// Pre-compiled RegExp constants
const RE_CRUD_PARAMS = /{(.*?)}/gi;
const RE_LEADING_TRAILING_SLASH = /^\/|\/$'/g;
const RE_LEADING_SLASH = /^\//;
const RE_PATH_PARAMS = /\/[{:](\w+)}?/g;
const RE_REPLACE_PARAMS = /[{:](\w+)}?/g;
const RE_TRAILING_SLASH = /\/$/g;

type RouterContextType = {
    location: URL;
    setLocation: (location: URL) => void;
    actions: ActionType[] | null;
};

const ActionContext = React.createContext<RouterContextType | undefined>(undefined);

export function UseActions(safe: boolean = true) {
    const context = React.useContext<RouterContextType | undefined>(ActionContext);
    if (!context && safe) {
        throw new Error('UseActions  must be used in ActionProvider');
    }

    const config = UseConfig();
    const {actions, location} = context || {location: new URL(document.location.href), actions: null};

    const getAction = (entity: string, name: string, namespace?: string): ActionType | undefined => {
        return actions?.filter(a => a.entity === entity && a.name === name && (namespace === undefined || a.namespace === namespace)).shift();
    }

    const getActionByPath = (path: string): ActionType | undefined | null => {
        if (!actions) {
            return undefined;
        }

        return actions.find((a) => a.route?.path && matchPath(a.route.path, path)) ?? null;
    };

    const getActionRequestByPath = (path: string): ActionRequestType | null | undefined => {
        const action = getActionByPath(path);
        if (!action) {
            return action;
        }

        const match = matchPath(action.route?.path || '', path);

        return {
            action,
            parameters: match?.params,
            query: match?.query,
        };
    }

    const crudToReactPathPattern = (path: string) => {
        return path.replaceAll(RE_CRUD_PARAMS, ':$1');
    }

    const generateRoutePath = (path: string, parameters?: { [key: string]: any }, query?: {
        [key: string]: any
    }, hash?: string): string => {
        return generatePath(crudToReactPathPattern(path), parameters, query, hash);
    }

    const generateRoute = (route?: RouteType, parameters?: { [key: string]: any }, query?: {
        [key: string]: any
    }, hash?: string): string => {
        return route ? generateRoutePath(route.path, {...route.defaults || {}, ...parameters}, query, hash) : '#';
    }

    const generateActionLink = (actionRequest: ActionRequestType): string => {
        const action = getAction(actionRequest.action.entity, actionRequest.action.name, actionRequest.action.namespace);

        return generateRoute(action?.route, actionRequest.parameters, actionRequest.query, actionRequest.hash);
    }

    const generateLink = (route?: RouteType, parameters?: { [key: string]: string }, query?: {
        [key: string]: string
    }): string => {
        return generateRoute(route, parameters, query);
    }

    const internalToExternalPath = (path: string) => {
        if (config.link?.prefix) {
            path = '/' + config.link.prefix.replaceAll(RE_LEADING_TRAILING_SLASH, '') + path;
        }

        return path;
    }

    const externalToInternalPath = (path: string) => {
        if (config.link?.prefix) {
            path = path.replace(new RegExp('^/' + config.link.prefix.replace(RE_LEADING_SLASH, '') + '(/)?'), '/');
        }

        return path;
    }

    const navigate = (to: string, replace?: boolean) => {
        try {
            if (replace) {
                history.replaceState(null, '', to);
            } else {
                history.pushState(null, '', to);
            }
        } catch (e) {
            window.location.assign(to);
        }
    }

    const matchPath = (pattern: string, path: string) => {
        const url = new URL(path, location.origin);
        const pathname = externalToInternalPath(url.pathname);
        const regexp = '^' + pattern.replace(RE_PATH_PARAMS, '[\/]?(?<$1>[^/]+)?').replace('*', '.*') + '$';
        const hasMatch = new RegExp(regexp, 'giu').test(pathname);
        if (!hasMatch) {
            return null;
        }

        const match = pathname.matchAll(new RegExp(regexp, 'giu'));
        const params = match?.next().value?.groups;
        const queryParams = convertURLSearchParamsToObject(url.searchParams);

        return {
            pathname: pathname,
            params: params,
            query: queryParams,
            pattern: pattern
        };
    }

    const generatePath = (pattern: string, parameters?: { [key: string]: string }, query?: {
        [key: string]: string
    }, hash?: string): string => {
        const path = pattern.replaceAll(RE_REPLACE_PARAMS, (match, p1) => {
            const value = parameters?.[p1];
            if (value !== undefined) {
                delete parameters?.[p1];
            }

            return value ?? '';
        }).replace(RE_TRAILING_SLASH, '');

        const url = new URL(path, location.origin);
        const querySearch = convertObjectToURLSearchParams(query || {});
        querySearch.entries().forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });

        if (hash) {
            url.hash = hash;
        }

        return internalToExternalPath(url.pathname + url.search + url.hash);
    }

    return {
        getAction,
        getActionByPath,
        getActionRequestByPath,
        navigate,
        actions,
        location,
        matchPath,
        generateRoute,
        generateRoutePath,
        crudToReactPathPattern,
        generateActionLink,
        generateLink,
        generatePath,
        internalToExternalPath,
        externalToInternalPath
    };
}

export function ActionProvider(props: PropsWithChildren) {
    let initActions: ActionType[] | null = null;
    try {
        const data = sessionStorage.getItem(STORAGE_KEY);
        initActions = JSON.parse(atob(data || '')) as ActionType[];
    } catch (e) {
    }

    const [actions, setActions] = useState<ActionType[] | null>(initActions);
    const [location, setLocation] = useState<URL>(new URL(document.location.href));

    useEffect(() => {
        const onUrlChange = (() => {
            setLocation(new URL(document.location.href));
        });

        window.addEventListener('pushstate', onUrlChange);
        window.addEventListener('replacestate', onUrlChange);
        window.addEventListener('popstate', onUrlChange);

        return () => {
            window.removeEventListener('pushstate', onUrlChange);
            window.removeEventListener('replacestate', onUrlChange);
            window.removeEventListener('popstate', onUrlChange);
        }
    }, []);

    useEffect(() => {
        if (initActions) {
            return;
        }

        CrudRequester().get({url: '/_crud/actions'}).then(({status, data}) => {
            if (status !== 200) {
                return;
            }

            sessionStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(data)));
            setActions(data);
        }).catch((e) => {
            console.log('error', e);
        }).finally(() => {

        });
    }, []);

    const value = useMemo(() => ({
        actions,
        location,
        setLocation,
    }), [actions, location]);

    return (
        <ActionContext.Provider value={value}>
            {props.children}
        </ActionContext.Provider>
    );
}

export function WithActionProviderContext<P extends {}>(Component: ComponentType<P>): FC<P> {

    return (props: P & { children?: ReactNode }) => (
        <ActionProvider>
            <Component {...props}/>
        </ActionProvider>
    );
}
