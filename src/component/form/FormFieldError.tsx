import {UseForm} from "@src/component/form/Form";
import React from "react";
import {FormViewErrorType} from "@src/type/FormViewType.tsx";

const FormFieldError = ({name, className}: { name: string | string[], className?: string }) => {
    const [[form]] = UseForm() || {};

    name = name instanceof Array ? name : [name];

    const errorMessages = [].concat(...name.map((name) => form?.errors[name] || []));
    if (!errorMessages.length) {
        return null;
    }

    return (
        <div className={className}>
            <ul className={"mb-0"}>
                {errorMessages.map((error: FormViewErrorType, i: number) => <li key={i}>{error.message}</li>)}
            </ul>
        </div>
    )
}

export default FormFieldError
