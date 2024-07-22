import {RouteType} from "@src/type/RouteType";

export type RedirectType = {
    route: RouteType;
    parameters: {[key: string]: string};
}
