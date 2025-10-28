import React, {Children, PropsWithChildren, ReactNode, useEffect, useRef, useState} from "react";
import {UseActions} from "@src/context/ActionContext.tsx";

type RouteItemType = {
    path?: string;
    element?: ReactNode;
    items?: RouteItemType[];
    parent?: RouteItemType;
}

const RouteItemViewContext = React.createContext<RouteItemType | null>(null);

const RouteItemView = ({item}: { item: RouteItemType }) => {
    return (
        <RouteItemViewContext.Provider value={item}>
            {item.parent?.parent ? (
                <RouteItemView item={item.parent}/>
            ) : item.parent?.element ? item.parent.element : item.element}
        </RouteItemViewContext.Provider>
    )
}

const Outlet = () => {
    const context = React.useContext(RouteItemViewContext);
    return context?.element || 'Empty';
}

const Router = ({children}: PropsWithChildren) => {
    const buildRoutes = (element: ReactNode, parent?: RouteItemType): RouteItemType[] => {
        return Children.toArray(element).reduce((result: RouteItemType[], item: ReactNode): RouteItemType[] => {
            const props = item.props as PropsWithChildren & RouteItemType;
            const fixPath = (path?: string) => {
                return path?.replace(/\/$/, '');
            }
            const path = [parent?.path, props?.path].filter(v => v).map(v => fixPath(v)).join('/');
            const items = buildRoutes(props.children, {path, element: props.element});

            return [
                ...result,
                ...(items.length ? items : [{
                    path: '/' + path,
                    element: props?.element,
                    parent: parent
                }]),
            ]
        }, []) as RouteItemType[];
    }

    const routes = useRef<RouteItemType[] | null>(null);
    if (routes.current === null) {
        routes.current = buildRoutes(children);
    }

    const {matchPath} = UseActions();
    const route = routes.current.filter(item => {
        return item.path && matchPath(item.path, document.location.href)
    }).shift();
    const [, setLocation] = useState<string>(document.location.href);

    const locationUpdater = () => {
        setLocation(document.location.href);
    }

    useEffect(() => {
        locationUpdater();
        window.addEventListener('locationchange', locationUpdater);

        return () => {
            window.removeEventListener('locationchange', locationUpdater);
        }
    }, []);

    if (!route) {
        return;
    }

    return (
        <>
            <RouteItemView item={route}/>
        </>
    );
}

const Route = (props: PropsWithChildren & RouteItemType) => {

    return null;
}


export {Route, Router, Outlet};
