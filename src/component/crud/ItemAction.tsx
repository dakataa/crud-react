import React, {ReactNode} from "react";
import {UseListItem} from "@src/context/ListItemContext.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import Action from "@src/component/crud/Action.tsx";
import IsItemActionGranted from "@src/component/crud/IsItemActionGranted.tsx";

const ItemAction = ({routeParams, action, ...props}: {
    action: ActionType;
    routeParams?: { [key: string]: any };
    className?: string;
    children?: ReactNode;
}) => {

    const {id} = UseListItem();

    return (
        <>
            <IsItemActionGranted action={action.name}>
                <Action action={action} {...props} routeParams={{...routeParams, id}}/>
            </IsItemActionGranted>
        </>
    )
}

export default ItemAction;
