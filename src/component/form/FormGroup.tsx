import {FormFieldError} from "@src/component/form/FormFieldError";
import React from "react";
import FormLabel from "@src/component/form/FormLabel.tsx";
import FormHelp from "@src/component/form/FormHelp.tsx";
import FormWidget from "@src/component/form/FormWidget.tsx";
import {FormViewType} from "@src/type/FormViewType.tsx";

export const FormGroup = ({
                              view,
                              prototype,
                              className,
                          }: {
    view: FormViewType
    className: string;
    prototype?: string;
}): React.JSX.Element => {
    const isCheckbox = ['checkbox', 'radio'].includes(view.type || 'input');

    return (
        <div
            className={[...(className?.split(' ') || []), 'mb-3', (isCheckbox && 'form-check')].filter(v => v).join(' ')}
            {...(view.attr && (view.attr instanceof Function ? view.attr() : view.attr))}
        >
            {!isCheckbox && (<FormLabel view={view}/>)}
            <FormWidget view={view} prototype={prototype}/>
            {isCheckbox && (<FormLabel view={view}/>)}
            <FormFieldError name={view.full_name} className={"invalid-feedback"}/>
            <FormHelp view={view}/>
        </div>
    );
}

export default FormGroup;
