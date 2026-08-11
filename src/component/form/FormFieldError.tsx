import {UseForm} from "@crud-react/component/form/Form";
import React from "react";
import {FormViewErrorType} from "@crud-react/type/FormViewType.tsx";
import Translation from "@crud-react/component/Translation.tsx";

const FormFieldError = ({name, className}: { name: string | string[], className?: string }) => {
    const [[form]] = UseForm() || {};

    name = name instanceof Array ? name : [name];

    const errorMessages: FormViewErrorType[] = name.flatMap(name => form.errors[name] || []);
    if (!errorMessages.length) {
        return null;
    }

    return (
        <div className={className}>
            <ul className={"mb-0"}>
                {errorMessages.map((error: FormViewErrorType, i: number) => <li key={i}><Translation>{error.message}</Translation></li>)}
            </ul>
        </div>
    )
}

export default FormFieldError
