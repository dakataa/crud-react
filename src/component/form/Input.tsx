import React, {ChangeEvent, KeyboardEvent, useEffect, useRef} from "react";
import {nameToId, UseForm} from "./Form";
import {Constraint} from "./constraint/Contraint";
import {FormViewType} from "@src/type/FormViewType";
import {UseFormSettings} from "@src/component/form/FormSetting.tsx";

export type FormFieldProps = {
    view: FormViewType;
    className?: string;
    constraints?: Constraint[];
    onChange?: Function;
}

export type InputProps = {} & FormFieldProps;

const Input = ({
                   view,
                   constraints,
                   onChange,
               }: InputProps):
    React.JSX.Element => {

    const elementFullName = view.full_name;
    const [[formState, dispatch]] = UseForm();
    const fieldRef = useRef<HTMLInputElement | null>(null);
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

    return <>
        <input
            ref={fieldRef}
            id={view.id}
            key={key}
            name={elementFullName}
            type={view.type}
            defaultValue={view.data}
            aria-invalid={!errorMessages.length}
            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => validate({value: (e.target as HTMLInputElement).value})}
            onChange={(e: ChangeEvent<HTMLInputElement>) => validate({value: e.target.value})}
            className={settings?.className || [
                defaultFieldClassName,
                settings?.size ? 'form-control-' + settings.size : null,
                settings?.extraClassName,
                ...(errorMessages.length ? ['is-invalid'] : [])
            ].filter(v => v).join(' ')}
            defaultChecked={view?.checked}
            {...attr}
            placeholder={settings?.placeholder || view?.placeholder || undefined}
            {...(attr.inputmode === "decimal" && {step: "any"})}
        />
    </>
}

export default Input;
