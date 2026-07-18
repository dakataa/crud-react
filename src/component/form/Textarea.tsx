import React, {ChangeEvent, useEffect} from "react";
import {UseForm} from "./Form";
import {Constraint} from "./constraint/Contraint";
import {FormViewType} from "@crud-react/type/FormViewType";
import {UseFormSettings} from "@crud-react/component/form/FormSetting.tsx";

export type FormFieldProps = {
    view: FormViewType;
    className?: string;
    constraints?: Constraint[];
    onChange?: Function;
    ref?: React.RefObject<HTMLInputElement>;
}

export type InputProps = {} & FormFieldProps;

const Textarea = ({
                   view,
                   constraints,
                   onChange,
                   ref
               }: InputProps):
    React.JSX.Element => {

    const [[formState, dispatch]] = UseForm();
    const elementFullName = view.full_name;
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

    const defaultFieldClassName = 'form-control';
    const key = btoa(encodeURIComponent(elementFullName + JSON.stringify(view.data)));
    const attr = (view.attr instanceof Function ? view.attr() : view.attr) || {};
    const settings = UseFormSettings();

    const defaultValue = view.data;

    if(view.required) {
        attr.required = 'required';
    }

    return <>
        <textarea
            ref={ref}
            id={view.id}
            key={key}
            name={elementFullName}
            defaultValue={defaultValue}
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
            placeholder={settings?.placeholder || view?.placeholder ||  undefined}
            {...attr}
        />
    </>
}

export default Textarea;
