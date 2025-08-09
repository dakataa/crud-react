import React, {ReactNode} from "react";
import {UseListItem} from "@src/context/ListItemContext.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import Action from "@src/component/crud/Action.tsx";
import {UseDataProvider} from "@src/context/GetData.tsx";

const ItemAction = ({routeParams, ...props}: {
    action: ActionType;
    routeParams?: { [key: string]: any };
    className?: string;
    children?: ReactNode;
}) => {

    const {id} = UseListItem();
    const {results: data} = UseDataProvider() || {};

    if(!Object.values(data.entity.data.acl[props.action.name] || []).includes(id)) {
        return null;
    }

    return <Action {...props} routeParams={{...routeParams, id}} />
}

export default ItemAction;
