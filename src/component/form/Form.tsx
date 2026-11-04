import type { ReactNode, Ref, RefObject } from "react";
import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore
} from "react";
import type { Constraint } from "./constraint/Contraint";
import type { FormViewErrorType, FormViewType } from "@crud-react/type/FormViewType.tsx";
import type { FieldKind, FormSubmission } from "./FormStore.ts";
import { FormStore } from "./FormStore.ts";
import {
    choiceName,
    equalFormValue,
    fieldName,
    hasInitialOverride,
    initialFieldValue,
    isSelection,
    selectedValues,
    selectionRules
} from "./formView.ts";

export type FormValue = string | string[] | null;
export type FormValueField = string | FormViewType | null | undefined;
export type FormErrors = Record<string, FormViewErrorType[]>;
export type FormConstraints = Record<string, Constraint[]>;

export type FormState = {
    constraints: FormConstraints;
    errors: FormErrors;
    success: boolean;
    submitting: boolean;
};

export type FormRef = {
    getFormData: () => FormData;
    setFormData: (data: FormData) => void;
    setValue: (name: string, value: FormValue) => void;
    setValues: (data: Record<string, FormValue>) => void;
    setErrors: (errors: FormErrors) => void;
    success: () => void;
    reset: () => void;
    submit: () => void;
};

export type FormContextType = {
    store: FormStore;
    apiRef: RefObject<FormRef | null>;
    elementRef: RefObject<HTMLFormElement | null>;
};

export type FormProps = Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    "children" | "method" | "onReset" | "onSubmit"
> & {
    children?: ReactNode;
    onSubmit?: (data: FormData, submission: FormSubmission, runtime: FormContextType) => void;
    onBeforeSubmit?: (data: FormData) => void;
    onReset?: () => void;
    onStateChange?: (state: FormState) => void;
    method?: "GET" | "POST";
    ref?: Ref<FormRef>;
};

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const isFormControl = (element: Element): element is FormControl => {
    return (
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
    );
};

function supportsMultipleValues(element: FormControl) {
    if (element instanceof HTMLInputElement) {
        return ["checkbox", "radio"].includes(element.type);
    }

    return element instanceof HTMLSelectElement && element.multiple;
}

function readFileValue(element: HTMLInputElement) {
    if (element.multiple) {
        return Array.from(element.files || []);
    }

    return element.files?.[0] ?? null;
}

function getFieldKind(view: FormViewType): FieldKind {
    if (view.multiple) {
        return "multiple";
    }

    if (isSelection(view) || view.expanded) {
        return "selection";
    }

    return "scalar";
}

const EMPTY_CONSTRAINTS: Constraint[] = [];
const FormContext = React.createContext<FormContextType | undefined>(undefined);

/** Returns stable form access without subscribing to state changes. */
export function UseForm(): FormContextType {
    const context = React.useContext(FormContext);

    if (!context) {
        throw new Error("UseForm must be used within a Form.");
    }

    return context;
}

/** Subscribes to errors, validation rules and submission status. */
export function useFormState(): FormState {
    const { store } = UseForm();

    return useSyncExternalStore(store.subscribeState, store.getState, store.getState);
}

/** Observes a value without registering a control or subscribing to its errors. */
export function useFormValue(field?: FormValueField): FormValue | undefined {
    return useFormValues([field])[0];
}

/** Observes values in the supplied order; unchanged values retain the same snapshot. */
export function useFormValues(
    fields: readonly FormValueField[]
): readonly (FormValue | undefined)[] {
    const { store } = UseForm();
    const names = fields.map((field) => {
        const name = typeof field === "string" ? field : field?.full_name;

        return fieldName(name || "");
    });
    const namesKey = JSON.stringify(names);
    const observer = useMemo(() => {
        const subscribedNames = [...new Set(names.filter(Boolean))];
        let snapshot: readonly (FormValue | undefined)[] | undefined;

        const subscribe = (listener: () => void) => {
            const cleanups = subscribedNames.map((name) => store.subscribeField(name, listener));

            return () => {
                cleanups.forEach((cleanup) => cleanup());
            };
        };

        const getSnapshot = () => {
            const values = names.map((name) => (name ? store.getValue(name) : undefined));
            const previous = snapshot;

            if (
                previous &&
                values.every((value, index) => equalFormValue(value, previous[index]))
            ) {
                return previous;
            }

            snapshot = values;

            return snapshot;
        };

        return { subscribe, getSnapshot };
    }, [store, namesKey]);

    return useSyncExternalStore(observer.subscribe, observer.getSnapshot, observer.getSnapshot);
}

function FormStateObserver({
    onStateChange
}: {
    onStateChange: NonNullable<FormProps["onStateChange"]>;
}) {
    const state = useFormState();
    const notifiedState = useRef<FormState | null>(null);

    useEffect(() => {
        if (notifiedState.current === state) {
            return;
        }

        // Callback replacements and StrictMode effect replay must not repeat a notification.
        notifiedState.current = state;
        onStateChange(state);
    }, [state, onStateChange]);

    return null;
}

export function useFormField(
    view: FormViewType,
    constraints: Constraint[] = EMPTY_CONSTRAINTS,
    initialize?: (view: FormViewType) => FormValue
) {
    const { store } = UseForm();
    const name = fieldName(view.full_name || "");
    const owner = useRef(Symbol("field"));
    const initial = useMemo(
        () => (initialize ? initialize(view) : initialFieldValue(view)),
        [view, initialize]
    );
    const kind = getFieldKind(view);
    const subscribe = useCallback(
        (listener: () => void) => store.subscribeField(name, listener),
        [store, name]
    );
    const getSnapshot = useCallback(() => store.getField(name), [store, name]);
    const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    // Registration preserves existing edits, including values set while the field was hidden.
    useLayoutEffect(() => {
        if (!name) {
            return;
        }

        return store.registerField(
            name,
            initial,
            kind,
            constraints,
            owner.current,
            hasInitialOverride(view),
            isSelection(view),
            initialize
        );
    }, [store, name, kind, constraints, initialize]);
    const change = useCallback(
        (value: FormValue | ((current: FormValue) => FormValue)) => {
            const current = store.getValue(name);
            const currentValue = current === undefined ? initial : current;
            const next = typeof value === "function" ? value(currentValue) : value;
            store.change(name, next);

            return next;
        },
        [store, name, initial]
    );
    const changeNative = useCallback(
        (value: unknown) => store.changeNative(name, value),
        [store, name]
    );

    return {
        ...state,
        value: state.value === undefined ? initial : state.value,
        name: choiceName(view),
        change,
        changeNative
    };
}

export function useFormErrors(names: string[]) {
    const { store } = UseForm();
    const key = JSON.stringify(names);
    const getSnapshot = useCallback(() => store.getErrors(names), [store, key]);

    return useSyncExternalStore(store.subscribeState, getSnapshot, getSnapshot);
}

export function useFormCollection(name: string, initialItems: string[]) {
    const { store } = UseForm();
    const subscribe = useCallback(
        (listener: () => void) => store.subscribeCollection(name, listener),
        [store, name]
    );
    const getSnapshot = useCallback(() => store.getCollection(name), [store, name]);
    const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    useLayoutEffect(() => store.initializeCollection(name, initialItems), [store, name]);

    return {
        items,
        add: (item: string) => store.addItem(name, item),
        remove: (item: string) => store.removeItem(name, item)
    };
}

export const nameToId = (name: string, index: string | number | null = null) => {
    return (
        name
            .replace(/[\[\]]/gi, "_")
            .replace(/_+/gi, "_")
            .replace(/([a-zA-Z])(?=[A-Z])/g, "$1_") + (index ?? "")
    ).toLowerCase();
};

function assignControl(element: FormControl, value: FormValue) {
    if (element instanceof HTMLInputElement && element.type === "file") {
        return;
    }

    if (element instanceof HTMLInputElement && ["checkbox", "radio"].includes(element.type)) {
        const rules = selectionRules.get(element);
        const selectsEmptyPlaceholder = rules?.emptyPlaceholder && (value === null || value === "");

        element.checked =
            !!selectsEmptyPlaceholder || selectedValues(value).includes(element.value);
    } else if (element instanceof HTMLSelectElement && element.multiple) {
        const values = selectedValues(value);
        Array.from(element.options).forEach((option) => {
            option.selected = values.includes(option.value);
        });
    } else {
        if (Array.isArray(value)) {
            throw new Error("Cannot assign multiple values to a single-value form element.");
        }

        element.value = value ?? "";
    }
}

export const Form = ({
    id,
    children,
    onBeforeSubmit,
    onSubmit: onSubmitCallback,
    onReset: onResetCallback,
    onStateChange,
    ref,
    ...props
}: FormProps) => {
    const formElementRef = useRef<HTMLFormElement | null>(null);
    const formApiRef = useRef<FormRef | null>(null);
    const [store] = useState(() => {
        return new FormStore();
    });
    const runtime = useMemo(() => {
        return { store, apiRef: formApiRef, elementRef: formElementRef };
    }, [store]);

    const controls = (): FormControl[] =>
        Array.from(formElementRef.current?.elements || []).filter(isFormControl);

    const projectValues = () => {
        return controls().forEach((element) => {
            if (!store.isRegistered(element.name)) {
                return;
            }

            const value = store.getValue(element.name);

            if (value !== undefined) {
                assignControl(element, value);

                if (element instanceof HTMLInputElement) {
                    const rules = selectionRules.get(element);

                    if (rules) {
                        element.required =
                            rules.override ??
                            (rules.required &&
                                (!rules.multiple || selectedValues(value).length === 0));
                    }
                }
            }
        });
    };

    const getFormData = (submitter?: HTMLElement | null): FormData => {
        // Keep imperative setValue(); getFormData() synchronous, and let the browser
        // handle disabled fields, repeated names, files and custom native controls.
        projectValues();
        const data = formElementRef.current
            ? new FormData(formElementRef.current, submitter)
            : new FormData();
        // A collection removal/reset may precede the next DOM commit.
        Array.from(data.keys())
            .filter((name) => !store.isActiveValue(name))
            .forEach((name) => data.delete(name));

        return data;
    };

    const setValue = (name: string, value: FormValue) => {
        const elements = controls().filter(
            (element) => fieldName(element.name) === fieldName(name)
        );
        const hasSingleValueControl = elements.some((element) => !supportsMultipleValues(element));

        if (Array.isArray(value) && hasSingleValueControl) {
            throw new Error("Cannot assign multiple values to a single-value form element.");
        }

        store.setValue(name, value);
        elements.forEach((element) => assignControl(element, value));
        projectValues();
    };

    const setFormData = (data: FormData) => {
        const names = new Set([
            ...store.getNames(),
            ...controls().map((element) => fieldName(element.name)),
            ...Array.from(data.keys()).map(fieldName)
        ]);
        names.forEach((name) => {
            const elements = controls().filter((element) => fieldName(element.name) === name);

            if (
                elements.some(
                    (element) => element instanceof HTMLInputElement && element.type === "file"
                )
            ) {
                return;
            }

            const values = [...data.getAll(name), ...data.getAll(name + "[]")].filter(
                (value): value is string => typeof value === "string"
            );
            const multiple =
                store.getKind(name) === "multiple" ||
                Array.isArray(store.getValue(name)) ||
                elements.some(
                    (element) => element instanceof HTMLSelectElement && element.multiple
                ) ||
                (store.getKind(name) === undefined &&
                    elements.some(
                        (element) =>
                            element instanceof HTMLInputElement && element.type === "checkbox"
                    ));
            const selection =
                store.getKind(name) === "selection" ||
                elements.some((element) => {
                    return (
                        element instanceof HTMLInputElement &&
                        ["checkbox", "radio"].includes(element.type)
                    );
                });
            let value: FormValue = values[0] ?? "";

            if (multiple) {
                value = values;
            } else if (selection) {
                value = values[0] ?? null;
            }

            setValue(name, value);
        });
    };

    const handler: FormRef = {
        getFormData,
        setFormData,
        setValue,
        setValues: (values) => {
            return Object.entries(values).forEach(([name, value]) => setValue(name, value));
        },
        setErrors: store.setErrors,
        reset: () => formElementRef.current?.reset(),
        success: () => store.setSuccess(true),
        submit: () => {
            projectValues();
            // Native validity runs before onSubmit, even before a removed row unmounts.
            const removed = controls().filter(
                (element) => !element.disabled && !store.isActiveValue(element.name)
            );
            removed.forEach((element) => {
                element.disabled = true;
            });
            try {
                formElementRef.current?.requestSubmit();
            } finally {
                removed.forEach((element) => {
                    element.disabled = false;
                });
            }
        }
    };
    formApiRef.current = handler;
    useImperativeHandle(ref, () => handler);
    useEffect(() => {
        const element = formElementRef.current;

        const reset = (event: Event) => {
            event.preventDefault();
            store.reset();
            controls().forEach((control) => {
                if (control instanceof HTMLInputElement) {
                    if (control.type === "file") {
                        control.value = "";
                    } else if (["checkbox", "radio"].includes(control.type)) {
                        control.checked = control.defaultChecked;
                    } else {
                        control.value = control.defaultValue;
                    }
                } else if (control instanceof HTMLTextAreaElement) {
                    control.value = control.defaultValue;
                } else {
                    Array.from(control.options).forEach((option) => {
                        option.selected = option.defaultSelected;
                    });
                }
            });
            projectValues();
            onResetCallback?.();
        };

        element?.addEventListener("reset", reset);

        return () => element?.removeEventListener("reset", reset);
    }, [store, onResetCallback]);

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const active = (name: string) => {
            return (
                store.isActiveValue(name) &&
                controls().some(
                    (element) => fieldName(element.name) === name && !element.matches(":disabled")
                )
            );
        };

        const readValue = (name: string) => {
            const file = controls().find((element) => {
                return (
                    element instanceof HTMLInputElement &&
                    element.type === "file" &&
                    fieldName(element.name) === name
                );
            }) as HTMLInputElement | undefined;

            if (file) {
                return readFileValue(file);
            }

            return store.getValue(name) ?? null;
        };

        if (!store.validateAll(active, readValue)) {
            return;
        }

        const formData = getFormData((event.nativeEvent as SubmitEvent).submitter);
        // Unchecked controls also participate: their absence from FormData clears a selection.
        // Disabled and unmounted fields remain drafts, even after a successful partial POST.
        const fields = controls()
            .filter((element) => element.name && active(fieldName(element.name)))
            .map((element) => element.name);
        const collectionNames = Array.from(
            formElementRef.current?.querySelectorAll<HTMLInputElement>("[data-form-collection]") ||
                []
        )
            .filter((element) => !element.matches(":disabled"))
            .map((element) => element.dataset.formCollection || "");
        const submission = store.snapshot(fields, collectionNames);
        onBeforeSubmit?.(formData);

        if (onSubmitCallback) {
            store.setSubmitting(true);
            onSubmitCallback(formData, submission, runtime);
        }
    };

    return (
        <FormContext.Provider value={runtime}>
            {onStateChange && <FormStateObserver onStateChange={onStateChange} />}
            <form id={id} ref={formElementRef} onSubmit={handleSubmit} {...props}>
                {children}
            </form>
        </FormContext.Provider>
    );
};
