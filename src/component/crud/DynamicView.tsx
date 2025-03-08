import React, {memo, ReactNode, useEffect, useRef, useState} from "react";
import {capitalize} from "@src/helper/StingUtils.tsx";

const EmptyView = ({children}: { children?: ReactNode }) => {
    return <>{children}</>
}

const DynamicView = memo(({namespace, view, prefix, children, props, data}: {
    namespace?: string,
    view: string,
    prefix?: string,
    children?: ReactNode,
    data?: any
    props?: any
}) => {

    view = view.split(/[._]/).map((v) => capitalize(v)).join('');
    const files = import.meta.glob('@crud/**');
    const templateFilePath = ['crud', namespace, prefix, view].filter(v => v).join('/') + '.tsx';
    const [key, importMethod] = Object.entries(files).filter(([path, importMethod]) => path.endsWith(templateFilePath)).shift() || [];
    const [update, setUpdate] = useState(1);
    const LoadedView = useRef<any>(EmptyView);

    useEffect(() => {
        if (importMethod === undefined) {
            return () => {};
        }

        importMethod().then((module: any) => {
            LoadedView.current = module.default;
            setUpdate(update + 1);
        });
    }, []);

    return (
        <LoadedView.current {...props} view={view} controller={namespace} viewName={view} data={data} parent={children}>
            {(!importMethod || LoadedView.current !== EmptyView) && children}
        </LoadedView.current>
    );
});

export default DynamicView;
