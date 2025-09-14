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

    if(!(view instanceof Array)) {
        view = [view];
    }

    const [templateFilePath, isDuplicated, importMethod] = view.reduce<any>((result, item) => {
        if(result) {
            return result;
        }

        item = item.split(/[._]/).filter(v => v).map((v) => capitalize(v)).join('');
        const templateFilePaths = [
            ['crud', namespace, prefix, item].filter(v => v).join('/') + '.tsx',
            ['crud', 'general', prefix, item].filter(v => v).join('/') + '.tsx'
        ];

        const results = templateFilePaths.map((templateFilePath) => {
            const [, importMethod] = Object.entries(files ?? {}).filter(([path,]) => path.endsWith(templateFilePath)).shift() || [];
            const isDuplicated = parentDynamicView?.template === templateFilePath && parentDynamicView?.isImported;

            return importMethod !== undefined ? [templateFilePath, isDuplicated, importMethod] : null;
        }).filter(v => v);

        return results.shift() || null;

    }, null) || [false, undefined];


    useEffect(() => {
        if(isDuplicated) {
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
    if(isDuplicated) {
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
            <LoadedView.current
                {...props}
                view={view}
                controller={namespace}
                viewName={view}
                data={data}
                parent={children}
            >
                {(!importMethod || LoadedView.current !== Empty) && children}
            </LoadedView.current>
        </DynamicViewContext.Provider>
    );
});

export default DynamicView;
