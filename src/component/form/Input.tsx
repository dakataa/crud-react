import React from 'react';
import { useFormField } from './Form.tsx';
import { UseTranslate } from '@crud-react/component/Translation.tsx';
import { Constraint } from './constraint/Contraint';
import { FormViewType, FormViewTypeEnum } from '@crud-react/type/FormViewType';
import { UseFormSettings } from './FormSetting.tsx';
import { controlAttributes, inputToken, isSelection, selectedValues } from './formView.ts';

export type FormFieldProps = {
    view: FormViewType;
    className?: string;
    constraints?: Constraint[];
    onChange?: (value?: string | number | object) => void;
    ref?: React.RefObject<HTMLInputElement>;
};
export type InputProps = FormFieldProps;

const Input = ({ view, constraints, onChange, ref }: InputProps): React.JSX.Element => {
    const field = useFormField(view, constraints);
    const translate = UseTranslate();
    const settings = UseFormSettings();
    const attr = { ...((view.attr instanceof Function ? view.attr() : view.attr) || {}) };
    const selection = isSelection(view);
    const token = inputToken(view);
    const placeholder =
        'placeholder' in attr ? attr.placeholder : settings?.placeholder || view.placeholder;
    let type = attr.type ?? view.type;

    if ([FormViewTypeEnum.Date, FormViewTypeEnum.Birthday].includes(type as FormViewTypeEnum)) {
        type = 'date';
    }

    if (type === FormViewTypeEnum.Datetime) {
        type = 'datetime-local';
    }

    const className =
        attr.className ??
        settings?.className ??
        [
            selection ? 'form-check-input' : 'form-control',
            settings?.size ? 'form-control-' + settings.size : null,
            settings?.extraClassName,
            field.errors.length ? 'is-invalid' : null
        ]
            .filter(Boolean)
            .join(' ');

    return (
        <input
            {...controlAttributes(attr)}
            ref={ref}
            id={view.id ?? attr.id}
            name={view.full_name}
            type={type}
            required={attr.required ?? view.required}
            disabled={attr.disabled ?? view.disabled}
            aria-invalid={!!field.errors.length}
            className={className}
            {...(type !== 'file' && { value: selection ? token : (field.value ?? '') })}
            {...(selection && { checked: selectedValues(field.value).includes(token) })}
            onChange={(event) => {
                if (attr.onChange instanceof Function) {
                    attr.onChange(event);
                }

                if (event.defaultPrevented) {
                    return;
                }

                if (type === "file") {
                    field.changeNative(
                        event.target.multiple
                            ? Array.from(event.target.files || [])
                            : (event.target.files?.[0] ?? null)
                    );
                    onChange?.({ value: event.target.files });

                    return;
                }

                const value = field.change((current) => {
                    if (!selection) {
                        return event.target.value;
                    }

                    if (!view.multiple) {
                        return event.target.checked ? token : null;
                    }

                    const selected = selectedValues(current);

                    if (event.target.checked) {
                        return [...selected, token];
                    }

                    return selected.filter((item) => item !== token);
                });
                onChange?.({
                    value,
                    ...(selection && { targetValue: token, checked: event.target.checked })
                });
            }}
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
            {...(attr.inputmode === 'decimal' && { step: 'any' })}
        />
    );
};

export default Input;
