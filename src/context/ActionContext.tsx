import React, {ComponentType, FC, PropsWithChildren, ReactNode, useEffect, useRef, useState} from "react";
import {ActionType} from "@src/type/ActionType.tsx";
import {OnClickAction} from "@src/component/crud/GridView.tsx";
import {CrudRequester} from "@src/Crud.tsx";
import {UseConfig} from "@src/context/ConfigContext.tsx";
import {RouteType} from "@src/type/RouteType.tsx";
import {convertURLSearchParamsToObject} from "@dakataa/requester";

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

type RouterContextType = {
    location: URL;
    setLocation: (location: URL) => void;
    actions: ActionType[] | null;
};

const ActionContext = React.createContext<RouterContextType | undefined>(undefined);

export function UseActions() {
    const context = React.useContext<RouterContextType | undefined>(ActionContext);
    if (!context) {
        throw new Error('UseActions  must be used in ActionProvider');
    }

    const contextRef = useRef(context);
    contextRef.current = context;

    const config = UseConfig();
    const {actions, location, setLocation} = context;

    const getAction = (entity: string, name: string, namespace?: string): ActionType | undefined => {
        return actions?.filter(a => a.entity === entity && a.name === name && (namespace === undefined || a.namespace === namespace)).shift();
    }

    const getActionByPath = (path: string): ActionType | undefined | null => {
        if (!actions) {
            return undefined;
        }

        return actions.find((a) => a.route?.path && matchPath(a.route.path, path)) ?? null;
    };

    const getOnClickActionByPath = (path: string): OnClickAction | null | undefined => {
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
        return path.replaceAll(new RegExp('{(.*?)}', 'gi'), ':$1');
    }

    const generateRoutePath = (path: string, parameters?: { [key: string]: any }, query?: { [key: string]: any }): string => {
        return generatePath(crudToReactPathPattern(path), parameters, query);
    }

    const generateRoute = (route?: RouteType, parameters?: { [key: string]: any }, query?: { [key: string]: any }): string => {
        return route ? generateRoutePath(route.path, {...route.defaults || {}, ...parameters}, query) : '#';
    }

    const generateActionLink = (onClickAction: OnClickAction): string => {
        console.log('gem', onClickAction);
        const action = getAction(onClickAction.action.entity, onClickAction.action.name, onClickAction.action.namespace);

        return generateRoute(action?.route, onClickAction.parameters, onClickAction.query)
    }

    const generateLink = (route?: RouteType, parameters?: { [key: string]: string }, query?: { [key: string]: string }): string => {
        const path = generateRoute(route, parameters, query);

        return internalToExternalPath(path);
    }

    const internalToExternalPath = (path: string) => {
        if (config.link?.prefix) {
            path = '/' + config.link.prefix.replaceAll(new RegExp('^\/|\/$', 'g'), '') + path;
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
        const regexp = '^' + pattern.replace(new RegExp('\/[{:](\\w+)}?', 'g'), '[\/]?(?<$1>[^/]+)?') + '$';
        const hasMatch = new RegExp(regexp, 'giu').test(url.pathname);
        if (!hasMatch) {
            return null;
        }

        const match = url.pathname.matchAll(new RegExp(regexp, 'giu'));
        const params = match?.next().value?.groups;
        const queryParams = convertURLSearchParamsToObject(url.searchParams);

        return {
            pathname: url.pathname,
            params: params,
            query: queryParams,
            pattern: pattern
        };
    }

    const generatePath = (pattern: string, parameters?: { [key: string]: string }, query?: { [key: string]: string }): string => {
        const path = pattern.replaceAll(new RegExp('[{:](\\w+)}?', 'g'), (match, p1) => {
            const value = parameters?.[p1];
            if (value !== undefined) {
                delete parameters?.[p1];
            }

            return value ?? '';
        });

        const url = new URL(path, location.origin);
        Object.keys(query || {}).forEach((k) => {
            url.searchParams.set(k, query?.[k] ?? '')
        });

        return url.pathname + url.search
    }

    return {
        getAction,
        getActionByPath,
        getOnClickActionByPath,
        navigate,
        location,
        matchPath,
        generateRoute,
        generateRoutePath,
        crudToReactPathPattern,
        generateActionLink,
        generateLink,
        internalToExternalPath
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
        if (!location) {
            return;
        }

        if (location.toString() === document.location.toString()) {
            return;
        }

        try {
            history.pushState(null, '', location);
        } catch (e) {
            window.location.assign(location);
        }
    }, [location.toString()]);

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

    return (
        <ActionContext.Provider value={{
            actions,
            location,
            setLocation,
        }}>
            {props.children}
        </ActionContext.Provider>
    );
}

export function WithRouterContext<P extends {}>(Component: ComponentType<P>): FC<P> {

    return (props: P & { children?: ReactNode }) => (
        <ActionProvider>
            <Component {...props}/>
        </ActionProvider>
    );
}
