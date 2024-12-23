import React, {ForwardedRef, forwardRef, useEffect, useImperativeHandle, useReducer, useRef} from "react";
import {Constraint} from "@src/component/form/constraint/Contraint";

export type FormError = {
    message: string;
    messageParameters?: { [key: string]: string };
    messageTemplate?: string;
}

const FormContext: any = React.createContext<any>(null);

export function useForm(): any {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error("useForm must be used in Form");
    }

    return context;
}

type FormStatePayload = {
    action: string;
    payload: any;
}

type FormState = {
    response?: any;
    constraints?: any;
    errors?: { [key: string]: FormError[] };
}

type FormProps = {
    children?: any,
    onComplete?: Function,
    onError?: Function,
    onSubmit?: Function,
    onBeforeSubmit?: Function,
    onReset?: Function,
    action?: string,
    method?: 'GET' | 'POST',
    className?: string,
    id?: string
}

export type FormRef = {
    getFormData: Function,
    setErrors: Function,
    reset: Function,
    submit: Function
};

export const nameToId = (name: string, index: number | null = null) => (name.replace(/[\[\]]/gi, '_').replace(/_+/gi, '_') + (index && index));

export const Form = forwardRef(({
                                    id,
                                    children,
                                    onError,
                                    onBeforeSubmit,
                                    onSubmit: onSubmitCallback,
                                    onReset: onResetCallback,
                                    ...props
                                }: FormProps, ref: ForwardedRef<FormRef>) => {
    const formElementRef = useRef<HTMLFormElement | null>(null);
    const initialState: FormState = {
        response: null,
        constraints: {},
        errors: {}
    };

    const handler: FormRef = {
        getFormData: () => new FormData(formElementRef.current || undefined),
        setErrors: (errors: { [key: string]: FormError[] }) => {
            const [, dispatch] = context;
            dispatch({action: 'errors', payload: errors});
        },
        reset: () => {
            formElementRef.current?.reset();
        },
        submit: () => formElementRef.current?.requestSubmit()
    };

    useImperativeHandle(ref, (): FormRef => handler);
    useEffect(() => {
        const handleFormResetEvent = () => {
            onResetCallback && onResetCallback()
        }

        const formElement = formElementRef?.current;
        formElement?.addEventListener('reset', handleFormResetEvent);
        return () => {
            formElement?.removeEventListener('reset', handleFormResetEvent);
        }
    }, []);

    const validateField = (name: string, constraints: Constraint[]) => {
        const formData = handler.getFormData();
        for (const constraint of constraints) {
            if (!constraint.isValid(formData.get(name) || null)) {
                return {valid: false, message: constraint.getMessage()};
            }
        }

        return {valid: true, message: null};
    }

    const context = useReducer((state: FormState, command: FormStatePayload): FormState => {
        const {action, payload} = command;
        switch (action) {
            case 'constraints': {
                const {name, constraints} = payload;
                return {
                    ...state,
                    constraints: {
                        ...(state.constraints || {}),
                        [name]: constraints
                    }
                }
            }
            case 'validate': {
                const {valid, message} = validateField(payload, state.constraints[payload] || []);
                const errors = state.errors || {};
                const formName = payload as string;
                if (valid) {
                    delete errors[formName];
                } else {
                    errors[formName] = [...(errors[formName] || []), {message: message || 'Error'}];
                }

                if (!Object.keys(errors).length) {
                    return state;
                }

                return {
                    ...state,
                    errors
                };
            }
            case 'response': {
                return {
                    ...state,
                    response: payload
                }
            }
            case 'errors': {
                return {
                    ...state,
                    errors: payload || []
                }
            }
            case 'error': {
                const errors = {...state.errors, ...payload};
                return {
                    ...state,
                    errors: errors
                }
            }
        }

        return state;
    }, initialState as FormState);
    const onSubmit = (e: any) => {
        e.preventDefault();
        const [form, dispatch] = context;
        let errors: any = {};
        for (const [name, constraints] of Object.entries<[any, Constraint[]]>(form.constraints)) {
            const {valid, message} = validateField(name, constraints);
            if (!valid) {
                errors[name] = [message];
            }
        }

        if (Object.values(errors).length) {
            dispatch({action: 'errors', payload: errors});
            return;
        }

        const formData = new FormData(formElementRef?.current || undefined);

        onBeforeSubmit && onBeforeSubmit(formData);

        if (onSubmitCallback) {
            onSubmitCallback(formData)

            return;
        }

        // formElementRef?.current?.submit();
    }

    return (
        <FormContext.Provider value={[context, ref, formElementRef]}>
            <form id={id} ref={formElementRef} onSubmit={onSubmit} {...props}>{children}</form>
        </FormContext.Provider>
    )
});
