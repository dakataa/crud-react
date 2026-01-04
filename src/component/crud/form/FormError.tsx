import {UseFormView} from "@src/component/crud/form/Form.tsx";
import FormFieldError from "@src/component/form/FormFieldError.tsx";
import React, {useEffect} from "react";

const FormError = ({name, className}: { name?: string | (string | null)[], className?: string }) => {
    const {form, getRootViewContext} = UseFormView();

    const views = name ? (name instanceof Array ? name : [name]).map((name) => {
        const childView = name ? form.children?.[name] : form;
        if (!childView) {
            throw new Error('Missing Form View for FormError: ' + (name || ''));
        }

        return childView;
    }) : [form];


    useEffect(() => {
        views.forEach((view) => {
            if (view.full_name) {
                getRootViewContext().setRenderedError(view.full_name)
            }
        })
    }, []);

    return <FormFieldError name={views.map((view) => view.full_name || '')} className={className}/>
}


export default FormError;
