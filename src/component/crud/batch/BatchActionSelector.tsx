import Dropdown, {DropdownButton, DropdownContent} from "@src/component/Dropdown.tsx";
import Link from "@src/component/Link.tsx";
import React from "react";
import {UseBatchActions} from "@src/component/crud/batch/BatchActionsContext.tsx";
import {default as T} from "@src/component/Translation.tsx";

const BatchActionSelector = () => {

    const {actions, isSelectedAll, toggleAll, selected, executeAction, clear} = UseBatchActions();

    return actions && (
        <div className={"btn-group btn-group-sm mb-2"}>
            <label className={"btn btn-light"}>
                <input
                    checked={isSelectedAll}
                    onChange={(e) => toggleAll(e.target.checked)}
                    type={"checkbox"}/>
            </label>
            <Dropdown className={"btn-group btn-group-sm"}>
                <DropdownButton disabled={!selected?.length} className={"btn-light"}>
                    {!!selected?.length && (
                        <T properties={{"number": selected?.length}}>:number selected</T>
                    )}
                </DropdownButton>
                <DropdownContent>
                    {(Object.keys(actions).map((action) => {
                        return (<Link key={action} to={"#"} onClick={() => executeAction(action)}
                                      className={"dropdown-item"}>{actions[action]}</Link>
                        )
                    }))}
                </DropdownContent>
            </Dropdown>
            {!!selected?.length && (
                <button title={"Clear selection"} onClick={clear} className={"btn btn-light"}>&times;</button>
            )}

        </div>
    )
}

export default BatchActionSelector;
