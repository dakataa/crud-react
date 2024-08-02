import {lazy, memo, ReactElement, Suspense, useEffect, useRef, useState} from "react";
import {useActions} from "@src/context/ActionContext.tsx";
import {capitalize} from "@src/helper/StingUtils.tsx";

const EmptyView = ({children}) => {
    return <>{children}</>
}

const DynamicView = memo(({view, prefix, children, data}: {
    id?: string,
    view: string,
    prefix?: string,
    children?: any,
    data?: any
}) => {
    view = view.split(/[._]/).map((v) => capitalize(v)).join('');
    const [, controller] = useActions();
    const files = import.meta.glob('@crud/view/**');
    const [key, importMethod] = Object.entries(files).filter(([path, importMethod]) => path.endsWith([controller, prefix, view].filter(v => v).join('/') + '.tsx'
    )).shift() || [];
    const [update, setUpdate] = useState(1);
    const LoadedView = useRef<any>(EmptyView);

    useEffect(() => {
        if (importMethod === undefined) {
            return () => {};
        }

        importMethod().then((module) => {
            LoadedView.current = module.default;
            setUpdate(update + 1);
        });
    }, []);

    return (
        <LoadedView.current controller={controller} viewName={view} data={data}>{children}</LoadedView.current>
    );
});

export default DynamicView;
