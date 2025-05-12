import React, {ReactNode} from "react";
import {UseListItem} from "@src/context/ListItemContext.tsx";
import Link from "@src/component/Link.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {UseList} from "@src/context/ListContext.tsx";
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
