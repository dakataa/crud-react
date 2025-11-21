import React from "react";
import {UseBatchActions} from "@src/component/crud/batch/BatchActionsContext.tsx";
import {UseListItem} from "@src/context/ListItemContext.tsx";

const BatchItemSelector = ({className}: {className?: string}) => {

    const {index} = UseListItem();
    const batchActions = UseBatchActions();
    if(!batchActions) {
        return <></>;
    }

    const {actions, toggle, isSelected} = batchActions;

    return Object.keys(actions || {}).length > 0 && (
        <>
            <input
                checked={isSelected(index)}
                className={className}
                type="checkbox"
                name={"batch"}
                onChange={(e) => toggle(index, e.target.checked)}
            />
        </>
    );
}

export default BatchItemSelector;
