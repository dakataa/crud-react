import React, {ReactNode} from "react";
import {UseListItem} from "@src/context/ListItemContext.tsx";
import ActionLink from "./ActionLink.tsx";
import IsListItemActionGranted from "@src/component/crud/IsListItemActionGranted.tsx";
import {ActionRequestType} from "../../type/ActionRequestType.tsx";
import Translation from "@src/component/Translation.tsx";

const ItemAction = ({action, icon, className, ...props}: {
    action: ActionRequestType;
    className?: string;
    icon?: ReactNode;
    children?: ReactNode;
}) => {
    const {id} = UseListItem();

    return (
        <>
            <IsListItemActionGranted permission={action.action.permission}>
                <ActionLink {...props} action={{...action, parameters: {...action.parameters, id: id}}} className={className}>
                    {icon}<Translation>{action.action.title ?? action.action.name}</Translation>
                </ActionLink>
            </IsListItemActionGranted>
        </>
    )
}

export default ItemAction;
