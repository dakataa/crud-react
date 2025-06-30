import {UseCrudForm} from "@src/component/crud/form/Form.tsx";
import {FormFieldError} from "@src/component/form/FormFieldError.tsx";
import React from "react";

const FormError = ({name}: { name: string }) => {
    const {form} = UseCrudForm() || {};
    const formView = form?.children?.[name] ?? null;

    if(!formView) {
        return null;
    }

    return <FormFieldError name={formView.full_name}/>
}


export default FormError;
