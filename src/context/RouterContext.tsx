import {generatePath, matchPath as reactRouterMatchPath, UNSAFE_RouteContext} from "react-router";
import {UseConfig} from "@src/context/ConfigContext.tsx";
import {RouteType} from "@src/type/RouteType.tsx";
import React, {PropsWithChildren, useContext, useEffect, useState} from "react";

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

type RouterContextType = {
    location: URL
    setLocation: (location: URL) => void
};

const RouterContext = React.createContext<RouterContextType | undefined>(undefined);

const UseRouter = () => {

    const context = React.useContext<RouterContextType | undefined>(RouterContext);
    const {location, setLocation} = context || {
        location: new URL(document.location.href),
        setLocation: () => {
        }
    };

    const config = UseConfig();
    const routeContext = useContext(UNSAFE_RouteContext);

    const crudToReactPathPattern = (path: string) => {
        return path.replaceAll(new RegExp('{(.*?)}', 'gi'), ':$1');
    }

    const generateRoutePath = (path: string, parameters: {} | undefined = undefined): string => {
        return generatePath(crudToReactPathPattern(path), parameters);
    }

    const generateRoute = (route?: RouteType, parameters?: { [key: string]: string } | null): string => {
        return route ? generateRoutePath(route.path, {...route.defaults || {}, ...parameters}) : '#';
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

    const getParentReactRoute = () => {
        return routeContext.matches.reverse()[1] ?? null;
    }

    const navigate = (to: string) => {
        try {
            history.pushState(null, '', to);
        } catch (e) {
            window.location.assign(to);
        }
    }

    const matchPath = (pattern: string, path: string) => {
        return reactRouterMatchPath(crudToReactPathPattern(pattern), path);
    }

    return {
        navigate,
        location,
        matchPath,
        generateRoute,
        generateRoutePath,
        crudToReactPathPattern,
        generateLink,
        getParentReactRoute,
    }

}


export function RouterContextProvider(props: PropsWithChildren) {
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

    return (
        <RouterContext.Provider value={{
            location,
            setLocation,
        }}>
            {props.children}
        </RouterContext.Provider>
    );
}

export function withRouterContext(component: any): any {
    return (props: any) => {
        const reactComponent = React.createElement(component as any, props);

        return (
            <RouterContextProvider>
                {reactComponent}
            </RouterContextProvider>
        )
    };
}

export {UseRouter};
