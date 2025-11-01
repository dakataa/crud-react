import Modify from "@src/component/crud/Modify.tsx";
import EmptyView from "@src/component/Empty.tsx";
import List from "@src/component/crud/List.tsx";
import React from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";

const DefaultViewComponent = ({view, props}: {
    view: string,
    props?: { [key: string]: any }
}) => {
    const defaultComponents: { [key: string]: any } = {
        add: Modify,
        edit: Modify,
        list: List
    }

    if (defaultComponents[view] === undefined) {
        return (
            <DynamicView view={view} props={props}>
                View "{view}" Not found.
            </DynamicView>
        );
    }

    return React.createElement(defaultComponents[view] || EmptyView, props);
}

const ViewLoader = ({view, namespace, props}: {
    view: string;
    namespace?: string;
    props?: { [key: string]: any }
}): any => {
    return (
        <DefaultViewComponent view={view} props={props}/>
    );
}

export {ViewLoader, DefaultViewComponent};
