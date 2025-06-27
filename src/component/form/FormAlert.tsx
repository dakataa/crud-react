import React from "react";
import {FormError, UseForm} from "@src/component/form/Form";

export const FormAlert = ({name = 'global'}: { name: string; }) => {
    const [[form]] = UseForm();
    const errorMessages = form?.errors[name] || [];

    return (
        <>
            {
                errorMessages.length > 0 && (
                    <div className={"alert alert-danger"}>
                        {errorMessages.map((m: FormError) => m.message).join(' ')}
                    </div>
                )
            }
        </>
    )
}
