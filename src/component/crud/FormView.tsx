import {FormViewType} from "@src/type/FormViewType";
import FormWidget from "@src/component/form/FormWidget";
import React, {memo} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";

export const FormView = memo(({entity, view, name}: { entity?: string, view: FormViewType, name?: string }) => {
    return (
        <DynamicView entity={entity} key={view.id} view={name || view.name} prefix={"modify/form"} data={view}>
            {
                Object.keys(view.children || []).length ?
                    Object.values(view.children || []).map((child, index) => (
                        <FormView entity={entity} key={child.id} view={child}/>
                    ))
                    :
                    <FormWidget key={view.id} view={view}/>
            }
        </DynamicView>
    );
});

export default FormView;
