import React from "react";
import {UseFormView} from "@src/component/crud/form/Form.tsx";

const FormHelp = (
    {
        name
    }: {
        name?: string
    }): React.JSX.Element => {

    const {form} = UseFormView();
    const view = name ? form.children?.[name] : form;

    if (!view) {
        throw new Error('Missing Form View for FormField' + (name ? ': ' + name : ''));
    }

    return (
        <>
            {view.help && (
                <div
                    className={"form-text"}
                    {...(view.help_attr && (view.help_attr instanceof Function ? view.help_attr() : view.help_attr))}
                >
                    {view.help}
                </div>
            )}
        </>
    );
}

export default FormHelp;
