import React, {Fragment, useEffect} from "react";
import {nameToId, UseForm} from "./Form";
import {FormFieldProps} from "@src/component/form/Input";
import {ChoiceGroupType, ChoiceType, FormViewType} from "@src/type/FormViewType";

export type ChoiceProps = {
    view: FormViewType,
    choiceValueTransform?: Function,
    choiceLabelTransform?: Function
    prototype?: string
} & FormFieldProps;

const SelectOption = ({view, choice}: { view: FormViewType, choice: ChoiceType }) => {
    return (
        <option
            value={choice.value || choice.label}
            {...(view.choice_attr && (view.choice_attr instanceof Function ? view.choice_attr(choice) : view.choice_attr))}
        >
            {choice.label}
        </option>
    )
}

const SelectGroupOption = ({view, group}: { view: FormViewType, group: ChoiceGroupType }) => {
    return (
        <optgroup label={group.label}>
            {Object.values(group.choices).map((c, index) => (
                <SelectOption key={index} view={view} choice={c}/>
            ))}
        </optgroup>
    )
}

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

    const elementName = view.full_name;
    const [[formState, dispatch], formRef] = UseForm();
    const errorMessages = formState?.errors[elementName || ''] || [];
    const isInvalid = !!errorMessages.length;
    const key = btoa(encodeURIComponent(view.full_name + JSON.stringify(view.data)));

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
        return (
            <div className={[...(isInvalid ? ['is-invalid'] : [])].join(' ')}>
                {Object.values(view.choices || []).map((choice: ChoiceType, choiceIndex: number) => {
                        const elementId = nameToId(elementName || '', choiceIndex);
                        const choiceValue = choiceValueTransform ? choiceValueTransform(choice) : choice.value;
                        const choiceLabel = choiceLabelTransform ? choiceLabelTransform(choice) : choice.label || choiceValue;
                        const attributes = {
                            id: elementId,
                            ...(view?.choice_attr && (view?.choice_attr instanceof Function ? view?.choice_attr(choice) : view?.choice_attr))
                        }

                        return (
                            <div key={key + choiceIndex} className={"form-check"}>
                                <input
                                    defaultValue={choiceValue}
                                    type={view?.multiple ? 'checkbox' : 'radio'}
                                    defaultChecked={view?.data?.includes(choiceValue)}
                                    name={elementName + (view?.multiple ? '[]' : '')}
                                    id={elementId}
                                    className={"form-check-input"}
                                    {...attributes}
                                    onChange={(e) => {
                                        return validate({
                                            value: (view?.multiple ? formRef?.current?.getFormData().getAll(elementName) : formRef?.current?.getFormData().get(elementName)) || e.target.value,
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
                        )
                    }
                )}
            </div>
        );
    } else {
        return (
            <select
                key={key}
                name={elementName}
                multiple={view.multiple}
                aria-invalid={isInvalid}
                onChange={(e) => validate({
                    value: (view.multiple ? formRef?.current?.getFormData().getAll(elementName) : formRef?.current?.getFormData().get(elementName)) || e.target.value
                })}
                className={[...((className || '').split(' ') || []), 'form-control', ...(isInvalid ? ['is-invalid'] : [])].join(' ')}
                {...(view.attr && (view.attr instanceof Function ? view.attr() : view.attr))}
                defaultValue={view.data}
            >
                {view.placeholder && <option value={""}>{view.placeholder}</option>}
                {Object.values(view.choices || []).map((choice: any, index: number) => (
                    <Fragment key={index}>
                        {choice.choices !== undefined ?
                            <SelectGroupOption view={view} group={choice as ChoiceGroupType}/> :
                            <SelectOption view={view} choice={choice as ChoiceType}/>}
                    </Fragment>
                ))}
            </select>
        )
    }
}

export default Choice;
