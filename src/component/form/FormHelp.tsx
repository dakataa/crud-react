import React from "react";
import {UseFormView} from "@crud-react/component/crud/form/Form.tsx";
import Translation from "@crud-react/component/Translation.tsx";

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
                    <Translation>{view.help}</Translation>
                </div>
            )}
        </>
    );
}

export default FormHelp;
