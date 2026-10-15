import React, { useCallback } from "react";
import { nameToId, useFormField } from "./Form.tsx";
import type { FormFieldProps } from "./Input.tsx";
import type { ChoiceGroupType, ChoiceType, FormViewType } from "@crud-react/type/FormViewType";
import Translation, { UseTranslate } from "@crud-react/component/Translation.tsx";
import { choiceToken } from "./formChoices.ts";
import {
    controlAttributes,
    choiceName,
    selectedValues,
    selectionRules,
    stringValue,
    initialFieldValue
} from "./formView.ts";

export type ChoiceProps = Omit<FormFieldProps, "ref"> & {
    choiceValueTransform?: (choice: ChoiceType) => unknown;
    choiceLabelTransform?: Function;
    ref?: React.Ref<HTMLSelectElement>;
};

function useChoiceField(
    view: FormViewType,
    constraints: ChoiceProps["constraints"],
    transform: ChoiceProps["choiceValueTransform"]
) {
    const initialize = useCallback(
        (node: FormViewType) => initialFieldValue(node, transform),
        [transform]
    );

    return useFormField(view, constraints, view.expanded && transform ? initialize : undefined);
}

const SelectOption = ({ choice }: { view: FormViewType; choice: ChoiceType }) => {
    const translate = UseTranslate();
    const attr = (choice.attr instanceof Function ? choice.attr(choice) : choice.attr) || {};
    const label = choice.label instanceof Function ? choice.label(choice) : choice.label;

    return (
        <option
            {...controlAttributes(attr)}
            value={choice.value == null ? stringValue(label) : choiceToken(choice)}
            title={typeof attr.title === "string" ? translate(attr.title) : attr.title}>
            <Translation>{label}</Translation>
        </option>
    );
};

const SelectGroupOption = ({ view, group }: { view: FormViewType; group: ChoiceGroupType }) => {
    const translate = UseTranslate();

    return (
        <optgroup label={translate(group.label)}>
            {Object.values(group.choices).map((choice, index) => {
                return (
                    <SelectOption
                        key={choice.value == null ? index : choiceToken(choice)}
                        view={view}
                        choice={choice}
                    />
                );
            })}
        </optgroup>
    );
};

const ChoiceOption = ({
    view,
    choice,
    constraints,
    onChange,
    choiceValueTransform,
    choiceLabelTransform
}: ChoiceProps & { choice: ChoiceType }) => {
    const field = useChoiceField(view, constraints, choiceValueTransform);
    const translate = UseTranslate();
    const token = choiceValueTransform
        ? stringValue(choiceValueTransform(choice))
        : choiceToken(choice);
    let label: React.ReactNode;

    if (choiceLabelTransform) {
        label = choiceLabelTransform(choice);
    } else if (choice.label instanceof Function) {
        label = choice.label(choice);
    } else {
        label = choice.label;
    }

    const labelAttr =
        (view.label_attr instanceof Function ? view.label_attr() : view.label_attr) || {};
    const viewAttr = (view.attr instanceof Function ? view.attr() : view.attr) || {};
    const attr = {
        ...((choice.attr instanceof Function ? choice.attr(view) : choice.attr) || {}),
        ...((view.choice_attr instanceof Function ? view.choice_attr(view) : view.choice_attr) ||
            {})
    };
    const id = attr.id ?? nameToId(view.full_name || "", token);

    return (
        <>
            <input
                {...controlAttributes(attr)}
                ref={(element) => {
                    if (element) {
                        selectionRules.set(element, {
                            required: !!view.required,
                            multiple: !!view.multiple,
                            override: attr.required == null ? undefined : !!attr.required,
                            emptyPlaceholder: !view.multiple && token === ""
                        });
                    }

                    if (attr.ref instanceof Function) {
                        attr.ref(element);
                    } else if (attr.ref) {
                        attr.ref.current = element;
                    }
                }}
                id={id}
                value={token}
                type={view.multiple ? "checkbox" : "radio"}
                name={choiceName(view)}
                checked={
                    !view.multiple && token === ""
                        ? field.value == null || field.value === ""
                        : selectedValues(field.value).includes(token)
                }
                disabled={attr.disabled ?? view.disabled}
                required={
                    attr.required ??
                    (view.required && (!view.multiple || selectedValues(field.value).length === 0))
                }
                aria-invalid={!!field.errors.length}
                className={
                    attr.className ??
                    ["form-check-input", field.errors.length ? "is-invalid" : null]
                        .filter(Boolean)
                        .join(" ")
                }
                onChange={(event) => {
                    if (viewAttr.onChange instanceof Function) {
                        viewAttr.onChange(event);
                    }

                    if (attr.onChange instanceof Function) {
                        attr.onChange(event);
                    }

                    if (event.defaultPrevented) {
                        return;
                    }

                    const value = field.change((current) => {
                        if (!view.multiple) {
                            return token;
                        }

                        const selected = selectedValues(current);

                        if (event.target.checked) {
                            return [...selected, token];
                        }

                        return selected.filter((item) => item !== token);
                    });
                    onChange?.({ value, targetValue: token, checked: event.target.checked });
                }}
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
            />
            {label != null && label !== "" && (
                <label
                    {...labelAttr}
                    htmlFor={id}
                    className={labelAttr.className ?? "form-check-label"}
                    aria-label={
                        typeof labelAttr["aria-label"] === "string"
                            ? translate(labelAttr["aria-label"])
                            : labelAttr["aria-label"]
                    }
                    aria-description={
                        typeof labelAttr["aria-description"] === "string"
                            ? translate(labelAttr["aria-description"])
                            : labelAttr["aria-description"]
                    }
                    title={
                        typeof labelAttr.title === "string"
                            ? translate(labelAttr.title)
                            : labelAttr.title
                    }>
                    <Translation>{label}</Translation>
                </label>
            )}
        </>
    );
};

const ChoiceGroupOption = ({ view, group, ...props }: ChoiceProps & { group: ChoiceGroupType }) => {
    return (
        <div className="form-group">
            <label className="form-label">
                <Translation>{group.label}</Translation>
            </label>
            {Object.values(group.choices).map((choice, index) => {
                return (
                    <ChoiceOption
                        key={choice.value == null ? index : choiceToken(choice)}
                        view={view}
                        choice={choice}
                        {...props}
                    />
                );
            })}
        </div>
    );
};

const Choice = ({
    view,
    constraints,
    className,
    onChange,
    choiceValueTransform,
    choiceLabelTransform,
    ref
}: ChoiceProps): React.JSX.Element => {
    const field = useChoiceField(view, constraints, choiceValueTransform);
    const translate = UseTranslate();
    const attr = { ...((view.attr instanceof Function ? view.attr() : view.attr) || {}) };
    const { onChange: containerOnChange, ...containerAttr } = attr;
    const optionProps = { view, constraints, onChange, choiceValueTransform, choiceLabelTransform };

    if (view.expanded) {
        return (
            <>
                {typeof view.placeholder === "string" && (
                    <ChoiceOption
                        {...optionProps}
                        choice={{ label: view.placeholder, value: null }}
                    />
                )}
                {Object.values(view.choices || []).map((choice, index) => {
                    if ("choices" in choice) {
                        return (
                            <ChoiceGroupOption key={choice.label} {...optionProps} group={choice} />
                        );
                    }

                    return (
                        <div
                            key={choice.value == null ? index : choiceToken(choice)}
                            className="form-check"
                            {...containerAttr}>
                            <ChoiceOption {...optionProps} choice={choice} />
                        </div>
                    );
                })}
            </>
        );
    }

    const choices = Object.values(view.choices || []).flatMap((choice) =>
        "choices" in choice ? Object.values(choice.choices) : [choice]
    );
    const tokens = choices.map((choice) => {
        if (choice.value == null) {
            return stringValue(
                choice.label instanceof Function ? choice.label(choice) : choice.label
            );
        }

        return choiceToken(choice);
    });

    if (view.placeholder) {
        tokens.push("");
    }

    const missing = selectedValues(field.value).filter((value) => !tokens.includes(value));
    let selectValue: string | string[];

    if (view.multiple) {
        selectValue = selectedValues(field.value);
    } else if (Array.isArray(field.value)) {
        selectValue = field.value[0] ?? "";
    } else {
        selectValue = field.value ?? "";
    }

    return (
        <select
            {...controlAttributes(attr)}
            ref={ref}
            id={view.id ?? attr.id}
            name={view.full_name}
            multiple={view.multiple}
            required={attr.required ?? view.required}
            disabled={attr.disabled ?? view.disabled}
            aria-invalid={!!field.errors.length}
            value={selectValue}
            onChange={(event) => {
                if (attr.onChange instanceof Function) {
                    attr.onChange(event);
                }

                if (event.defaultPrevented) {
                    return;
                }

                const value = view.multiple
                    ? Array.from(event.target.selectedOptions).map((option) => option.value)
                    : event.target.value;
                field.change(value);
                onChange?.({ value });
            }}
            className={[
                attr.className || attr.class,
                className,
                "form-select",
                field.errors.length ? "is-invalid" : null
            ]
                .filter(Boolean)
                .join(" ")}
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
            }>
            {missing.map((value) => {
                return (
                    <option key={value} value={value} hidden>
                        {value}
                    </option>
                );
            })}
            {view.placeholder && (
                <option value="">
                    <Translation>{view.placeholder}</Translation>
                </option>
            )}
            {Object.values(view.choices || []).map((choice, index) => {
                if ("choices" in choice) {
                    return <SelectGroupOption key={choice.label} view={view} group={choice} />;
                }

                return (
                    <SelectOption
                        key={choice.value == null ? index : choiceToken(choice)}
                        view={view}
                        choice={choice}
                    />
                );
            })}
        </select>
    );
};

export { Choice as default, ChoiceOption, ChoiceGroupOption, SelectOption, SelectGroupOption };
