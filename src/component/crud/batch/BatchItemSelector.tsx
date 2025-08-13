import React from "react";
import {UseBatchActions} from "@src/component/crud/batch/BatchActionsContext.tsx";
import {UseListItem} from "@src/context/ListItemContext.tsx";

const BatchItemSelector = ({className}: {className?: string}) => {

    const {index} = UseListItem();
    const {actions, toggle, isSelected} = UseBatchActions();

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
