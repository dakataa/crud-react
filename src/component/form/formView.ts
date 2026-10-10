import type {
    FormViewErrorType,
    FormViewType,
    ChoiceType
} from "@crud-react/type/FormViewType.tsx";
import { FormViewTypeEnum } from "@crud-react/type/FormViewType.tsx";
import type { FormValue } from "./Form.tsx";

const initialOverrides = new WeakSet<FormViewType>();

export const hasInitialOverride = (view: FormViewType) => initialOverrides.has(view);

export const markInitialOverride = (view: FormViewType) => {
    initialOverrides.add(view);

    return view;
};

export const fieldName = (name: string) => name.replace(/\[\]$/, "");

export const choiceName = (view: FormViewType) => {
    const name = view.full_name || "";

    return view.multiple && view.expanded && !name.endsWith("[]") ? name + "[]" : name;
};

export const stringValue = (value: unknown): string => (value == null ? "" : String(value));

export const selectedValues = (value: FormValue | undefined): string[] => {
    if (Array.isArray(value)) {
        return value;
    }

    if (value == null) {
        return [];
    }

    return [value];
};

export const isSelection = (view: FormViewType) => ["checkbox", "radio"].includes(view.type);

export const inputToken = (view: FormViewType): string => stringValue(view.value ?? "1");

/** Convert backend/domain values once at the boundary, keeping editable values as strings. */
export function initialFieldValue(
    view: FormViewType,
    choiceValueTransform?: (choice: ChoiceType) => unknown
): FormValue {
    if (isSelection(view)) {
        const token = inputToken(view);
        let checked: boolean;

        if (view.checked instanceof Function) {
            checked = view.checked(token);
        } else if (view.checked !== undefined) {
            checked = view.checked;
        } else if (Array.isArray(view.data)) {
            checked = view.data.map(stringValue).includes(token);
        } else if (view.type === "radio") {
            checked = stringValue(view.data) === token;
        } else {
            checked = !!view.data;
        }

        if (view.multiple) {
            return checked ? [token] : [];
        }

        return checked ? token : null;
    }

    if (view.expanded && view.checked instanceof Function) {
        const choices = Object.values(view.choices || []).flatMap((choice) =>
            "choices" in choice ? choice.choices : [choice]
        );
        const selected = choices.flatMap((choice) => {
            const value = choiceValueTransform ? choiceValueTransform(choice) : choice.value;
            const token = stringValue(value);

            if (view.checked instanceof Function && view.checked(token)) {
                return [token];
            }

            return [];
        });

        if (view.multiple) {
            return selected;
        }

        if (!selected.length) {
            return null;
        }

        return selected[0];
    }

    const value = view.value ?? view.data;

    if (view.multiple) {
        if (Array.isArray(value)) {
            return value.map(stringValue);
        }

        if (value == null || value === "") {
            return [];
        }

        return [stringValue(value)];
    }

    if (
        [
            FormViewTypeEnum.Date,
            FormViewTypeEnum.Birthday,
            FormViewTypeEnum.Datetime,
            FormViewTypeEnum.Time
        ].includes(view.type as FormViewTypeEnum) &&
        value?.date
    ) {
        const date = new Date(value.date);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

        if (view.type === FormViewTypeEnum.Datetime) {
            return local.slice(0, 16);
        }

        if (view.type === FormViewTypeEnum.Time) {
            return local.slice(11, 16);
        }

        return local.slice(0, 10);
    }

    if (!view.expanded && view.choices && !view.placeholder && (value == null || value === "")) {
        const choices = Object.values(view.choices).flatMap((choice) =>
            "choices" in choice ? choice.choices : [choice]
        );
        const first = choices.find(
            (choice) =>
                !(choice.attr instanceof Function ? choice.attr(choice) : choice.attr)?.disabled
        );

        if (first) {
            return stringValue(
                first.value ?? (first.label instanceof Function ? first.label(first) : first.label)
            );
        }
    }

    return stringValue(value);
}

export type FormDefaults = {
    values: Record<string, FormValue>;
    collections: Record<string, string[]>;
};

export function formDefaults(
    view: FormViewType,
    initialize: (view: FormViewType) => FormValue = initialFieldValue
): FormDefaults {
    const result: FormDefaults = { values: {}, collections: {} };

    const visit = (node: FormViewType) => {
        if (node.type === FormViewTypeEnum.Collection && node.full_name) {
            result.collections[fieldName(node.full_name)] = Object.keys(node.children || {});
        }

        const hasChildren = node.children && Object.keys(node.children).length > 0;
        const isContainer = ["form", "repeated", "collection"].includes(node.type);

        if (hasChildren || isContainer) {
            Object.values(node.children || {}).forEach(visit);
        } else if (node.full_name) {
            const name = fieldName(node.full_name);
            const value = initialize(node);

            if (isSelection(node) && Array.isArray(value)) {
                result.values[name] = [
                    ...new Set([...selectedValues(result.values[name]), ...value])
                ];
            } else if (value !== null || !(name in result.values)) {
                result.values[name] = value;
            }
        }
    };

    visit(view);

    return result;
}

/** Instantiate a prototype without mutating it or dropping function-valued options. */
export function instantiateView(
    view: FormViewType,
    collection: FormViewType,
    name: string,
    index: number
): FormViewType {
    const placeholder = collection.prototype_name || "__name__";
    const prefix = `${collection.full_name}[${placeholder}]`;
    const replacement = `${collection.full_name}[${name}]`;

    const clone = (node: FormViewType): FormViewType => {
        const result: FormViewType = {
            ...node,
            full_name: node.full_name?.replace(prefix, replacement),
            id: node.id?.replace(placeholder, name),
            label: node.label?.replace("__name__label__", String(index))
        };

        if (node.children) {
            result.children = Object.fromEntries(
                Object.entries(node.children).map(([key, child]) => [key, clone(child)])
            );
        }

        if (node.prototype) {
            result.prototype = clone(node.prototype);
        }

        return result;
    };

    return { ...clone(view), name, prototype_name: name };
}

export function formErrors(view: FormViewType): Record<string, FormViewErrorType[]> {
    const result: Record<string, FormViewErrorType[]> = {};

    const visit = (node: FormViewType) => {
        (node.errors || []).forEach((error) => {
            const name = fieldName(error.origin || node.full_name || "");
            (result[name] ||= []).push(error);
        });
        Object.values(node.children || {}).forEach(visit);
    };

    visit(view);

    return result;
}

/** Value ownership belongs to the binding; decorative attributes remain extensible. */
export function controlAttributes(attr: Record<string, any>): Record<string, any> {
    const { value, defaultValue, checked, defaultChecked, name, selected, ...rest } = attr;

    return rest;
}

// Native validity must also be correct before a queued React render commits.
type SelectionRule = {
    required: boolean;
    multiple: boolean;
    override?: boolean;
    emptyPlaceholder?: boolean;
};

export const selectionRules = new WeakMap<HTMLInputElement, SelectionRule>();
