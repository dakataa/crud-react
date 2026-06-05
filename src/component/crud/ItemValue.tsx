import {ColumnType} from "@src/type/ColumnType.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import React from "react";
import {UseListItem} from "@src/context/ListItemContext.tsx";
import Translation from "@src/component/Translation.tsx";

const ItemValue = ({column, namespace}: {
    column: ColumnType;
    namespace?: string;
}) => {
    const {data} = UseListItem();

    if(!data) {
        return null;
    }

    let value = data;

    if(column.useFlatKey) {
        value = value?.[column.field];
    } else {
        column.field.split('.').forEach((key) => {
            value = value?.[key];
        });
    }

    return (
        <DynamicView namespace={namespace} data={data} prefix={"list"} view={column.field}>
            {
                Array.isArray(value) ? value.join(', ')  : <Translation>{value?.toString()}</Translation>
            }
        </DynamicView>
    )
}

export default ItemValue;
