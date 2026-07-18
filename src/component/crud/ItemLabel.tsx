import {ColumnType} from "@crud-react/type/ColumnType.tsx";
import DynamicView from "@crud-react/component/crud/DynamicView.tsx";
import React from "react";
import Translation from "@crud-react/component/Translation.tsx";

const ItemLabel = ({column, namespace}: {
    column: ColumnType;
    namespace?: string;
}) => {

    return (
        <>
            <DynamicView namespace={namespace} data={column} prefix={"list"} view={column.field + '.label'}>
                <Translation>{column.label}</Translation>
            </DynamicView>
        </>
    )
}

export default ItemLabel;
