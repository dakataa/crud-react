import React from "react";
import {UseForm} from "@src/component/form/Form";
import {FormViewErrorType} from "@src/type/FormViewType.tsx";

export const FormAlert = ({name = 'global'}: { name: string; }) => {
    const [[form]] = UseForm();
    const errorMessages = form?.errors[name] || [];

    return (
        <>
            {
                errorMessages.length > 0 && (
                    <div className={"alert alert-danger"}>
                        {errorMessages.map((m: FormViewErrorType) => m.message).join(' ')}
                    </div>
                )
            }
        </>
    )
}
