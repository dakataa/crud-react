import {UseForm} from "@src/component/form/Form";
import React from "react";
import {FormViewErrorType} from "@src/type/FormViewType.tsx";

export const FormFieldError = ({name, className}: { name: string, className?: string }) => {
    const [[form]] = UseForm() || {};

    const errorMessages = form?.errors[name] || [];
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
