import {ActionType} from "@src/type/ActionType.tsx";
import {Method, RequestBodyType} from "@dakataa/requester";

export type OnClickAction = {
    method?: Method,
    action: ActionType,
    parameters?: { [key: string]: any },
    query?: { [key: string]: any },
    body?: FormData | string | { [key: string]: any },
    bodyType?: RequestBodyType
};
