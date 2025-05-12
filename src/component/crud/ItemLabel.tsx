import {ColumnType} from "@src/type/ColumnType.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import React from "react";

const ItemLabel = ({column, namespace}: {
    column: ColumnType;
    namespace?: string;
}) => {

    return (
        <>
            <DynamicView namespace={namespace} data={column} prefix={"list"} view={column.field + '.label'}>{column.label}</DynamicView>
        </>
    )
}

export default ItemLabel;
