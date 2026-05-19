import React, {ReactNode} from "react";
import {UseListItem} from "@src/context/ListItemContext.tsx";
import Action from "@src/component/crud/Action.tsx";
import IsListItemActionGranted from "@src/component/crud/IsListItemActionGranted.tsx";
import {ActionRequestType} from "../../type/ActionRequestType.tsx";

const ItemAction = ({action, ...props}: {
    action: ActionRequestType;
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
