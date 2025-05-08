import React from "react";
import {UseBatchActions} from "@src/component/crud/batch/BatchActionsContext.tsx";
import {UseListItem} from "@src/context/ListItemContext.tsx";

const BatchItemSelector = () => {

    const {index} = UseListItem();
    const {toggle, isSelected} = UseBatchActions();

    return (
        <>
            <input
                checked={isSelected(index)}
                className={"me-2 float-start"}
                type="checkbox"
                name={"batch"}
                onChange={(e) => toggle(index, e.target.checked)}
            />
        </>
    );
}

export default BatchItemSelector;
