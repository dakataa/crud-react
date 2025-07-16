import React, {ChangeEvent, KeyboardEvent, useEffect, useRef} from "react";
import {nameToId, UseForm} from "./Form";
import {Constraint} from "./constraint/Contraint";
import {FormViewType} from "@src/type/FormViewType";

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
                   className,
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
            className={[defaultFieldClassName, ...(errorMessages.length ? ['is-invalid'] : [])].join(' ')}
            defaultChecked={view?.checked}
            {...attr}
            {...(attr.inputmode === "decimal" && {step: "any"})}
        />
    </>
}

export default Input;
