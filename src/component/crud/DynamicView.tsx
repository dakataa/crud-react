import {lazy, memo, Suspense, useEffect, useState} from "react";
import {useActions} from "@src/context/ActionContext.tsx";
import {capitalize} from "@src/helper/StingUtils.tsx";

const DynamicView = memo(({view, prefix, children, data, ...props}: {
    view: string,
    prefix?: string,
    children: any,
    data?: any
}) => {
    view = view.split(/[._]/).map((v) => capitalize(v)).join('');
    const [, controller] = useActions();
    const files = import.meta.glob('@crud/view/**');
    const [, importMethod] = Object.entries(files).filter(([path, importMethod]) => path.endsWith([controller, prefix, view].filter(v => v).join('/') + '.tsx'
    )).shift() || [];

    if (importMethod == undefined) {
        return children;
    }

    const LoadedView = lazy((): any => importMethod().catch(error => {
            return {
                default: () => children
            };
        })
    );

    return (
        <Suspense>
            <LoadedView controller={controller} viewName={view} data={data} {...props}>
                {children}
            </LoadedView>
        </Suspense>
    );
});

export default DynamicView;
