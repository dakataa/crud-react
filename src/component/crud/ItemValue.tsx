import {ColumnType} from "@crud-react/type/ColumnType.tsx";
import DynamicView from "@crud-react/component/crud/DynamicView.tsx";
import React from "react";
import {UseListItem} from "@crud-react/context/ListItemContext.tsx";
import Translation from "@crud-react/component/Translation.tsx";
import {UseCurrentActionRequest} from "@crud-react/component/crud/CrudLoader.tsx";

const ItemValue = ({column, namespace}: {
    column: ColumnType;
    namespace?: string;
}) => {
    const {data} = UseListItem();
    const {actionRequest: currentActionRequest} = UseCurrentActionRequest()

    if (!data) {
        return null;
    }

    const value = column.useFlatKey
        ? data[column.field]
        : column.field.split('.').reduce<unknown>((currentValue, key) => {
            if (typeof currentValue !== 'object' || currentValue === null) {
                return undefined;
            }

            return (currentValue as Record<string, unknown>)[key];
        }, data);

    return (
        <DynamicView
            namespace={namespace}
            data={data}
            prefix={currentActionRequest.action.name || "list"}
            view={column.field}
        >
            {
                Array.isArray(value) ? value.join(', ') : <Translation>{value == null ? undefined : String(value)}</Translation>
            }
        </DynamicView>
    )
}

export default ItemValue;
