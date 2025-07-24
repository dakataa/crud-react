import React, {ReactNode} from "react";
import {UseListItem} from "@src/context/ListItemContext.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import Action from "@src/component/crud/Action.tsx";

const ItemAction = ({routeParams, ...props}: {
    action: ActionType;
    routeParams?: { [key: string]: any };
    className?: string;
    children?: ReactNode;
}) => {

    const {id} = UseListItem();

    return <Action {...props} routeParams={{...routeParams, id}} />
}

export default ItemAction;
