import React, {
    Dispatch,
    ReactNode,
    Ref,
    RefObject,
    useEffect,
    useImperativeHandle,
    useReducer,
    useRef
} from "react";
import {Constraint} from "@crud-react/component/form/constraint/Contraint";
import {FormViewErrorType, FormViewTypeEnum} from "@crud-react/type/FormViewType.tsx";

export type FormValue = string | string[] | null;
export type FormErrors = Record<string, FormViewErrorType[]>;
export type FormConstraints = Record<string, Constraint[]>;

export type FormState = {
    response: unknown;
    constraints: FormConstraints;
    errors: FormErrors;
    success: boolean;
};

export type FormAction =
    | {
    action: 'constraints';
    payload: {
        name?: string;
        constraints: Constraint[];
    };
}
    | { action: 'validate'; payload?: string }
    | { action: 'response'; payload: unknown }
    | { action: 'errors'; payload: FormErrors }
    | { action: 'error'; payload: FormErrors }
    | { action: 'success'; payload: boolean };

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

export type FormContextType = [
    [FormState, Dispatch<FormAction>],
    RefObject<FormRef | null>,
    RefObject<HTMLFormElement | null>
];

export type FormProps = Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'children' | 'method' | 'onReset' | 'onSubmit'
> & {
    children?: ReactNode;
    onSubmit?: (data: FormData) => void;
    onBeforeSubmit?: (data: FormData) => void;
    onReset?: () => void;
    method?: 'GET' | 'POST';
    ref?: Ref<FormRef>;
};

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const isFormControl = (element: Element | Node): element is FormControl => (
    element instanceof HTMLInputElement
    || element instanceof HTMLSelectElement
    || element instanceof HTMLTextAreaElement
);

const createInitialState = (): FormState => ({
    response: null,
    constraints: {},
    errors: {},
    success: false
});

const FormContext = React.createContext<FormContextType | undefined>(undefined);

export function UseForm(): FormContextType {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error("UseForm must be used within a Form.");
    }

    return context;
}

export const nameToId = (name: string, index: number | null = null) => (
    name.replace(/[\[\]]/gi, '_')
        .replace(/_+/gi, '_')
        .replace(/([a-zA-Z])(?=[A-Z])/g, '$1_')
    + (index ?? '')
).toLowerCase();

export const Form = (
    {
        id,
        children,
        onBeforeSubmit,
        onSubmit: onSubmitCallback,
        onReset: onResetCallback,
        ref,
        ...props
    }: FormProps) => {
    const formElementRef = useRef<HTMLFormElement | null>(null);
    const formApiRef = useRef<FormRef | null>(null);

    const getFormData = (): FormData => new FormData(formElementRef.current || undefined);

    const setValue = (name: string, value: FormValue): void => {
        const namedElement = formElementRef.current?.elements.namedItem(name);
        if (!namedElement) {
            console.warn('Cannot set value on missing form element with name: ' + name);
            return;
        }

        const elements: FormControl[] = namedElement instanceof RadioNodeList
            ? Array.from(namedElement).filter(isFormControl)
            : isFormControl(namedElement) ? [namedElement] : [];

        if (!elements.length) {
            throw new Error('Cannot set value on unsupported form element with name: ' + name);
        }

        elements.forEach(element => {
            if (
                element instanceof HTMLInputElement
                && [FormViewTypeEnum.Checkbox, FormViewTypeEnum.Radio].includes(element.type as FormViewTypeEnum)
            ) {
                const values = Array.isArray(value) ? value : value === null ? [] : [value];
                element.checked = values.includes(element.value);
                return;
            }

            if (element instanceof HTMLSelectElement && element.multiple) {
                const values = Array.isArray(value) ? value : value === null ? [] : [value];
                Array.from(element.options).forEach(option => {
                    option.selected = values.includes(option.value);
                });
                return;
            }

            if (Array.isArray(value)) {
                throw new Error('Cannot assign multiple values to a single-value form element.');
            }

            element.value = value ?? '';
        });
    };

    const setFormData = (data: FormData): void => {
        Array.from(formElementRef.current?.elements || []).forEach(element => {
            if (!isFormControl(element) || !element.name) {
                return;
            }

            const values = data.getAll(element.name)
                .filter((value): value is string => typeof value === 'string');

            if (element instanceof HTMLSelectElement && element.multiple) {
                Array.from(element.options).forEach(option => {
                    option.selected = values.includes(option.value);
                });
                return;
            }

            if (
                element instanceof HTMLInputElement
                && [FormViewTypeEnum.Checkbox, FormViewTypeEnum.Radio].includes(element.type as FormViewTypeEnum)
            ) {
                element.checked = values.includes(element.value);
                return;
            }

            if (element instanceof HTMLInputElement && element.type === 'file') {
                return;
            }

            const value = data.get(element.name);
            element.value = typeof value === 'string' ? value : '';
        });
    };

    const validateField = (name: string, constraints: Constraint[]) => {
        const formData = getFormData();
        for (const constraint of constraints) {
            if (!constraint.isValid(formData.get(name) || null)) {
                return {valid: false, message: constraint.getMessage()};
            }
        }

        return {valid: true, message: null};
    };

    const reducer = (state: FormState, command: FormAction): FormState => {
        switch (command.action) {
            case 'constraints': {
                const {name, constraints} = command.payload;
                if (!name) {
                    return state;
                }

                return {
                    ...state,
                    constraints: {
                        ...state.constraints,
                        [name]: constraints
                    }
                };
            }
            case 'validate': {
                const name = command.payload;
                if (!name) {
                    return state;
                }

                const {valid, message} = validateField(name, state.constraints[name] || []);
                const errors = {...state.errors};

                if (valid) {
                    delete errors[name];
                } else {
                    errors[name] = [{message: message || 'Error'}];
                }

                return {...state, errors};
            }
            case 'response':
                return {...state, response: command.payload};
            case 'errors':
                return {...state, errors: command.payload};
            case 'error':
                return {...state, errors: {...state.errors, ...command.payload}};
            case 'success':
                return {...state, success: command.payload};
        }
    };

    const formContext = useReducer(reducer, undefined, createInitialState);
    const [formState, dispatch] = formContext;

    const handler: FormRef = {
        getFormData,
        setFormData,
        setValue,
        setValues: values => {
            Object.entries(values).forEach(([name, value]) => setValue(name, value));
        },
        setErrors: errors => dispatch({action: 'errors', payload: errors}),
        reset: () => formElementRef.current?.reset(),
        success: () => dispatch({action: 'success', payload: true}),
        submit: () => formElementRef.current?.requestSubmit()
    };

    formApiRef.current = handler;
    useImperativeHandle(ref, () => handler);

    useEffect(() => {
        const formElement = formElementRef.current;
        const handleFormResetEvent = () => onResetCallback?.();

        formElement?.addEventListener('reset', handleFormResetEvent);
        return () => formElement?.removeEventListener('reset', handleFormResetEvent);
    }, [onResetCallback]);

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const errors: FormErrors = {};
        Object.entries(formState.constraints).forEach(([name, constraints]) => {
            const {valid, message} = validateField(name, constraints);
            if (!valid) {
                errors[name] = [{message: message || 'Error'}];
            }
        });

        if (Object.keys(errors).length) {
            dispatch({action: 'errors', payload: errors});
            return;
        }

        const formData = new FormData(event.currentTarget);
        onBeforeSubmit?.(formData);
        onSubmitCallback?.(formData);
    };

    return (
        <FormContext.Provider value={[formContext, formApiRef, formElementRef]}>
            <form id={id} ref={formElementRef} onSubmit={handleSubmit} {...props}>
                {children}
            </form>
        </FormContext.Provider>
    );
};
