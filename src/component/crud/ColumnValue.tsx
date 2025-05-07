import {ColumnType} from "@src/type/ColumnType.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import React from "react";
import {ListType} from "@src/type/ListType.tsx";

const ColumnValue = ({column, row, data, namespace}: {
    column: ColumnType;
    row: number;
    data: ListType;
    namespace?: string;
}) => {
    const rowData = data.entity?.data?.items[row] || {};

    return (
        <DynamicView namespace={namespace} data={rowData} prefix={"list"} view={column.field}>
            {rowData[column.field] !== undefined && (
                rowData[column.field] instanceof Object ? (rowData[column.field] instanceof Array ? rowData[column.field].join(', ') : JSON.stringify(rowData[column.field])) : rowData[column.field]?.toString()
            )}
        </DynamicView>
    )
}

export default ColumnValue;
