import {ColumnType} from "@src/type/ColumnType";
import {FormViewType} from "@src/type/FormViewType";
import {ActionType} from "@src/type/ActionType";
import {ListMetaType} from "@src/type/ListMetaType";
import {FormType} from "@src/type/FormType";

export type ListType = {
    title: string | null;
    entity: {
        columns: ColumnType[];
        primaryColumn: ColumnType;
        data: {
            items: [],
            meta: ListMetaType
        }
    },
    form: { [key: string]: FormType },
    sort: { [key: string]: 'ASC' | 'DESC' | null },
    action: { [key: string]: ActionType }
}
