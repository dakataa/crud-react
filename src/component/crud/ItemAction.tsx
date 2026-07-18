import React, {ReactNode} from "react";
import {UseListItem} from "@crud-react/context/ListItemContext.tsx";
import ActionLink from "./ActionLink.tsx";
import IsListItemActionGranted from "@crud-react/component/crud/IsListItemActionGranted.tsx";
import {ActionRequestType} from "@crud-react/type/ActionRequestType.tsx";
import Translation from "@crud-react/component/Translation.tsx";
import {UseCurrentActionRequest} from "@crud-react/component/crud/CrudLoader.tsx";

const ItemAction = ({action, icon, className, ...props}: {
    action: ActionRequestType;
    className?: string;
    icon?: ReactNode;
    children?: ReactNode;
}) => {
    const {id} = UseListItem();

    const {actionRequest: currentAction} = UseCurrentActionRequest();
    const parameters = {...(action.parameters),  ...(currentAction?.parameters || {}), id: id}

    return (
        <>
            <IsListItemActionGranted permission={action.action.permission}>
                <ActionLink {...props} action={{...action, parameters}} className={className}>
                    {icon}<Translation>{action.action.title ?? action.action.name}</Translation>
                </ActionLink>
            </IsListItemActionGranted>
        </>
    )
}

export default ItemAction;
