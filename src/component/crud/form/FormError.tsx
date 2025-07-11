import {UseFormView} from "@src/component/crud/form/Form.tsx";
import {FormFieldError} from "@src/component/form/FormFieldError.tsx";
import React, {useEffect, useId} from "react";

const FormError = ({name, className}: { name?: string, className?: string }) => {
    const {form} = UseFormView();
    const {setRendered, unsetRendered, canRender} = UseFormView();
    const view = name ? form.children?.[name] : form;

    if (!view) {
        throw new Error('Missing Form View' + (name ? ': ' + name : ''));
    }

    return <FormFieldError name={view.full_name} className={className}/>
}


export default FormError;
