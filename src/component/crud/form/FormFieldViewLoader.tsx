import {FormViewType, FormViewTypeEnum} from "@src/type/FormViewType.tsx";
import FormGroup from "@src/component/form/FormGroup.tsx";
import React, {memo} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";

const FormFieldViewLoader = memo(({view, prototype}: {
    view: FormViewType;
    prototype?: string;
}) => {

    return (
        Object.keys(view?.children || []).length && !Object.values(FormViewTypeEnum).includes(view.type as FormViewTypeEnum) ?
            Object.values(view.children || []).map((child) => {
                return (
                    <FormFieldViewLoader key={child.id} view={child} prototype={prototype}/>
                )
            })
            :
            <DynamicView
                key={view.id}
                view={view?.name || 'form'}
                prefix={"modify/form"}
                data={view}
            >
                <FormGroup key={view.id} view={view} prototype={prototype}/>
            </DynamicView>

    )
});

export default FormFieldViewLoader;
