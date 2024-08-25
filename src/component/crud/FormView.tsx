import {FormViewType} from "@src/type/FormViewType";
import FormWidget from "@src/component/form/FormWidget";
import React, {memo} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";

export const FormView = memo(({view, namespace, name}: { view: FormViewType, namespace?: string, name?: string }) => {
    return (
        <DynamicView
            namespace={namespace}
            key={view.id}
            view={name || view.name || 'form'}
            prefix={"modify/form"}
            data={view}
        >
            {
                Object.keys(view.children || []).length ?
                    Object.values(view.children || []).map((child) => {
                        return (
                            <FormView namespace={namespace} key={child.id} view={child}/>
                        )
                    })
                    :
                    <FormWidget key={view.id} view={view}/>
            }
        </DynamicView>
    );
});

export default FormView;
