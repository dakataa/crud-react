import ItemValue from "@src/component/crud/ItemValue.tsx";
import React from "react";
import BatchItemSelector from "@src/component/crud/batch/BatchItemSelector.tsx";
import ItemLabel from "@src/component/crud/ItemLabel.tsx";
import ItemActions from "@src/component/crud/ItemActions.tsx";
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
                                <ItemLabel column={column} namespace={namespace}/>:
                            </span>
                                <ItemValue column={column} namespace={namespace}/>
                            </div>
                        ))}
                    </div>
                    <ItemActions namespace={namespace}/>
                </div>
            </div>
        </div>
    );
}

export default ListItem;
