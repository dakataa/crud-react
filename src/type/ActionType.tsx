import {RouteType} from "@src/type/RouteType";

export type ActionType = {
    name: string;
    title?: string;
    object?: boolean;
    route?: RouteType
}
