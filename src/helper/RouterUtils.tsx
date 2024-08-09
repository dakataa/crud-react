import {generatePath} from "react-router-dom";
import {RouteType} from "@src/type/RouteType.tsx";

const crudToReactPath = (path: string) => {
    return path.replaceAll(new RegExp('{(.*?)}', 'gi'), ':$1');
}


const generateRoute = (route?: RouteType, variables: any = undefined): string => {
    return route ? generatePath(crudToReactPath(route.path), {...route.defaults || {}, ...variables}) :'#';
}

const generateRoutePath = (path: string, variables: any = undefined): string => {
    return generatePath(crudToReactPath(path), variables);
}

export {generateRoutePath, generateRoute, crudToReactPath};
