import {Form, FormRef} from "@src/component/form/Form.tsx";
import FormView from "@src/component/crud/FormView.tsx";
import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {generateRoute} from "@src/helper/RouterUtils.tsx";
import {FormViewType} from "@src/type/FormViewType.tsx";
import {useNavigate} from "react-router-dom";
import Requester, {RequestBodyType} from "requester";
import {ActionType} from "@src/type/ActionType.tsx";
import TemplateBlock from "@src/component/TemplateBlock.tsx";
import Button from "@src/component/Button.tsx";
import {useDataProvider} from "@src/component/hooks/GetData.tsx";

export type ModifyFormRefType = {
    getData: () => ModifyType | null;
    getFormRef: () => FormRef | null
};

const ModifyForm = forwardRef(({name, data, action, parameters, onSuccess, onError, children}: {
    name?: string,
    data?: ModifyType;
    action: ActionType;
    parameters?: { [key: string]: any };
    onSuccess?: Function;
    onError?: Function;
    children?: ReactNode;
}, ref) => {
    const [preload, setPreloader] = useState(false);
    const navigate = useNavigate();

    const actionURL = generateRoute(action.route, (parameters || {}));
    const formRef = useRef<FormRef | null>(null);

    useImperativeHandle(ref, () => ({
        getData: (): ModifyType | undefined => data,
        getFormRef: (): FormRef | null => formRef.current
    }));

    if(!data) {
        data = (useDataProvider()?.results as ModifyType);
    }

    const onSubmit = (formData: FormData) => {
        setPreloader(true);

        (new Requester()).post(actionURL, formData, RequestBodyType.FormData).then((response) => response.getData()).then(data => {

            const getFormErrors = (view: FormViewType): { [key: string]: any } => {
                let result: { [key: string]: any } = {};
                for (let [, value] of Object.entries(view?.children || [])) {
                    if (Object.values(value?.children || []).length) {
                        result = {...result, ...getFormErrors(value)};
                    } else if (value.errors?.length) {
                        result[value.full_name] = value.errors;
                    }
                }

                return result;
            };

            const errors = getFormErrors(data.form.modify.view);
            if (Object.entries(errors).length) {
                formRef.current?.setErrors(errors);
                return;
            }

            if (onSuccess) {
                onSuccess(data);
                return;
            }

            if (data.redirect) {
                navigate(generateRoute(data.redirect.route, {...(parameters || {}), ...data.redirect.parameters}));
            }

        }).catch((e: any) => {
            console.log('error', e);

            if (onError) {
                onError(data);
            }
        }).finally(() => {
            setPreloader(false);
        });
    }

    return data && (
        <>
            {Object.keys(data?.messages || {}).map((messageType, index) => (
                <div key={"alert-" + messageType} className={['alert', 'alert-' + messageType].join(' ')}>
                    {(data?.messages[messageType] || ['Item was saved successful.']).join(' ')}
                </div>
            ))}

            <Form ref={formRef} action={actionURL} method={"POST"} onSubmit={onSubmit}>
                {
                    data?.form?.modify?.view !== undefined && (
                        <FormView
                            name={name}
                            namespace={action.namespace}
                            key={data.form.modify.view.id}
                            view={data.form.modify.view}
                        />
                    )
                }
                <TemplateBlock name={"actions"} content={children} data={{formRef}}>
                    <Button type={"submit"} className={"btn btn-primary"}>Save</Button>
                </TemplateBlock>
            </Form>
        </>
    )
});

export default ModifyForm;
