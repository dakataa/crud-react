import React, {memo, ReactElement, ReactNode, useEffect, useRef, useState} from "react";
import {capitalize} from "@src/helper/StingUtils.tsx";
import {UseConfig} from "@src/context/ConfigContext.tsx";
import Empty from "@src/component/Empty.tsx";
import {UseNamespace} from "@src/context/NamespaceContext.tsx";

type DynamicViewContextType = {
    parent?: ReactElement | ReactNode;
    template: string | string[];
    data?: any;
    view?: string | string[];
    namespace?: string;
    isImported: boolean;
}

const DynamicViewContext = React.createContext<DynamicViewContextType | undefined>(undefined);

export function UseDynamicView() {
    return React.useContext<DynamicViewContextType | undefined>(DynamicViewContext);
}

const DynamicView = memo(({view, prefix, namespace, children, props, data}: {
    view: string | string[],
    namespace?: string,
    prefix?: string,
    children?: ReactNode,
    data?: any
    props?: any
}) => {
    const {templates: files} = UseConfig();
    const parentDynamicView = UseDynamicView();
    const [update, setUpdate] = useState(1);
    const LoadedView = useRef<any>(Empty);

    namespace ??= UseNamespace();

    if (!(view instanceof Array)) {
        view = [view];
    }

    view = view.map(v => v.split(/[._]/).filter(v => v).map((v) => capitalize(v)).join(''));

    const possibleTemplateFilePath = [
        ...view.map(v => ['crud', namespace, prefix, v].filter(v => v).join('/') + '.tsx'),
        ...view.map(v => ['crud', 'general', prefix, v].filter(v => v).join('/') + '.tsx'),
    ];

    const [templateFilePath, isDuplicated, importMethod] = possibleTemplateFilePath.reduce<any>((result, templateFilePath) => {
        if (result) {
            return result;
        }

        const [, importMethod] = Object.entries(files ?? {}).filter(([path,]) => path.endsWith(templateFilePath)).shift() || [];
        const isDuplicated = parentDynamicView?.template === templateFilePath && parentDynamicView?.isImported;

        return importMethod !== undefined ? [templateFilePath, isDuplicated, importMethod] : null;
    }, null) || [false, undefined];

    useEffect(() => {
        if (isDuplicated) {
            return;
        }

        if (importMethod === undefined) {
            return () => {
            };
        }

        importMethod().then((module: any) => {
            LoadedView.current = module.default;
            setUpdate(update + 1);
        });
    }, []);

    // Prevent recursion
    if (isDuplicated || !templateFilePath) {
        return children;
    }

    return (
        <DynamicViewContext.Provider value={{
            template: templateFilePath,
            parent: children,
            data,
            view,
            namespace,
            isImported: !!importMethod
        }}>
            <LoadedView.current {...props}/>
        </DynamicViewContext.Provider>
    );
});

export default DynamicView;
