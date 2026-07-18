import DynamicView from "@crud-react/component/crud/DynamicView.tsx";
import React from "react";
import {UseListItem} from "@crud-react/context/ListItemContext.tsx";
import {UseList} from "@crud-react/context/ListContext.tsx";
import ItemAction from "@crud-react/component/crud/ItemAction.tsx";

const ItemActions = ({namespace, routeParams}: {
    namespace?: string;
    routeParams?: { [key: string]: any },
}) => {
    const {objectActions} = UseList();
    const {data} = UseListItem();

    return data && (
        <DynamicView namespace={namespace} data={data} prefix={"list"} view={"object.actions"}>
            {objectActions?.map((action, index) => (
                <ItemAction
                    key={index}
                    action={{action, parameters: routeParams}}
                    className={['btn', 'btn-sm', 'mb-1', 'ms-1', (action.route?.methods ?? []).includes('DELETE') ? 'btn-outline-danger' : 'btn-outline-secondary'].join(' ')}
                />
            ))}
        </DynamicView>
    )
}

export default ItemActions;
