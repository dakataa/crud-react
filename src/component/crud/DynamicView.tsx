import React, {memo, ReactElement, ReactNode, useEffect, useRef, useState} from "react";
import {capitalize} from "@src/helper/StingUtils.tsx";
import {UseConfig} from "@src/context/ConfigContext.tsx";
import Empty from "@src/component/Empty.tsx";
import {UseNamespace} from "@src/context/NamespaceContext.tsx";

type DynamicViewContextType = {
    parent?: ReactElement | ReactNode;
    template: string;
    data?: any;
    view?: string;
    namespace?: string;
    isImported: boolean;
}

const DynamicViewContext = React.createContext<DynamicViewContextType | undefined>(undefined);

export function UseDynamicView() {
   return React.useContext<DynamicViewContextType | undefined>(DynamicViewContext);
}

const DynamicView = memo(({view, prefix, namespace, children, props, data}: {
    view: string,
    namespace?: string,
    prefix?: string,
    children?: ReactNode,
    data?: any
    props?: any
}) => {
    view = view.split(/[._]/).map((v) => capitalize(v)).join('');
    namespace ??= UseNamespace();

    const parentDynamicView = UseDynamicView();

    const {templates: files} = UseConfig();

    const templateFilePath = ['crud', namespace, prefix, view].filter(v => v).join('/') + '.tsx';

    const [key, importMethod] = Object.entries(files ?? {}).filter(([path, importMethod]) => path.endsWith(templateFilePath)).shift() || [];
    const [update, setUpdate] = useState(1);
    const LoadedView = useRef<any>(Empty);
    const isDuplicated = parentDynamicView?.template === templateFilePath && parentDynamicView?.isImported;

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
        return;
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
