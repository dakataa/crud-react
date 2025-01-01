import Modify from "@src/page/Modify";
import EmptyView from "@src/component/EmptyView";
import List from "@src/page/List";
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

    return React.createElement(defaultComponents[view] || EmptyView, props);
}

const ViewLoader = ({view, namespace, props}: { view: string; namespace: string; props?: { [key: string]: any } }): any => {

    return (
        <DynamicView namespace={namespace} view={view} key={namespace + view} props={props}>
            <DefaultViewComponent view={view} props={props}/>
        </DynamicView>
    );
}

export {ViewLoader as default, DefaultViewComponent};
