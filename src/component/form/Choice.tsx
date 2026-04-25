import React, {Fragment, useEffect} from "react";
import {nameToId, UseForm} from "./Form";
import {FormFieldProps} from "@src/component/form/Input";
import {ChoiceGroupType, ChoiceType, FormViewType} from "@src/type/FormViewType";
import Translation from "@src/component/Translation.tsx";

export type ChoiceProps = {
    view: FormViewType,
    choiceValueTransform?: Function,
    choiceLabelTransform?: Function
    prototype?: string
} & FormFieldProps;

const SelectOption = ({view, choice}: { view: FormViewType, choice: ChoiceType }) => {
    const choiceLabel = choice.label instanceof Function ? choice.label(choice) : choice.label
    return (
        <option
            value={choice.value || choiceLabel}
            {...(choice.attr && (choice.attr instanceof Function ? choice.attr(choice) : choice.attr))}
        >
            <Translation>{choiceLabel}</Translation>
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

const ChoiceOption = (
    {
        view,
        choice,
        choiceValueTransform,
        choiceLabelTransform,
    }: {
        view: FormViewType,
        choice: ChoiceType,
    } & ChoiceProps) => {
    const elementName = view.full_name;
    const choiceValue = choiceValueTransform ? choiceValueTransform(choice) : choice.value;
    const choiceLabel = choiceLabelTransform ? choiceLabelTransform(choice) : choice.label;
    const elementId = nameToId(elementName || '', choiceValue);

    const labelAttr = {
        ...(view.label_attr instanceof Function ? view.label_attr() : view.label_attr) || {},
    };

    const choiceAttributes = {
        id: elementId,
        ...(view.choice_attr instanceof Function ? view.choice_attr(view) : view.choice_attr) || {},
    }

    const checked = view.checked instanceof Function ? view.checked(choiceValue) : view.checked;

    const data = view?.data;
    const defaultChecked = data instanceof Array ? data.includes(choiceValue) : data == choiceValue;

    return (
        <>
            <input
                defaultValue={choiceValue}
                type={view?.multiple ? 'checkbox' : 'radio'}
                defaultChecked={checked || defaultChecked}
                name={(elementName || '') + (view?.multiple ? '[]' : '')}
                id={elementId}
                className={"form-check-input"}
                checked={checked}
                {...choiceAttributes}
                // onChange={(e) => {
                //     return validate({`
                //         value: (view?.multiple ? formRef?.current?.getFormData().getAll(elementName) : formRef?.current?.getFormData().get(elementName)) || e.target.value,
                //         targetValue: e.target.value,
                //         checked: e.target.checked
                //     })
                // }}
            />
            {choiceLabel?.length > 0 && (
                <label
                    htmlFor={choiceAttributes.id}
                    className={"form-check-label"}
                    {...labelAttr}
                >
                    <Translation>{choiceLabel}</Translation>
                </label>
            )}
        </>
    )
}

const ChoiceGroupOption = ({view, group, ...props}: { view: FormViewType, group: ChoiceGroupType } & ChoiceProps) => {
    return (
        <div className={"form-group"}>
            <label className={"form-label"}>{group.label}</label>
            {Object.values(group.choices).map((c, index) => (
                <ChoiceOption key={index} view={view} choice={c} {...props}/>
            ))}
        </div>
    )
}

const Choice = (
    {
        view,
        constraints,
        className,
        onChange,
        choiceValueTransform,
        choiceLabelTransform,
    }: ChoiceProps):
    React.JSX.Element => {
    constraints = constraints || [];

    const elementName = view.full_name;
    const [[formState, dispatch], formRef] = UseForm();
    const errorMessages = formState?.errors[elementName || ''] || [];
    const isInvalid = !!errorMessages.length;
    const attr = {
        ...(view.attr instanceof Function ? view.attr() : view.attr) || {}
    };
    const key = btoa(encodeURIComponent(view.full_name + JSON.stringify(view.data)));
    const classes = [
        ...((attr.class || '').split(' ') || []),
        ...((className || '').split(' ') || []),
        ...(isInvalid ? ['is-invalid'] : [])
    ];

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
            <>
                {typeof view.placeholder === 'string' && (
                    <>
                        <ChoiceOption
                            view={view}
                            choice={{label: view.placeholder, value: null}}
                        />
                    </>
                )}
                {Object.values(view.choices || []).map((choice: ChoiceType & ChoiceGroupType, index: number) => (
                        <Fragment key={index}>
                            {choice.choices !== undefined ?
                                <ChoiceGroupOption
                                    view={view}
                                    group={choice as ChoiceGroupType}
                                    choiceLabelTransform={choiceLabelTransform}
                                    choiceValueTransform={choiceValueTransform}/> :
                                <div className={"form-check"} {...attr}>
                                    <ChoiceOption
                                        view={view}
                                        choice={choice as ChoiceType}
                                        choiceLabelTransform={choiceLabelTransform}
                                        choiceValueTransform={choiceValueTransform}/>
                                </div>}
                        </Fragment>
                    )
                )}
            </>
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
                className={[...classes, 'form-select'].join(' ')}
                {...(view.attr && (view.attr instanceof Function ? view.attr() : view.attr))}
                defaultValue={view.data}
            >
                {view.placeholder && (
                    <option value={""}>
                        <Translation>{view.placeholder}</Translation>
                    </option>
                )}
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

export {Choice as default, ChoiceOption, ChoiceGroupOption, SelectOption, SelectGroupOption};
