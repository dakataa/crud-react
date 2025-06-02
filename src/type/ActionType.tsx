import {RouteType} from "@src/type/RouteType";

export enum ActionVisibility {
    List  = 'list',
    Object = 'object',
    Internal = 'internal'
};

export type ActionType = {
    entity: string;
    namespace?: string;
    name: string;
    title?: string;
    visibility?: ActionVisibility;
    route?: RouteType
}
