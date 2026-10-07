import React from "react";
import {UseFormView} from "@crud-react/component/crud/form/Form.tsx";
import Translation, {UseTranslate} from "@crud-react/component/Translation.tsx";

const FormHelp = (
    {
        name
    }: {
        name?: string
    }): React.JSX.Element => {

    const {form} = UseFormView();
    const translate = UseTranslate();
    const view = name ? form.children?.[name] : form;

    if (!view) {
        throw new Error('Missing Form View for FormField' + (name ? ': ' + name : ''));
    }

    const helpAttr = (view.help_attr instanceof Function ? view.help_attr() : view.help_attr) || {};

    return (
        <>
            {view.help && (
                <div
                    className={"form-text"}
                    {...helpAttr}
                    title={typeof helpAttr.title === "string" ? translate(helpAttr.title) : helpAttr.title}
                    aria-label={typeof helpAttr["aria-label"] === "string" ? translate(helpAttr["aria-label"]) : helpAttr["aria-label"]}
                    aria-description={typeof helpAttr["aria-description"] === "string" ? translate(helpAttr["aria-description"]) : helpAttr["aria-description"]}
                >
                    <Translation>{view.help}</Translation>
                </div>
            )}
        </>
    );
}

export default FormHelp;
