import {ActionType} from "@src/type/ActionType";
import Modify from "@src/page/Modify";
import EmptyView from "@src/component/EmptyView";
import List from "@src/page/List";
import React, {ComponentType, lazy, ReactElement, Suspense, useEffect} from "react";

import {capitalize} from "@src/helper/StingUtils.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";

const DefaultComponent = ({action}: { action: ActionType }) => {
    const defaultComponents: { [key: string]: any } = {
        add: Modify,
        edit: Modify,
        list: List
    }

    return React.createElement(defaultComponents[(action.name || '')] || EmptyView);
}

export default ({controller, action}: { controller: string, action: ActionType }): any => {
    return (
        <DynamicView view={action.name || 'list'}>
            <DefaultComponent action={action}/>
        </DynamicView>
    );
}
