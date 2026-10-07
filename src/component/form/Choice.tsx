import React, {Fragment, useEffect} from "react";
import {nameToId, UseForm} from "./Form";
import {FormFieldProps} from "@crud-react/component/form/Input";
import {ChoiceGroupType, ChoiceType, FormViewType} from "@crud-react/type/FormViewType";
import Translation, {UseTranslate} from "@crud-react/component/Translation.tsx";

export type ChoiceProps = {
    view: FormViewType,
    choiceValueTransform?: Function,
    choiceLabelTransform?: Function
    prototype?: string
} & FormFieldProps;

const SelectOption = ({view, choice}: { view: FormViewType, choice: ChoiceType }) => {
    const translate = UseTranslate();
    const attr = (choice.attr instanceof Function ? choice.attr(choice) : choice.attr) || {};
    const choiceLabel = choice.label instanceof Function ? choice.label(choice) : choice.label
    return (
        <option
            value={choice.value || choiceLabel}
            {...attr}
            title={typeof attr.title === "string" ? translate(attr.title) : attr.title}
        >
            <Translation>{choiceLabel}</Translation>
        </option>
    )
}

const SelectGroupOption = ({view, group}: { view: FormViewType, group: ChoiceGroupType }) => {
    const translate = UseTranslate();
    return (
        <optgroup label={translate(group.label)}>
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
    const translate = UseTranslate();
    const elementName = view.full_name || '';
    const choiceValue = choiceValueTransform ? choiceValueTransform(choice) : choice.value;
    const choiceLabel = choiceLabelTransform ? choiceLabelTransform(choice) : choice.label;
    const elementId = nameToId(elementName || '', choiceValue);

    const labelAttr = (view.label_attr instanceof Function ? view.label_attr() : view.label_attr) || {};

    const choiceAttributes = {
        id: elementId,
        ...(choice.attr instanceof Function ? choice.attr(view) : choice.attr) || {},
        ...(view.choice_attr instanceof Function ? view.choice_attr(view) : view.choice_attr) || {},
    };

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
                title={typeof choiceAttributes.title === "string" ? translate(choiceAttributes.title) : choiceAttributes.title}
                aria-label={typeof choiceAttributes["aria-label"] === "string" ? translate(choiceAttributes["aria-label"]) : choiceAttributes["aria-label"]}
                aria-description={typeof choiceAttributes["aria-description"] === "string" ? translate(choiceAttributes["aria-description"]) : choiceAttributes["aria-description"]}
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
                    title={typeof labelAttr.title === "string" ? translate(labelAttr.title) : labelAttr.title}
                    aria-label={typeof labelAttr["aria-label"] === "string" ? translate(labelAttr["aria-label"]) : labelAttr["aria-label"]}
                    aria-description={typeof labelAttr["aria-description"] === "string" ? translate(labelAttr["aria-description"]) : labelAttr["aria-description"]}
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
            <label className={"form-label"}><Translation>{group.label}</Translation></label>
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

    const translate = UseTranslate();
    const elementName = view.full_name || '';
    const [[formState, dispatch], formRef, formElementRef] = UseForm();
    const errorMessages = formState?.errors[elementName || ''] || [];
    const isInvalid = !!errorMessages.length;
    const attr = {...(view.attr instanceof Function ? view.attr() : view.attr) || {}};
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
                name: elementName,
                constraints: constraints
            }
        });

        return () => {
            if (!elementName || !formElementRef.current?.elements.namedItem(elementName)) {
                dispatch({action: 'remove-constraints', payload: elementName});
            }
        };
    }, [elementName, dispatch, formElementRef])

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
                                <div className={"form-check"} {...attr} title={typeof attr.title === "string" ? translate(attr.title) : attr.title}>
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
                {...attr}
                title={typeof attr.title === "string" ? translate(attr.title) : attr.title}
                aria-label={typeof attr["aria-label"] === "string" ? translate(attr["aria-label"]) : attr["aria-label"]}
                aria-description={typeof attr["aria-description"] === "string" ? translate(attr["aria-description"]) : attr["aria-description"]}
                defaultValue={view.value || view.data}
            >
                {view.placeholder && (
                    <option value={""}>
                        <Translation>{view.placeholder || ''}</Translation>
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
