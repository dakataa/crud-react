import Dropdown, {DropdownButton, DropdownContent} from "@crud-react/component/Dropdown.tsx";
import Link from "@crud-react/component/Link.tsx";
import React from "react";
import {UseBatchActions} from "@crud-react/component/crud/batch/BatchActionsContext.tsx";
import {default as T} from "@crud-react/component/Translation.tsx";

const BatchActionSelector = () => {

    const {actions, isSelectedAll, toggleAll, selected, executeAction, clear} = UseBatchActions() || {};

    return actions && (
        <div className={"btn-group btn-group-sm mb-2"}>
            <label className={"btn btn-light"}>
                <input
                    checked={isSelectedAll}
                    onChange={(e) => toggleAll?.(e.target.checked)}
                    type={"checkbox"}/>
            </label>
            {!!selected?.length && (
                <Dropdown className={"btn btn-sm btn-light"}>
                    <DropdownButton disabled={!selected?.length} className={"bg-transparent border-0"}>
                        {!!selected?.length && (
                            <T properties={{"number": selected?.length}}>:number selected</T>
                        )}
                    </DropdownButton>
                    <DropdownContent>
                        {(Object.keys(actions).map((action) => {
                            return (<Link key={action} to={"#"} onClick={() => executeAction?.(action)}
                                          className={"dropdown-item"}>{actions[action]}</Link>
                            )
                        }))}
                    </DropdownContent>
                </Dropdown>
            )}
            {!!selected?.length && (
                <button title={"Clear selection"} onClick={clear} className={"btn btn-light"}>&times;</button>
            )}

        </div>
    )
}

export default BatchActionSelector;
