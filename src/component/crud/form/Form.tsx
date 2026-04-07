import {Form as BaseForm, FormRef, UseForm} from "@src/component/form/Form.tsx";
import React, {
    forwardRef,
    PropsWithChildren,
    ReactNode,
    useEffect,
    useId,
    useImperativeHandle,
    useRef,
    useState
} from "react";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {FormViewErrorType, FormViewType} from "@src/type/FormViewType.tsx";
import {convertFormDataToObject, Method, RequestBodyType} from "@dakataa/requester";
import Button from "@src/component/Button.tsx";
import {UseDataProvider} from "@src/context/GetData.tsx";
import {default as T} from "@src/component/Translation.tsx";
import {ExceptionType} from "@src/type/ExceptionType.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import FormRest from "@src/component/crud/form/FormRest.tsx";
import FormRestError from "@src/component/crud/form/FormRestError.tsx";
import {UseFormGroup} from "@src/component/crud/form/FormGroup.tsx";
import {AsTemplate, Block} from "@src/component/templating/Template.tsx";
import {Preloader, UsePreloaderProvider} from "@src/component/Preloader.tsx";

export type ModifyFormRefType = {
    getFormRef: () => FormRef | null
};

export type FormViewContextType = {
    form: FormViewType,
    setValue?: (name: string, value: string) => void,
    setValues?: (data: { [key: string]: string }) => void,
    setRendered?: (e: FormViewType, id: string) => void,
    unsetRendered?: (e: FormViewType, id: string) => void,
    canRender?: (e: FormViewType, id: string) => boolean,
    getElements?: () => { [key: string]: string },
    allowDuplicates?: boolean,
    getParentViewContext: () => FormViewContextType | null,
    getRootViewContext: () => FormViewContextType,
    setRenderedError: (name: string) => void;
    isRenderedError: (name: string) => boolean;
    getRenderedErrors: () => string[];
}

const FormViewContext = React.createContext<FormViewContextType | undefined>(undefined);

export const FormViewProvider = ({view, allowDuplicates, children}: PropsWithChildren & {
    view: FormViewType,
    allowDuplicates?: boolean
}) => {
    const parentFormViewContext = UseParentFormView();
    const {
        form: parentFormView,
        getParentViewContext,
        getElements,
        allowDuplicates: parentAllowDuplicates,
        unsetRendered: parentUnsetRendered
    } = parentFormViewContext || {};

    const renderedFormElements = useRef<{ [key: string]: string }>(getElements?.() || {});
    const renderedErrors = useRef<string[]>([]);
    const [, formRef] = UseForm();
    const formGroup = UseFormGroup();

    const setValue = (name: string | null, value: string | string[]) => {
        const childView = name ? name.split('.').reduce((result: FormViewType | null, v: string) => {
            return result?.children?.[v] || null;
        }, view) : view;

        if (!childView) {
            return;
        }

        childView.data = value;

        formRef.current?.setValue(childView.full_name, value)
    };

    const getRootViewContext = () => {
        return parentFormViewContext?.getRootViewContext() || parentFormViewContext || context;
    };

    const context = {
        form: view,
        setRendered: (e: FormViewType, id: string) => {
            if (e.full_name && renderedFormElements.current[e.full_name] === undefined) {
                renderedFormElements.current[e.full_name] = id;
                // console.log('set', e.full_name, id, renderedFormElements.current);
            }
        },
        unsetRendered: (e: FormViewType, id: string) => {
            if (e.full_name && renderedFormElements.current[e.full_name] === id) {
                delete renderedFormElements.current[e.full_name];
                // console.log('unset', e.full_name, id, renderedFormElements.current);
            }

            parentUnsetRendered?.(e, id);
        },
        canRender: (e: FormViewType, id: string) => {
            if (allowDuplicates) {
                return true;
            }
            // console.log('can', e.full_name, parentFormViewContext?.form.full_name, id, can);
            return formGroup?.view.full_name === e.full_name || parentFormViewContext?.form.full_name === e.full_name || Object.values(renderedFormElements.current).includes(id);
        },
        setValue,
        setValues: (data: { [key: string]: string }) => {
            Object.keys(data).map(k => setValue(k, data[k]));
        },
        getElements: () => renderedFormElements.current,
        allowDuplicates,
        getParentViewContext: () => {
            return parentFormViewContext || null;
        },
        getRootViewContext,
        setRenderedError: (name: string) => {
            if (!renderedErrors.current.includes(name)) {
                renderedErrors.current.push(name);
            }
        },
        isRenderedError: (name: string) => {
            return renderedErrors.current.includes(name);
        },
        getRenderedErrors: () => {
            return renderedErrors.current;
        }
    };

    return (
        <FormViewContext.Provider value={context}>
            <FormRenderer>
                {children}
            </FormRenderer>
        </FormViewContext.Provider>
    );
}

const FormRenderer = ({children}: PropsWithChildren) => {
    const uniqueId = useId();
    const [id, setId] = useState<string|null>(null)
    const {form: view, unsetRendered, setRendered, canRender} = UseFormView();
    const randomId = function(length = 6) {
        return Math.random().toString(36).substring(2, length+2);
    };


    useEffect(() => {
        setRendered?.(view, uniqueId);
        setId(uniqueId);

        return () => {
            unsetRendered?.(view, uniqueId);
            setId(null);
        }
    }, []);

    if (!id || !canRender?.(view, id)) {
        return <></>;
    }

    return <>{children}</>;
}

export function UseFormView(): FormViewContextType {
    const context = React.useContext<FormViewContextType | undefined>(FormViewContext);
    if (!context) {
        throw new Error('UseFormView must be used within a FormViewProvider.');
    }

    return context;
}

export function UseParentFormView(): FormViewContextType | undefined {
    return React.useContext<FormViewContextType | undefined>(FormViewContext);
}

const Form = AsTemplate(forwardRef(({onSuccess, onError, onLoad, embedded = false}: {
    onSuccess?: (data: any) => Promise<void>;
    onError?: (data: ExceptionType) => void;
    onLoad?: () => void;
    embedded?: boolean;
    children?: ReactNode;
}, ref) => {
    const {navigate, generateLink, generateActionLink} = UseActions();
    const {action, setAction, refresh} = UseCurrentAction();

    const actionURL = generateActionLink(action);
    const [data, setData] = useState<ModifyType | null>(null)
    const formRef = useRef<FormRef | undefined>(undefined);
    const dataProvider = UseDataProvider();

    const {startLoading, stopLoading} = UsePreloaderProvider() || {};
    const preloaderTimeout = useRef<number | null>(null);
    const [formData, setFormData] = useState<FormData|null>(null);

    useImperativeHandle(ref, () => ({
        getFormRef: (): FormRef | undefined => formRef.current
    }));

    const getFormErrors = (view: FormViewType): { [key: string]: FormViewErrorType[] } => {
        let result = (view.errors || []).reduce((errors: { [key: string]: FormViewErrorType[] }, error) => {
            const origin = error.origin || view.full_name || '';
            return {...errors, [origin]: [...(errors[origin] || []), error]};
        }, {});


        for (let [, child] of Object.entries(view?.children || [])) {
            result = {...result, ...getFormErrors(child)};
        }

        return result;
    };

    const onSubmit = (formData: FormData) => {
        startLoading?.(formView?.full_name || 'form');
        preloaderTimeout.current = setTimeout(() => stopLoading?.(formView?.full_name || 'form'), 250);
        formData.append('_ts', Date.now().toString());

        setFormData(formData);
    }

    useEffect(() => {
        if(!formData) {
            return;
        }

        preloaderTimeout.current && clearTimeout(preloaderTimeout.current);

        setAction({
            ...action,
            method: Method.POST,
            body: formData,
            bodyType: RequestBodyType.FormData
        })
    }, [formData ? JSON.stringify(convertFormDataToObject(formData)) : null]);

    useEffect(() => {
        if (onLoad) {
            onLoad();
        }
    }, []);

    useEffect(() => {
        const formView = dataProvider?.results?.form?.modify?.view;
        if (!formView) {
            return;
        }

        const data = dataProvider.results;
        const errors = getFormErrors(formView);

        setData(data);
        stopLoading?.(formView?.full_name || 'form');
        formRef.current?.setErrors(errors);


        if (!formView.submitted || dataProvider?.status !== 200 || Object.entries(errors).length) {
            return;
        }

        // If try to re-draw the submitted form without form data.
        if(!formData) {
            refresh();
            return;
        }

        formRef.current?.success();

        const doAfter = () => {
            if (data.redirect && !embedded) {
                navigate(generateLink(data.redirect.route, {...(action.parameters || {}), ...data.redirect.parameters}), true);
            }
        }

        if (onSuccess) {
            const onSuccessReturn = onSuccess(data);
            if(onSuccessReturn instanceof Promise) {
                onSuccessReturn.then(() => doAfter());
            } else {
                doAfter();
            }
        } else {
            doAfter();
        }

    }, [dataProvider?.results])

    const formView = data?.form?.modify?.view;

    if (!formView) {
        return;
    }

    return (
        <Preloader loader={formView.full_name}>
            <BaseForm
                ref={formRef}
                id={formView.id || 'form'}
                name={formView.name || 'form'}
                action={actionURL}
                method={"POST"}
                onSubmit={onSubmit}
            >
                <FormViewProvider view={formView}>
                    <Block name={"content"}>
                        <DynamicView
                            key={formView.id || 'form'}
                            view={formView.name || 'form'}
                            prefix={"modify/form"}
                            data={formView}
                        >
                            <Block name={"messages"}>
                                {Object.keys(data?.messages || {}).map((messageType, index) => (
                                    <div key={"alert-" + messageType}
                                         className={['alert', 'alert-' + messageType].join(' ')}>
                                        {(data?.messages[messageType] || ['Item was saved successful.']).join(' ')}
                                    </div>
                                ))}
                            </Block>

                            <FormRestError className={"alert alert-danger"}/>
                            <FormRest/>

                            <Block name={"actions"}>
                                <Button type={"submit"} className={"btn btn-primary"}><T>Save</T></Button>
                            </Block>
                        </DynamicView>
                    </Block>
                </FormViewProvider>
            </BaseForm>
        </Preloader>
    )
}), {name: 'form'});

export default Form;
