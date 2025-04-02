import React, {memo, ReactNode, useEffect, useRef, useState} from "react";
import {capitalize} from "@src/helper/StingUtils.tsx";
import {UseConfig} from "@src/context/ConfigContext.tsx";
import Empty from "@src/component/Empty.tsx";


const DynamicView = memo(({namespace, view, prefix, children, props, data}: {
    namespace?: string,
    view: string,
    prefix?: string,
    children?: ReactNode,
    data?: any
    props?: any
}) => {
    view = view.split(/[._]/).map((v) => capitalize(v)).join('');
    const {templates: files} = UseConfig();

    const templateFilePath = ['crud', namespace, prefix, view].filter(v => v).join('/') + '.tsx';

    const [key, importMethod] = Object.entries(files ?? {}).filter(([path, importMethod]) => path.endsWith(templateFilePath)).shift() || [];
    const [update, setUpdate] = useState(1);
    const LoadedView = useRef<any>(Empty);

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
            {(!importMethod || LoadedView.current !== Empty) && children}
        </LoadedView.current>
    );
});

export default DynamicView;
