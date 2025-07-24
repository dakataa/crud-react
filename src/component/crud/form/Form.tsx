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
import {RequestBodyType} from "@dakataa/requester";
import TemplateBlock from "@src/component/templating/TemplateBlock.tsx";
import Button from "@src/component/Button.tsx";
import {UseDataProvider} from "@src/context/GetData.tsx";
import {default as T} from "@src/component/Translation.tsx";
import {ExceptionType} from "@src/type/ExceptionType.tsx";
import {CrudRequester} from "@src/Crud.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import FormRest from "@src/component/crud/form/FormRest.tsx";
import FormRestError from "@src/component/crud/form/FormRestError.tsx";
import {UseFormGroup} from "@src/component/crud/form/FormGroup.tsx";
import {AsTemplate, Block, Template} from "@src/component/templating/Template.tsx";

export type ModifyFormRefType = {
    getData: () => ModifyType | null;
    getFormRef: () => FormRef | null
};

type FormViewContextType = {
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

    const setValue = (name: string, value: string | string[]) => {
        const childView = name.split('.').reduce((result: FormViewType | null, v: string) => {
            return result?.children?.[v] || null;
        }, view);

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
            }
        },
        unsetRendered: (e: FormViewType, id: string) => {
            if (e.full_name && renderedFormElements.current[e.full_name] === id) {
                delete renderedFormElements.current[e.full_name];
            }

            parentUnsetRendered?.(e, id);
        },
        canRender: (e: FormViewType, id: string) => {
            const formGroup = UseFormGroup();

            return formGroup?.view.full_name === e.full_name || getParentViewContext?.()?.form.full_name === e.full_name || Object.values(renderedFormElements.current).includes(id);
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


    useEffect(() => {
        return () => {
            renderedFormElements.current = {};
        }
    }, []);

    return (
        <FormViewContext.Provider value={context}>
            <FormRenderer>
                {children}
            </FormRenderer>
        </FormViewContext.Provider>
    );
}

const FormRenderer = ({children}: PropsWithChildren) => {
    const id = useId();
    const {form: view, unsetRendered, setRendered, canRender} = UseFormView();

    useEffect(() => {
        return () => {
            unsetRendered?.(view, id);
        }
    }, []);

    setRendered?.(view, id);
    if (false === canRender?.(view, id)) {
        return null;
    }

    return children;
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
    const [preload, setPreloader] = useState(false);
    const {navigate, generateLink, generateRoute} = UseActions();
    const currentRoute = UseCurrentAction();

    const actionURL = generateRoute(currentRoute.action.route, currentRoute.parameters);
    const [data, setData] = useState<ModifyType | null>(null)
    const formRef = useRef<FormRef | null>(null);
    const dataProvider = UseDataProvider();


    useImperativeHandle(ref, () => ({
        getData: (): ModifyType | undefined => dataProvider?.results as ModifyType,
        getFormRef: (): FormRef | null => formRef.current
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
        setPreloader(true);

        CrudRequester()
            .post({url: actionURL, body: formData, bodyType: RequestBodyType.FormData})
            .then(({status, data}) => {
                if (![200, 201, 400].includes(status)) {
                    return Promise.reject(data);
                }

                setData(data);

                const errors = getFormErrors(data.form.modify.view);
                if (Object.entries(errors).length) {
                    formRef.current?.setErrors(errors);
                    return;
                }

                const doAfter = () => {
                    if (data.redirect && !embedded) {
                        navigate(generateLink(data.redirect.route, {...(currentRoute.parameters || {}), ...data.redirect.parameters}), true);
                    }
                }

                if (onSuccess) {
                    onSuccess(data).then(() => doAfter());
                } else {
                    doAfter();
                }

            }).catch((error: ExceptionType) => {
            if (onError) {
                onError(error);
            }
        }).finally(() => {
            setPreloader(false);
        });
    }

    useEffect(() => {
        if (onLoad) {
            onLoad();
        }
    }, []);

    useEffect(() => {
        setData(dataProvider?.results);
    }, [dataProvider?.results])

    const formView = data?.form.modify.view;

    if (!formView) {
        return;
    }

    return (
        <>
            {Object.keys(data?.messages || {}).map((messageType, index) => (
                <div key={"alert-" + messageType} className={['alert', 'alert-' + messageType].join(' ')}>
                    {(data?.messages[messageType] || ['Item was saved successful.']).join(' ')}
                </div>
            ))}

            <BaseForm
                ref={formRef}
                id={formView.id || 'form'}
                name={formView.name || 'form'}
                action={actionURL}
                method={"POST"} onSubmit={onSubmit}
            >
                <FormViewProvider view={formView}>
                    <>
                        <Block name={"content"}>
                            <FormRestError className={"alert alert-danger"}/>
                            <DynamicView
                                key={formView.id || 'form'}
                                view={formView.name || 'form'}
                                prefix={"modify/form"}
                                data={formView}
                            >
                                <FormRest/>
                            </DynamicView>
                        </Block>
                        <Block name={"actions"}>
                            <Button type={"submit"} className={"btn btn-primary"}><T>Save</T></Button>
                        </Block>
                    </>
                </FormViewProvider>
            </BaseForm>
        </>
    )
}), {name: 'form'});

export default Form;
