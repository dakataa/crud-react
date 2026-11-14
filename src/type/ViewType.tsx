import type { ColumnType } from "@crud-react/type/ColumnType";
import type { ActionType } from "@crud-react/type/ActionType";

export type ViewType = {
    action: ActionType[];
    title: string | null;
    entity: {
        name: string;
        columns: ColumnType[];
        primaryColumn: ColumnType;
        data: { [key: string]: any };
        acl: { [key: string]: [number | string] };
    };
};
