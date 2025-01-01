import React, {createRef, useEffect, useRef} from "react";
import {nameToId, useForm} from "./Form";
import {FormFieldProps} from "@src/component/form/Input";
import {ChoiceType, FormViewType} from "@src/type/FormViewType";

export type ChoiceProps = {
    view: FormViewType,
    choiceValueTransform?: Function,
    choiceLabelTransform?: Function
} & FormFieldProps;

const Choice = ({
                    view,
                    constraints,
                    className,
                    onChange,
                    choiceValueTransform,
                    choiceLabelTransform,
                    ...props
                }: ChoiceProps):
    React.JSX.Element => {
    constraints = constraints || [];

    const [[formState, dispatch], formRef] = useForm();
    const fieldRef = useRef<HTMLSelectElement | HTMLInputElement | null>(null);
    const errorMessages = formState?.errors[view.full_name] || [];
    const isInvalid = !!errorMessages.length;
    const key = btoa(view.full_name + JSON.stringify(view.data));

    useEffect(() => {
        dispatch({
            action: 'constraints',
            payload: {
                name: view.full_name,
                constraints: constraints
            }
        });
    }, [])

    const validate = (value: any) => {
        dispatch({action: 'validate', payload: view.full_name});
        onChange && onChange(value);
    }

    if (view?.expanded) {
        return <>
            {Object.values(view.choices || []).map((choice: ChoiceType, choiceIndex: number) => {
                    const elementId = nameToId(view.full_name, choiceIndex);
                    const choiceValue = choiceValueTransform ? choiceValueTransform(choice) : choice.value;
                    const choiceLabel = choiceLabelTransform ? choiceLabelTransform(choice) : choice.label || choiceValue;
                    const attributes = {
                        id: elementId,
                        ...(view?.choice_attr && (view?.choice_attr instanceof Function ? view?.choice_attr(choice) : view?.choice_attr))
                    }
                    return <div
                        key={choiceIndex}
                        className={"form-check"}
                    >
                        <input
                            key={key}
                            ref={fieldRef}
                            defaultValue={choiceValue}
                            type={view?.multiple ? 'checkbox' : 'radio'}
                            defaultChecked={view?.data?.includes(choiceValue)}
                            name={view?.full_name + '[]'}
                            id={elementId}
                            className={"form-check-input"}
                            {...attributes}
                            onChange={(e) => {
                                return validate({
                                    value: (view?.multiple ? formRef?.current?.getFormData().getAll(view?.full_name) : formRef?.current?.getFormData().get(view?.full_name)) || e.target.value,
                                    targetValue: e.target.value,
                                    checked: e.target.checked
                                })
                            }}
                        />
                        <label
                            htmlFor={attributes.id}
                            className={"form-check-label"}
                        >
                            {choiceLabel}
                        </label>
                    </div>
                }
            )}
        </>
    } else {
        return (
            <>
                <select
                    ref={fieldRef}
                    key={key}
                    name={view.full_name}
                    multiple={view.multiple}
                    aria-invalid={isInvalid}
                    onChange={(e) => validate({
                        value: (view.multiple ? formRef?.current?.getFormData().getAll(view.full_name) : formRef?.current?.getFormData().get(view.full_name)) || e.target.value
                    })}
                    className={[...((className || '').split(' ') || []), 'form-control', ...(isInvalid ? ['is-invalid'] : [])].join(' ')}
                    {...(view.attr && (view.attr instanceof Function ? view.attr() : view.attr))}
                    defaultValue={view.data}
                >
                    {view.placeholder && <option value={''}>{view.placeholder}</option>}
                    {Object.values(view.choices || []).map((choice: any, index: number) =>
                        <option
                            key={index}
                            value={choice.value || choice.label}
                            {...(view.choice_attr && (view.choice_attr instanceof Function ? view.choice_attr(choice) : view.choice_attr))}
                        >
                            {choice.label}
                        </option>
                    )}
                </select>
            </>
        )
    }
}

export default Choice;
