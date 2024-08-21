import {ActionType} from "@src/type/ActionType";
import Modify from "@src/page/Modify";
import EmptyView from "@src/component/EmptyView";
import List from "@src/page/List";
import React from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";

const DefaultViewComponent = ({action}: { action: ActionType }) => {
    const defaultComponents: { [key: string]: any } = {
        add: Modify,
        edit: Modify,
        list: List
    }

    return React.createElement(defaultComponents[(action.name || '')] || EmptyView);
}

const ViewLoader = ({entity, action}: { entity: string, action: ActionType }): any => {
    return (
        <DynamicView entity={entity} key={entity + action.name} view={action.name || "list"}>
           <DefaultViewComponent action={action}/>
        </DynamicView>
    );
}

export {ViewLoader as default, DefaultViewComponent};
