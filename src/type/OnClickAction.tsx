import {ActionType} from "@src/type/ActionType.tsx";

export type OnClickAction = {
    action: ActionType,
    parameters?: { [key: string]: any }
    query?: { [key: string]: any }
};
