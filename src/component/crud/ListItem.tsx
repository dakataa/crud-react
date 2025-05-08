import ColumnValue from "@src/component/crud/ColumnValue.tsx";
import React from "react";
import BatchItemSelector from "@src/component/crud/batch/BatchItemSelector.tsx";
import ColumnLabel from "@src/component/crud/ColumnLabel.tsx";
import ColumnActions from "@src/component/crud/ColumnActions.tsx";
import {UseList} from "@src/context/ListContext.tsx";

const ListItem = ({namespace}: {
    namespace?: string,
}) => {

    const {columns} = UseList();

    return (
        <div className={"card mb-3"}>
            <div className={"card-body"}>
                <div className={"d-flex flex-row align-items-start"}>
                    <BatchItemSelector/>
                    <div className={"d-flex flex-column flex-wrap gap-2"}>
                        {columns.map((column, index) => (
                            <div key={index}>
                            <span className={"text-secondary me-1"}>
                                <ColumnLabel column={column} namespace={namespace}/>:
                            </span>
                                <ColumnValue column={column} namespace={namespace}/>
                            </div>
                        ))}
                    </div>
                    <ColumnActions namespace={namespace}/>
                </div>
            </div>
        </div>
    );
}

export default ListItem;
