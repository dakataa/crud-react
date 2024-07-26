import {lazy, Suspense, useEffect, useState} from "react";
import {useActions} from "@src/context/ActionContext.tsx";


const DynamicView = ({viewName, children}: { viewName: string }) => {
    const [, controller] = useActions();

    const LoadedView = lazy((): any => import('./../../../crud/view/' + controller + '/' + viewName + '.tsx')
        .catch(error => {
            console.log(error);
            return {
                default: () => children
            };
        }));

    return (
        <Suspense>
            <LoadedView controller={controller} viewName={viewName}>{children}</LoadedView>
        </Suspense>
    );
};

export default DynamicView;
