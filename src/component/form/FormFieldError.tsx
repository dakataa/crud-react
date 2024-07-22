import {FormError, useForm} from "@src/component/form/Form";
import React from "react";

export const FormFieldError = ({name, className}: { name: string, className?: string }) => {
    const [[form]] = useForm();
    const errorMessages = form?.errors[name] || [];

    if (!errorMessages.length)
        return <></>;

    console.log(errorMessages);

    return (<div className={className}>
            {errorMessages.map((error: FormError, i: number) => <span key={i}>{error.message}</span>)}
        </div>
    )
}
