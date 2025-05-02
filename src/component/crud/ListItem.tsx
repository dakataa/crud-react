import {GridViewType, OnClickAction} from "@src/component/crud/GridView.tsx";
import ColumnValue from "@src/component/crud/ColumnValue.tsx";
import React from "react";
import BatchItemSelector from "@src/component/crud/batch/BatchItemSelector.tsx";
import {ListType} from "@src/type/ListType.tsx";
import ColumnLabel from "@src/component/crud/ColumnLabel.tsx";

const ListItem = ({row, data, onClick, namespace}: {
    data: ListType;
    row: number;
    onClick?: (props: OnClickAction, event: React.MouseEvent) => void,
    namespace?: string,
}) => {

    const columns = (data?.entity?.columns || []).filter(c => c.visible).filter(c => c.group !== false);

    return (
        <div className={"card mb-3"}>
            <div className={"card-body"}>
                <BatchItemSelector row={row}/>
                <div className={"d-flex flex-column flex-wrap gap-2"}>
                    {columns.map((column, index) => (
                        <div key={index}>
                            <span className={"text-secondary me-1"}>
                                <ColumnLabel column={column} namespace={namespace} />:
                            </span>
                            <ColumnValue column={column} row={row} data={data} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListItem;
