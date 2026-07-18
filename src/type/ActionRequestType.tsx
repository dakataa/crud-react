import {ActionType} from "@crud-react/type/ActionType.tsx";
import {Method, RequestBodyType} from "@dakataa/requester";

export type ActionRequestType = {
    method?: Method,
    action: ActionType,
    parameters?: { [key: string]: any },
    query?: { [key: string]: any },
    body?: FormData | string | { [key: string]: any },
    bodyType?: RequestBodyType,
    hash?: string,
};
