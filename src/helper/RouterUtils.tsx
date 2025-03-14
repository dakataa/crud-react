import {generatePath, UNSAFE_RouteContext} from "react-router";
import {RouteType} from "@src/type/RouteType.tsx";
import {useContext} from "react";

const crudToReactPathPattern = (path: string) => {
    return path.replaceAll(new RegExp('{(.*?)}', 'gi'), ':$1');
}

const generateRoute = (route?: RouteType, parameters?: {[key: string]: string} | null): string => {
    return route ? generatePath(crudToReactPathPattern(route.path), {...route.defaults || {}, ...parameters}) : '#';
}

const generateRoutePath = (path: string, parameters: {} | undefined = undefined): string => {
    return generatePath(crudToReactPathPattern(path), parameters);
}

const UseCurrentReactRoute = () => {
    const routeContext = useContext(UNSAFE_RouteContext);
    return routeContext.matches[0] ?? null;
}

export {generateRoutePath, generateRoute, crudToReactPathPattern, UseCurrentReactRoute};
