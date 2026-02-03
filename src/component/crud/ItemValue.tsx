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

    return data && (
        <DynamicView namespace={namespace} data={data} prefix={"list"} view={column.field}>
            {data[column.field] !== undefined && (
                data[column.field] instanceof Object ? (data[column.field] instanceof Array ? data[column.field].join(', ') : JSON.stringify(data[column.field])) : <Translation>{data[column.field]?.toString()}</Translation>
            )}
        </DynamicView>
    )
}

export default ItemValue;
