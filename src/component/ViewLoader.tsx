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


    useEffect(() => {

    }, []);

    const viewName = capitalize(action.name || 'Unknown');
    // const DynamicView = lazy((): any => import('./../../crud/view/' + controller + '/' + viewName+'.tsx').catch((error) => {
    //     console.log('error', error);
    //     return ({
    //         default: () => createDefaultComponent(action)
    //     })
    // }));

    return (
        <DynamicView viewName={action.name}>
            <DefaultComponent action={action}/>
        </DynamicView>
    );
}
