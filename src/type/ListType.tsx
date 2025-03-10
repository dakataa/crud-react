import {ColumnType} from "@src/type/ColumnType";
import {ActionType} from "@src/type/ActionType";
import {ListMetaType} from "@src/type/ListMetaType";
import {FormType} from "@src/type/FormType";

export type ListType = {
    title: string | null;
    entity: {
        name: string;
        columns: ColumnType[];
        primaryColumn: ColumnType;
        data: {
            items: [{ [key: string]: any }],
            meta: ListMetaType
        }
    },
    form: { [key: string]: FormType, filter: FormType, batch: FormType },
    sort: { [key: string]: 'ASC' | 'DESC' | null },
    action: { [key: string]: ActionType }
}
