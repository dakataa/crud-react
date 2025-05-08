import DynamicView from "@src/component/crud/DynamicView.tsx";
import React from "react";
import {UseListItem} from "@src/context/ListItemContext.tsx";
import {UseList} from "@src/context/ListContext.tsx";
import Action from "@src/component/crud/Action.tsx";

const ColumnActions = ({namespace, routeParams}: {
    namespace?: string;
    routeParams?: { [key: string]: any },
}) => {
    const {objectActions} = UseList();
    const {data} = UseListItem();

    return data && (
        <DynamicView namespace={namespace} data={data} prefix={"list"} view={"object.actions"}>
            {objectActions.map((action, index) => (
                <Action
                    key={index}
                    action={action}
                    routeParams={routeParams}
                    className={['btn', 'btn-sm', 'mb-1', 'ms-1', (action.route?.methods ?? []).includes('DELETE') ? 'btn-outline-danger' : 'btn-outline-secondary'].join(' ')}
                />
            ))}
        </DynamicView>
    )
}

export default ColumnActions;
