import {UseFormView} from "@src/component/crud/form/Form.tsx";
import FormFieldError from "@src/component/form/FormFieldError.tsx";
import React from "react";
import {UseForm} from "@src/component/form/Form.tsx";

const FormRestError = ({className}: { className?: string }) => {
    const [[form]] = UseForm() || {};
    const {getRootViewContext, getParentViewContext, getElements} = UseFormView();

    const getRenderedElements = () => {
        let elements = Object.keys(getElements?.() || []);
        let parent = getParentViewContext?.() || null;
        while (parent !== null) {
            elements = [
                ...elements,
                ...Object.keys(parent.getElements?.() || [])
            ];

            parent = parent.getParentViewContext();
        }

        return elements;
    };

    const renderedElements = getRenderedElements();
    const errorFields = Object.keys(form?.errors || [])
        .filter(v => renderedElements.includes(v))
        .filter(error => !getRootViewContext().getRenderedErrors().includes(error));

    return <FormFieldError name={errorFields} className={className}/>
}


export default FormRestError;
