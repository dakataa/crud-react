import ItemValue from "@crud-react/component/crud/ItemValue.tsx";
import React from "react";
import BatchItemSelector from "@crud-react/component/crud/batch/BatchItemSelector.tsx";
import ItemLabel from "@crud-react/component/crud/ItemLabel.tsx";
import ItemActions from "@crud-react/component/crud/ItemActions.tsx";
import {UseList} from "@crud-react/context/ListContext.tsx";
import {ColumnType} from "@crud-react/type/ColumnType.tsx";

const ListItem = ({namespace}: {
    namespace?: string,
}) => {

    const {columns} = UseList();

    return (
        <div className={"card mb-3"}>
            <div className={"card-body"}>
                <div className={"d-flex flex-row gap-3 align-items-start"}>
                    <BatchItemSelector/>
                    <div className={"d-flex flex-column flex-wrap gap-2"}>
                        {columns.map((column: ColumnType, index: number) => (
                            <div className={"d-flex align-items-start"} key={index}>
                                <span className={"text-secondary me-1"}>
                                    <ItemLabel column={column} namespace={namespace}/>:
                                </span>
                                <ItemValue column={column} namespace={namespace}/>
                            </div>
                        ))}
                    </div>
                    <div className={"ms-auto"}>
                        <ItemActions namespace={namespace}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListItem;
