import React from "react";

const Translation = ({children, domain, properties}: {
    children?: string;
    domain?: string;
    properties?: { [key: string]: string | number | null }
}) => {

    properties ??= {};
    Object.keys(properties).forEach((k) => {
        children = children?.replaceAll(new RegExp(':' + k, 'g'), properties[k]?.toString() || '');
    });

    children = children?.replaceAll(new RegExp(':\w+', 'g'), '');

    return <>{children}</>
}

export default Translation;
