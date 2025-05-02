import React, {useState} from "react";
import {UseBatchActions} from "@src/component/crud/batch/BatchActionsContext.tsx";

const BatchItemSelector = ({row}: { row: number }) => {

    const {toggle, isSelected} = UseBatchActions();

    return (
        <>
            <input
                checked={isSelected(row)}
                className={"me-2 float-start"}
                type="checkbox"
                name={"batch"}
                onChange={(e) => toggle(row, e.target.checked)}
            />
        </>
    );
}

export default BatchItemSelector;
