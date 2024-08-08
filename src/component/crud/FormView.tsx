import {FormViewType} from "@src/type/FormViewType";
import FormWidget from "@src/component/form/FormWidget";
import React, {memo} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";

export const FormView = memo(({view, name}: { view: FormViewType, name?: string }) => {
    return (
        <DynamicView key={view.id} view={name || view.name} prefix={"modify/form"} data={view}>
            {
                Object.keys(view.children || []).length ?
                    Object.values(view.children || []).map((child, index) => (
                        <FormView key={child.id} view={child}/>
                    ))
                    :
                    <FormWidget key={view.id} view={view}/>
            }
        </DynamicView>
    );
});

export default FormView;
