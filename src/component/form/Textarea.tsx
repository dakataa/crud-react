import React from 'react';
import { useFormField } from './Form.tsx';
import { UseTranslate } from '@crud-react/component/Translation.tsx';
import type { Constraint } from './constraint/Contraint';
import type { FormViewType } from '@crud-react/type/FormViewType';
import { controlAttributes, resolveAttribute } from './formView.ts';
import { UseFormSettings } from './FormSetting.tsx';

export type FormFieldProps = {
    view: FormViewType;
    className?: string;
    constraints?: Constraint[];
    onChange?: (value: { value: string }) => void;
    ref?: React.Ref<HTMLTextAreaElement>;
};
export type InputProps = FormFieldProps;

const Textarea = ({ view, constraints, onChange, ref }: InputProps): React.JSX.Element => {
    const field = useFormField(view, constraints);
    const translate = UseTranslate();
    const settings = UseFormSettings();
    const attr = resolveAttribute(view, "attr") || {};
    const attrClassName = Object.hasOwn(attr, "className") ? attr.className : attr.class;
    const placeholder =
        'placeholder' in attr ? attr.placeholder : settings?.placeholder || view.placeholder;

    return (
        <textarea
            {...controlAttributes(attr)}
            ref={ref}
            id={view.id ?? attr.id}
            name={view.full_name}
            required={attr.required ?? view.required}
            disabled={attr.disabled ?? view.disabled}
            value={Array.isArray(field.value) ? "" : (field.value ?? "")}
            aria-invalid={!!field.errors.length}
            onChange={(event) => {
                if (attr.onChange instanceof Function) {
                    attr.onChange(event);
                }

                if (event.defaultPrevented) {
                    return;
                }

                field.change(event.target.value);
                onChange?.({ value: event.target.value });
            }}
            className={
                attrClassName ??
                settings?.className ??
                [
                    "form-control",
                    settings?.size ? "form-control-" + settings.size : null,
                    settings?.extraClassName,
                    field.errors.length ? "is-invalid" : null
                ]
                    .filter(Boolean)
                    .join(" ")
            }
            placeholder={typeof placeholder === "string" ? translate(placeholder) : placeholder}
            title={typeof attr.title === "string" ? translate(attr.title) : attr.title}
            aria-label={
                typeof attr["aria-label"] === "string"
                    ? translate(attr["aria-label"])
                    : attr["aria-label"]
            }
            aria-description={
                typeof attr["aria-description"] === "string"
                    ? translate(attr["aria-description"])
                    : attr["aria-description"]
            }
        />
    );
};

export default Textarea;
