import {Form, FormRef} from "@src/component/form/Form.tsx";
import FormView from "@src/component/crud/FormView.tsx";
import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {generateRoute} from "@src/helper/RouterUtils.tsx";
import {FormViewType} from "@src/type/FormViewType.tsx";
import {useNavigate} from "react-router";
import {RequestBodyType} from "@dakataa/requester";
import {ActionType} from "@src/type/ActionType.tsx";
import TemplateBlock from "@src/component/TemplateBlock.tsx";
import Button from "@src/component/Button.tsx";
import {UseDataProvider} from "@src/component/hooks/GetData.tsx";
import {FormFieldError} from "@src/component/form/FormFieldError.tsx";
import {default as T} from "@src/component/Translation.tsx";
import {ExceptionType} from "@src/type/ExceptionType.tsx";
import {CrudRequester} from "@src/Crud.tsx";

export type ModifyFormRefType = {
    getData: () => ModifyType | null;
    getFormRef: () => FormRef | null
};

const ModifyForm = forwardRef(({name, data: initData, action, parameters, onSuccess, onError, onLoad, children, embedded = false}: {
    name?: string,
    data?: ModifyType;
    action: ActionType;
    parameters?: { [key: string]: any };
    onSuccess?: (data: any) => void;
    onError?: (data: ExceptionType) => void;
    onLoad?: () => void;
    children?: ReactNode;
    embedded?: boolean;
}, ref) => {
    const [preload, setPreloader] = useState(false);
    const navigate = useNavigate();
    const actionURL = generateRoute(action.route, (parameters || {}));
    const formRef = useRef<FormRef | null>(null);
    const dataProvider = UseDataProvider();
    const [data, setData] = useState<ModifyType | undefined>();

    useImperativeHandle(ref, () => ({
        getData: (): ModifyType | undefined => data,
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

        CrudRequester().post({url: actionURL, body: formData, bodyType: RequestBodyType.FormData}).then(({status, data}) => {
            if (![200, 201, 400].includes(status)) {
                return Promise.reject(data);
            }

            setData(data);

            const errors = getFormErrors(data.form.modify.view);
            if (Object.entries(errors).length) {
                formRef.current?.setErrors(errors);
                return;
            }

            if (onSuccess) {
                onSuccess(data);
            }

            if (data.redirect && !embedded) {
                navigate(generateRoute(data.redirect.route, {...(parameters || {}), ...data.redirect.parameters}));
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

    initData = (dataProvider?.results as ModifyType) ?? initData;
    useEffect(() => {
        setData(initData);
    }, [JSON.stringify(initData)])

    return data && (
        <>
            {Object.keys(data?.messages || {}).map((messageType, index) => (
                <div key={"alert-" + messageType} className={['alert', 'alert-' + messageType].join(' ')}>
                    {(data?.messages[messageType] || ['Item was saved successful.']).join(' ')}
                </div>
            ))}

            <Form id={data?.form?.modify?.view?.id} ref={formRef} action={actionURL} method={"POST"} onSubmit={onSubmit}>
                {
                    data?.form?.modify?.view !== undefined && (
                        <>
                            <FormView
                                name={name}
                                namespace={action.namespace}
                                key={data.form.modify.view.id}
                                view={data.form.modify.view}
                            />
                            <FormFieldError name={data.form.modify.view.full_name} className={"alert alert-danger"}/>
                        </>
                    )
                }
                <TemplateBlock name={"actions"} content={children} data={{formRef}}>
                    <Button type={"submit"} className={"btn btn-primary"}><T>Save</T></Button>
                </TemplateBlock>
            </Form>
        </>
    )
});

export default ModifyForm;
