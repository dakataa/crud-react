import React, {ReactNode} from "react";
import {UseListItem} from "@src/context/ListItemContext.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import Action from "@src/component/crud/Action.tsx";
import IsListItemActionGranted from "@src/component/crud/IsListItemActionGranted.tsx";
import {OnClickAction} from "@src/type/OnClickAction.tsx";

const ItemAction = ({action, ...props}: {
    action: OnClickAction;
    className?: string;
    children?: ReactNode;
}) => {

    const {id} = UseListItem();

    return (
        <>
            <IsListItemActionGranted permission={action.action.permission}>
                <Action {...props} action={{...action, parameters: {...action.parameters, id: id}}}/>
            </IsListItemActionGranted>
        </>
    )
}

export default ItemAction;
