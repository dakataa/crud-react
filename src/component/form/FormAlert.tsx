import React from "react";
import {UseForm} from "@crud-react/component/form/Form";
import {FormViewErrorType} from "@crud-react/type/FormViewType.tsx";
import Translation from "@crud-react/component/Translation.tsx";

export const FormAlert = ({name = 'global'}: { name: string; }) => {
    const [[form]] = UseForm();
    const errorMessages = form?.errors[name] || [];

    return (
        <>
            {
                errorMessages.length > 0 && (
                    <div className={"alert alert-danger"}>
                        {errorMessages.map((m: FormViewErrorType) => <Translation>{m.message}</Translation>).join(' ')}
                    </div>
                )
            }
        </>
    )
}
