import {FormViewType} from "@src/type/FormViewType";
import FormWidget from "@src/component/form/FormWidget";
import React, {memo} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";

export const FormView = memo(({view, name}: { view: FormViewType, name?: string }) => {
    return (
        <DynamicView key={view.full_name} view={name || view.name} prefix={"modify/form"} data={view}>
            {
                Object.keys(view.children || []).length ?
                    Object.values(view.children || []).map((child, index) => (
                        <FormView key={child.full_name} view={child}/>
                    ))
                    :
                    <FormWidget view={view}/>
            }
        </DynamicView>
    );
});

export default FormView;
