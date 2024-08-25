import {RouteType} from "@src/type/RouteType";

export type ActionType = {
    entity: string;
    namespace?: string;
    name: string;
    title?: string;
    object?: boolean;
    route?: RouteType
}
