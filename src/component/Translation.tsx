import React from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";

const Translation = ({children, domain, properties, ...props}: {
    children?: string;
    domain?: string;
    properties?: { [key: string]: string | number | null }
}) => {

    properties ??= {};
    Object.keys(properties).forEach((k) => {
        children = children?.replaceAll(new RegExp(':' + k, 'g'), properties[k]?.toString() || '');
    });

    children = children?.replaceAll(new RegExp(':\w+', 'g'), '');

    return (
        <DynamicView
            view={"Translation"}
            props={{...props, domain, properties}}
        >
            {children}
        </DynamicView>
    )
}

export default Translation;
