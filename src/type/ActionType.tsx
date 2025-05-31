import {RouteType} from "@src/type/RouteType";

export enum ActionVisibility {
    List  = 'List',
    Object = 'Object',
    Internal = 'Internal'
};

export type ActionType = {
    entity: string;
    namespace?: string;
    name: string;
    title?: string;
    visibility?: ActionVisibility;
    route?: RouteType
}
