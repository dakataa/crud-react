import Modify from "@src/component/crud/Modify.tsx";
import EmptyView from "@src/component/Empty.tsx";
import List from "@src/component/crud/List.tsx";
import React from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import HttpException from "@src/component/error/HttpException.tsx";
import {NamespaceProvider, UseNamespace} from "@src/context/NamespaceContext.tsx";

const DefaultViewComponent = ({view, props}: {
    view: string,
    props?: { [key: string]: any }
}) => {
    const defaultComponents: { [key: string]: any } = {
        add: Modify,
        edit: Modify,
        list: List
    }

    if (defaultComponents[view] === undefined)
        return (
            <DynamicView view={view}>
                View Not found.
            </DynamicView>
        );

    return React.createElement(defaultComponents[view] || EmptyView, props);
}

const ViewLoader = ({view, namespace, props}: {
    view: string;
    namespace?: string;
    props?: { [key: string]: any }
}): any => {
    namespace ??= UseNamespace();

    return (
        <DynamicView view={view} key={namespace + view} props={props}>
            <DefaultViewComponent view={view} props={props}/>
        </DynamicView>
    );
}

export {ViewLoader, DefaultViewComponent};
