import {FormFieldError} from "@src/component/form/FormFieldError";
import {FormViewType} from "@src/type/FormViewType";
import {titlize} from "@src/helper/StingUtils";
import React from "react";

export type FormGroupProps = {
    view: FormViewType
};
export const FormGroup = ({
                              view,
                              children,
                              className
                          }: FormGroupProps & {
    className: string,
    children: React.JSX.Element
}): React.JSX.Element => {
    const nameToId = (name: string, index: number | null = null) => (name.replace(/[\[\]]/gi, '_').replace(/_+/gi, '_') + (index && index));
    const label = view.label || titlize(view.name);
    const isCheckbox = ['checkbox', 'radio'].includes(view.type || 'input');

    return (
        <div
            className={[...(className?.split(' ') || []), 'mb-3', (isCheckbox && 'form-check')].filter(v => v).join(' ')}
            {...(view.attr && (view.attr instanceof Function ? view.attr() : view.attr))}
        >
            {!isCheckbox && (
                <label
                    className={"form-label"}
                    {...(view.label_attr && (view.label_attr instanceof Function ? view.label_attr() : view.label_attr))}>
                    {label}
                </label>
            )}
            {children}
            {isCheckbox && (
                <label
                    className={"form-check-label"}
                    htmlFor={view.id || nameToId(view.full_name)}
                    {...(view.label_attr && (view.label_attr instanceof Function ? view.label_attr() : view.label_attr))}>
                    {label}
                </label>
            )}
            <FormFieldError name={view.full_name} className={"invalid-feedback"}/>
            {view.help && (
                <div
                    className={'form-help'}
                    {...(view.help_attr && (view.help_attr instanceof Function ? view.help_attr() : view.help_attr))}
                >
                    {view.help}
                </div>
            )}
        </div>
    );
}
