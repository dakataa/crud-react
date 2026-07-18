import {RouteType} from "@crud-react/type/RouteType";

export type RedirectType = {
    route: RouteType;
    parameters: {[key: string]: string};
}
