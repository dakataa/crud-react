import {ColumnType} from "@crud-react/type/ColumnType";

export type ViewType = {
    title: string | null;
    entity: {
        name: string;
        columns: ColumnType[];
        primaryColumn: ColumnType;
        data: { [key: string]: any },
        acl: { [key: string]: [number | string] }
    }
}
