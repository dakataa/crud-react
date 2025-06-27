import {Form as BaseForm, FormRef} from "@src/component/form/Form.tsx";
import FormFieldViewLoader from "@src/component/crud/form/FormFieldViewLoader.tsx";
import React, {
    createRef,
    forwardRef,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useReducer,
    useRef,
    useState
} from "react";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {FormViewType} from "@src/type/FormViewType.tsx";
import {RequestBodyType} from "@dakataa/requester";
import TemplateBlock from "@src/component/templating/TemplateBlock.tsx";
import Button from "@src/component/Button.tsx";
import {UseDataProvider} from "@src/context/GetData.tsx";
import {default as T} from "@src/component/Translation.tsx";
import {ExceptionType} from "@src/type/ExceptionType.tsx";
import {CrudRequester} from "@src/Crud.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";
import {FormFieldError} from "@src/component/form/FormFieldError.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";

export type ModifyFormRefType = {
    getData: () => ModifyType | null;
    getFormRef: () => FormRef | null
};

type CrudFormContextType = {
    form?: FormViewType | null | undefined,
    setRendered?: (e: FormViewType, id: string) => void,
    canRender?: (e: FormViewType, id: string) => boolean
}

const CrudFormContext = React.createContext<CrudFormContextType|undefined>(undefined);

export function UseCrudForm(): CrudFormContextType|undefined {
    return React.useContext<CrudFormContextType|undefined>(CrudFormContext);
}

const Form = forwardRef(({onSuccess, onError, onLoad, children, embedded = false}: {
    onSuccess?: (data: any) => Promise<void>;
    onError?: (data: ExceptionType) => void;
    onLoad?: () => void;
    children?: ReactNode;
    embedded?: boolean;
}, ref) => {
    const [preload, setPreloader] = useState(false);
    const {navigate, generateLink, generateRoute} = UseActions();
    const currentRoute = UseCurrentAction();

    const actionURL = generateRoute(currentRoute.action.route, currentRoute.parameters);
    const [data, setData] = useState<ModifyType | null>(null)
    const formRef = useRef<FormRef | null>(null);
    const dataProvider = UseDataProvider();
    const renderedFormElements = useRef<{ [key: string]: string }>({})

    useImperativeHandle(ref, () => ({
        getData: (): ModifyType | undefined => dataProvider?.results as ModifyType,
        getFormRef: (): FormRef | null => formRef.current
    }));

    const getFormErrors = (view: FormViewType): { [key: string]: any } => {
        let result: { [key: string]: any } = {
            ...(view.errors?.length ? {[view.full_name]: view.errors} : {})
        }

        for (let [, child] of Object.entries(view?.children || [])) {
            if (child.children && Object.values(child.children).length) {
                result = {...result, ...getFormErrors(child)};
            } else if (child.errors?.length) {
                result[child.full_name] = child.errors;
            }
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

        return () => {
            renderedFormElements.current = {};
        }
    }, []);

    useEffect(() => {
        setData(dataProvider?.results);
    }, [dataProvider?.results])

    const formView = data?.form.modify.view;

    return <CrudFormContext.Provider value={{
        form: formView,
        setRendered: (e: FormViewType, id) => {
            if (renderedFormElements.current[e.full_name] === undefined) {
                renderedFormElements.current[e.full_name] = id;
            }
        },
        canRender: (e: FormViewType, id: string) => Object.values(renderedFormElements.current).includes(id)
    }}>
        {formView && (
            <>
                {Object.keys(data?.messages || {}).map((messageType, index) => (
                    <div key={"alert-" + messageType} className={['alert', 'alert-' + messageType].join(' ')}>
                        {(data?.messages[messageType] || ['Item was saved successful.']).join(' ')}
                    </div>
                ))}

                <BaseForm ref={formRef} id={formView.id} name={formView.name || 'form'} action={actionURL} method={"POST"} onSubmit={onSubmit}>
                    <DynamicView
                        key={formView.id}
                        view={formView.name || 'form'}
                        prefix={"modify/form"}
                        data={formView}
                    >
                        <FormFieldViewLoader view={formView}/>
                    </DynamicView>
                    <FormFieldError name={formView.full_name} className={"alert alert-danger"}/>
                    <TemplateBlock name={"actions"} content={children} data={{formRef}}>
                        <Button type={"submit"} className={"btn btn-primary"}><T>Save</T></Button>
                    </TemplateBlock>
                </BaseForm>
            </>
        )}
    </CrudFormContext.Provider>
});

export default Form;
