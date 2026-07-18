import {ColumnType} from "@crud-react/type/ColumnType";
import {ActionType} from "@crud-react/type/ActionType";
import {ListMetaType} from "@crud-react/type/ListMetaType";
import {FormType} from "@crud-react/type/FormType";

export type ListType = {
    title: string | null;
    entity: {
        name: string;
        columns: ColumnType[];
        primaryColumn: ColumnType;
        data: {
            items: [{ [key: string]: any }],
            meta: ListMetaType
        },
        acl: { [key: string]: [number|string] }
    },
    form: { [key: string]: FormType, filter: FormType, batch: FormType },
    sort: { [key: string]: 'ASC' | 'DESC' | null },
    action: { [key: string]: ActionType }
}
