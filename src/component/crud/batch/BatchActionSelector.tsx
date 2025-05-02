import Dropdown, {DropdownButton, DropdownContent} from "@src/component/Dropdown.tsx";
import Link from "@src/component/Link.tsx";
import React from "react";
import {UseBatchActions} from "@src/component/crud/batch/BatchActionsContext.tsx";

const BatchActionSelector = () => {

    const {actions, isSelectedAll, toggleAll, selected, executeAction} = UseBatchActions();

    return actions && (
        <div className={"btn-group btn-group-sm mb-2"}>
            <label className={"btn btn-light"}>
                <input
                    checked={isSelectedAll}
                    onChange={(e) => toggleAll(e.target.checked)}
                    type={"checkbox"}/>
            </label>
            <Dropdown className={"btn-group btn-group-sm"}>
                {!!selected?.length && (
                    <>{selected?.length} selected</>
                )}
                <DropdownButton disabled={!selected?.length} className={"btn-light"}></DropdownButton>
                <DropdownContent>
                    {(Object.keys(actions).map((action) => {
                        return (<Link key={action} to={"#"} onClick={() => executeAction(action)} className={"dropdown-item"}>{actions[action]}</Link>
                        )}))}
                </DropdownContent>
            </Dropdown>
        </div>
    )
}

export default BatchActionSelector;
