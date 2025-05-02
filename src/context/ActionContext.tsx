import React, {ComponentType, FC, PropsWithChildren, ReactElement, useEffect, useState} from "react";
import {ActionType} from "@src/type/ActionType.tsx";
import {OnClickAction} from "@src/component/crud/GridView.tsx";
import {CrudRequester} from "@src/Crud.tsx";
import Exception from "@src/component/error/Exception.tsx";
import {UseConfig} from "@src/context/ConfigContext.tsx";
import {RouteType} from "@src/type/RouteType.tsx";

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


    const config = UseConfig();
    const {actions, location, setLocation} = context ?? {
        actions: null,
        location: new URL(document.location.href),
        setLocation: () => {
        }
    };

    const getAction = (entity: string, name: string, namespace?: string): ActionType | undefined => {
        return actions?.filter(a => a.entity === entity && a.name === name && (namespace === undefined || a.namespace === namespace)).shift();
    }

    const getActionByPath = (path: string): ActionType | undefined => {
        return actions?.find((a) => a.route?.path && matchPath(a.route.path, path));
    };

    const getOnClickActionByPath = (path: string): Promise<OnClickAction|null> => {
        const getOnClickAction = () => {
            const action = getActionByPath(path);
            if(!action) {
                return null;
            }

            const match = matchPath(action.route?.path || '', path);
            return {
                action,
                parameters: match?.params
            };
        }

        return new Promise<OnClickAction|null>((resolve) => {
            let retries = 0;
            const timeout = () => {
                if(retries > 10) {
                    throw new Exception(0, 'Cannot load routes');
                }

                if(context) {
                    return resolve(getOnClickAction());
                }

                setTimeout(timeout, 200);
                retries++;
            }

            timeout();
        });

    }

    const crudToReactPathPattern = (path: string) => {
        return path.replaceAll(new RegExp('{(.*?)}', 'gi'), ':$1');
    }

    const generateRoutePath = (path: string, parameters: {} | undefined = undefined): string => {
        return generatePath(crudToReactPathPattern(path), parameters);
    }

    const generateRoute = (route?: RouteType, parameters?: { [key: string]: any } | null): string => {
        return route ? generateRoutePath(route.path, {...route.defaults || {}, ...parameters}) : '#';
    }

    const generateActionLink = (onClickAction: OnClickAction): string => {
        const action = getAction(onClickAction.action.entity, onClickAction.action.name, onClickAction.action.namespace);

        return generateRoute(action?.route, onClickAction.parameters)
    }

    const generateLink = (route?: RouteType, parameters?: { [key: string]: string } | null): string => {
        const path = generateRoute(route, parameters);

        return internalToExternalPath(path);
    }

    const internalToExternalPath = (path: string) => {
        if (config.link?.prefix) {
            path = '/' + config.link.prefix.replaceAll(new RegExp('^\/|\/$', 'g'), '') + path;
        }

        return path;
    }

    const navigate = (to: string) => {
        try {
            history.pushState(null, '', to);
        } catch (e) {
            window.location.assign(to);
        }
    }

    const matchPath = (pattern: string, path: string) => {
        const regexp = '^' +pattern.replace(new RegExp('[{:](\\w+)}?', 'g'), '(?<$1>[^/]+)')  + '$';
        const hasMatch = new RegExp(regexp, 'giu').test(path);
        if(!hasMatch) {
            return null;
        }

        const match = path.matchAll(new RegExp(regexp, 'giu'));
        const params = match?.next().value?.groups;

        return {
            pathname: path,
            params:  params,
            pattern: pattern
        };
    }

    const generatePath = (pattern: string, parameters?: {[key:string]: string}): string => {
        return pattern.replaceAll(new RegExp('[{:](\\w+)}?', 'g'), (match, p1) => {
            return parameters?.[p1] || '';
        });
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
        generateLink
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
        if(!location) {
            return;
        }

        if(location.toString() === document.location.toString()) {
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
        if (initActions)
            return;

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

export function withRouterContext<P extends {}>(component: ComponentType<P>): FC<P> {
    return (props: P) => {
        const reactComponent = React.createElement(component, props);

        return (
            <ActionProvider>
                {reactComponent}
            </ActionProvider>
        )
    };
}
