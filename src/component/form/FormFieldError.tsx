import {FormError, UseForm} from "@src/component/form/Form";
import React from "react";

export const FormFieldError = ({name, className}: { name: string, className?: string }) => {
    const [[form]] = UseForm() || {};
    const errorMessages = form?.errors[name] || [];

    if (!errorMessages.length) {
        return null;
    }

    return (
        <div className={className}>
            {errorMessages.map((error: FormError, i: number) => <span key={i}>{error.message}</span>)}
        </div>
    )
}
