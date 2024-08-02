import React, {ChangeEvent, KeyboardEvent, useEffect, useRef} from "react";
import {nameToId, useForm} from "./Form";
import {Constraint} from "./constraint/Contraint";
import {FormViewType} from "@src/type/FormViewType";

export type FormFieldProps = {
    view: FormViewType;
    className?: string;
    constraints?: Constraint[],
    onChange?: Function
}

export type InputProps = {
} & FormFieldProps;

const Input = ({
                         view,
                          constraints,
                          className,
                          onChange,
                      }: InputProps):
    React.JSX.Element => {

    const [[formState, dispatch]] = useForm();
    const fieldRef = useRef<HTMLInputElement | null>(null);
    const errorMessages = formState?.errors[view.full_name] || [];

    useEffect(() => {
        dispatch({
            action: 'constraints',
            payload: {
                name: view.full_name,
                constraints: constraints || []
            }
        });
    }, [])

    const validate = (value: any) => {
        dispatch({action: 'validate', payload: view.full_name});
        onChange && onChange(value);
    }

    const isCheckbox = ['checkbox', 'radio'].includes(view.type);
    const defaultFieldClassName = isCheckbox ? 'form-check-input' : 'form-control';

    return <input
        ref={fieldRef}
        id={view.id || nameToId(view.full_name)}
        key={view.full_name}
        name={view.full_name}
        type={view.type}
        defaultValue={view.data}
        aria-invalid={!errorMessages.length}
        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => validate({value: (e.target as HTMLInputElement).value})}
        onChange={(e: ChangeEvent<HTMLInputElement>) => validate({value: e.target.value})}
        className={[defaultFieldClassName, ...(errorMessages.length ? ['is-invalid'] : [])].join(' ')}
        defaultChecked={view?.checked}
        {...(view.attr && (view.attr instanceof Function ? view.attr() : view.attr))}
    />
}

export default Input;
