import React, {ChangeEvent, KeyboardEvent, useEffect, useRef} from "react";
import {UseForm} from "./Form";
import {Constraint} from "./constraint/Contraint";
import {FormViewType, FormViewTypeEnum} from "@src/type/FormViewType";
import {UseFormSettings} from "@src/component/form/FormSetting.tsx";

export type FormFieldProps = {
    view: FormViewType;
    className?: string;
    constraints?: Constraint[];
    onChange?: Function;
    ref?: React.RefObject<HTMLInputElement>;
}

export type InputProps = {} & FormFieldProps;

const Input = ({
                   view,
                   constraints,
                   onChange,
                   ref
               }: InputProps):
    React.JSX.Element => {

    const elementFullName = view.full_name;
    const [[formState, dispatch]] = UseForm();
    const errorMessages = formState?.errors[elementFullName || ''] || [];

    useEffect(() => {
        dispatch({
            action: 'constraints',
            payload: {
                name: elementFullName,
                constraints: constraints || []
            }
        });
    }, [])

    const validate = (value: any) => {
        dispatch({action: 'validate', payload: elementFullName});
        onChange && onChange(value);
    }

    const isCheckbox = ['checkbox', 'radio'].includes(view.type);
    const defaultFieldClassName = isCheckbox ? 'form-check-input' : 'form-control';
    const key = btoa(encodeURIComponent(elementFullName + JSON.stringify(view.data)));
    const attr = (view.attr instanceof Function ? view.attr() : view.attr) || {};
    const settings = UseFormSettings();

    let type = view.type;
    let value = view.data;

    if ([FormViewTypeEnum.Date, FormViewTypeEnum.Birthday, FormViewTypeEnum.Datetime].includes(type as FormViewTypeEnum)) {
        const localDate = value?.date ? new Date(value.date) : null;
        if (localDate) {
            const dateZoneOffset = localDate.getTimezoneOffset() * 60000
            const utcDate = new Date(localDate.getTime() - dateZoneOffset);
            value = utcDate.toISOString().split('T').shift();
        }

        type = type === FormViewTypeEnum.Datetime ? 'datetime-local' : 'date';
    }

    if(view.required) {
        attr.required = 'required';
    }

    return <>
        <input
            ref={ref}
            id={view.id}
            key={key}
            name={elementFullName}
            type={type}
            defaultValue={value}
            aria-invalid={!errorMessages.length}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                if(attr.onChange instanceof Function) {
                    attr.onChange(e);
                }

                if(e.defaultPrevented){
                    return;
                }

                validate({value: e.target.value});
            }}
            className={settings?.className || [
                defaultFieldClassName,
                settings?.size ? 'form-control-' + settings.size : null,
                settings?.extraClassName,
                ...(errorMessages.length ? ['is-invalid'] : [])
            ].filter(v => v).join(' ')}
            defaultChecked={view?.checked}
            placeholder={settings?.placeholder || view?.placeholder ||  undefined}
            {...attr}
            {...(attr.inputmode === "decimal" && {step: "any"})}
        />
    </>
}

export default Input;
