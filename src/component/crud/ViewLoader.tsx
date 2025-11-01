import Modify from "@src/component/crud/Modify.tsx";
import EmptyView from "@src/component/Empty.tsx";
import List from "@src/component/crud/List.tsx";
import React from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {UseNamespace} from "@src/context/NamespaceContext.tsx";

const ViewNotFound = ({view}: { view: string }) => {
    return (
        <>View "{view}" Not found.</>
    )
}

const DefaultViewComponent = ({view, props}: {
    view: string,
    props?: { [key: string]: any }
}) => {
    const defaultComponents: { [key: string]: any } = {
        add: Modify,
        edit: Modify,
        list: List
    }

    const namespace = UseNamespace();

    return (
        <DynamicView key={namespace + view} view={view} props={props}>
            {defaultComponents[view] !== undefined ? React.createElement(defaultComponents[view], props) :
                <ViewNotFound view={view}/>}
        </DynamicView>
    );
}

const ViewLoader = ({view, namespace, props}: {
    view: string;
    namespace?: string;
    props?: { [key: string]: any }
}): any => {
    return (
        <>
            <DefaultViewComponent view={view} props={props}/>
        </>
    );
}

export {ViewLoader, DefaultViewComponent};
