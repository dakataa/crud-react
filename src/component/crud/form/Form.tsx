import { Form as BaseForm, UseForm } from "@crud-react/component/form/Form.tsx";
import type { FormProps, FormRef, FormValue } from "@crud-react/component/form/Form.tsx";
import type { PropsWithChildren, ReactNode } from "react";
import React, {
    forwardRef,
    useEffect,
    useId,
    useImperativeHandle,
    useCallback,
    useLayoutEffect,
    useSyncExternalStore,
    useRef,
    useState
} from "react";
import type { ModifyType } from "@crud-react/type/ModifyType.tsx";
import type { FormViewType } from "@crud-react/type/FormViewType.tsx";
import { Method, RequestBodyType } from "@dakataa/requester";
import Button from "@crud-react/component/Button.tsx";
import { UseDataProvider } from "@crud-react/context/GetData.tsx";
import { default as T } from "@crud-react/component/Translation.tsx";
import type { ExceptionType } from "@crud-react/type/ExceptionType.tsx";
import { UseActions } from "@crud-react/context/ActionContext.tsx";
import { UseCurrentActionRequest } from "@crud-react/component/crud/CrudLoader.tsx";
import DynamicView from "@crud-react/component/crud/DynamicView.tsx";
import FormRest from "@crud-react/component/crud/form/FormRest.tsx";
import FormRestError from "@crud-react/component/crud/form/FormRestError.tsx";
import { UseFormGroup } from "@crud-react/component/crud/form/FormGroup.tsx";
import { AsTemplate, Block } from "@crud-react/component/templating/Template.tsx";
import { formSessionKey } from "@crud-react/component/form/formSession.ts";
import { formDefaults, formErrors } from "@crud-react/component/form/formView.ts";
import type { FormSubmission, FormSyncMode } from "@crud-react/component/form/FormStore.ts";
import { Preloader, UsePreloaderProvider } from "@crud-react/component/Preloader.tsx";
import type { PendingFormSubmission } from "./FormRequestError.tsx";
import FormRequestError from "./FormRequestError.tsx";

export type ModifyFormRefType = {
    getFormRef: () => FormRef | null;
};

export type FormViewContextType = {
    form: FormViewType;
    setValue: (name: string | null, value: FormValue) => void;
    setValues: (data: Record<string, FormValue>) => void;
    allowDuplicates?: boolean;
};

const FormViewContext = React.createContext<FormViewContextType | undefined>(undefined);

export const FormViewProvider = ({
    view,
    allowDuplicates,
    children,
    syncMode = "refresh",
    submission
}: PropsWithChildren & {
    view: FormViewType;
    allowDuplicates?: boolean;
    syncMode?: FormSyncMode;
    submission?: FormSubmission;
}) => {
    const parent = UseParentFormView();
    const { store, apiRef } = UseForm();
    const formGroup = UseFormGroup();
    const root = !parent;
    useLayoutEffect(() => {
        if (root) {
            store.reconcile(formDefaults(view, store.getInitialValue), syncMode, submission);
            store.setErrors(formErrors(view), submission, true);
            store.setSubmitting(false);
        }
    }, [store, root, view, syncMode, submission]);
    const setValue = (name: string | null, value: FormValue) => {
        const child = name
            ? name
                  .split(".")
                  .reduce<FormViewType | undefined>((node, part) => node?.children?.[part], view)
            : view;
        let fullName = child?.full_name;

        if (!fullName && view.full_name && name) {
            const childPath = name
                .split(".")
                .map((part) => {
                    return `[${part}]`;
                })
                .join("");

            fullName = view.full_name + childPath;
        }

        if (fullName) {
            apiRef.current?.setValue(fullName, value);
        }
    };

    const context: FormViewContextType = {
        form: view,
        setValue,
        setValues: (values) => {
            return Object.entries(values).forEach(([name, value]) => setValue(name, value));
        },
        allowDuplicates
    };

    return (
        <FormViewContext.Provider value={context}>
            <FormRenderer
                view={view}
                allowDuplicates={
                    !!allowDuplicates ||
                    formGroup?.view.full_name === view.full_name ||
                    parent?.form.full_name === view.full_name
                }>
                {children}
            </FormRenderer>
        </FormViewContext.Provider>
    );
};

const FormRenderer = ({
    children,
    view,
    allowDuplicates
}: PropsWithChildren & {
    view: FormViewType;
    allowDuplicates: boolean;
}) => {
    const id = useId();
    const { store } = UseForm();
    const name = view.full_name || "";
    const getOwner = useCallback(() => store.getRendering().elements[name], [store, name]);
    const owner = useSyncExternalStore(store.subscribeRendering, getOwner, getOwner);
    useLayoutEffect(() => (name ? store.registerView(name, id) : undefined), [store, name, id]);

    if (name && !allowDuplicates && owner !== id) {
        return null;
    }

    return <>{children}</>;
};

export function UseFormView(): FormViewContextType {
    const context = React.useContext<FormViewContextType | undefined>(FormViewContext);

    if (!context) {
        throw new Error("UseFormView must be used within a FormViewProvider.");
    }

    return context;
}

export function UseParentFormView(): FormViewContextType | undefined {
    return React.useContext<FormViewContextType | undefined>(FormViewContext);
}

const Form = AsTemplate(
    forwardRef(
        (
            {
                onSuccess,
                onError,
                onLoad,
                onStateChange,
                embedded = false
            }: {
                onSuccess?: (data: any) => Promise<void>;
                onError?: (data: ExceptionType) => boolean | void;
                onLoad?: () => void;
                onStateChange?: FormProps["onStateChange"];
                embedded?: boolean;
                children?: ReactNode;
            },
            ref
        ) => {
            const { navigate, generateLink, generateActionLink } = UseActions();
            const { actionRequest, setActionRequest } = UseCurrentActionRequest();

            const actionURL = generateActionLink(actionRequest);
            const sessionKey = formSessionKey(actionRequest);
            const [loaded, setLoaded] = useState<{
                data: ModifyType;
                session: string;
                mode: FormSyncMode;
                submission?: FormSubmission;
            } | null>(null);
            const data = loaded?.session === sessionKey ? loaded.data : null;
            const submitted = useRef<PendingFormSubmission | null>(null);
            const lastSubmitTime = useRef(0);
            const processedResponse = useRef<unknown>(undefined);
            const formRef = useRef<FormRef | null>(null);
            const dataProvider = UseDataProvider();

            const { startLoading, stopLoading } = UsePreloaderProvider() || {};

            useImperativeHandle(ref, () => {
                return {
                    getFormRef: (): FormRef | null => formRef.current
                };
            });

            const onSubmit = (formData: FormData, snapshot: FormSubmission) => {
                startLoading?.(formView?.full_name || "form");
                submitted.current = { session: sessionKey, snapshot };
                lastSubmitTime.current = Math.max(Date.now(), lastSubmitTime.current + 1);
                formData.set("_ts", String(lastSubmitTime.current));
                setActionRequest({
                    ...actionRequest,
                    method: Method.POST,
                    body: formData,
                    bodyType: RequestBodyType.FormData
                });
            };

            useEffect(() => {
                if (onLoad) {
                    onLoad();
                }
            }, []);

            useEffect(() => {
                const response = dataProvider?.results;
                const view = response?.form?.modify?.view;

                if (!view || processedResponse.current === response) {
                    return;
                }

                processedResponse.current = response;
                const snapshot =
                    submitted.current?.session === sessionKey
                        ? submitted.current.snapshot
                        : undefined;
                const errors = formErrors(view);
                const saved =
                    !!view.submitted && dataProvider?.status === 200 && !Object.keys(errors).length;
                let mode: FormSyncMode = "refresh";

                if (snapshot) {
                    mode = saved ? "saved" : "invalid";
                }

                setLoaded({ data: response, session: sessionKey, mode, submission: snapshot });
                stopLoading?.(view.full_name || "form");

                if (!snapshot) {
                    return;
                }

                submitted.current = null;

                if (!saved) {
                    return;
                }

                formRef.current?.success();

                const afterSuccess = () => {
                    if (response.redirect && !embedded) {
                        navigate(
                            generateLink(response.redirect.route, {
                                ...(actionRequest.parameters || {}),
                                ...response.redirect.parameters
                            }),
                            true
                        );
                    }
                };

                const result = onSuccess?.(response);

                if (result instanceof Promise) {
                    result.then(afterSuccess, () => {
                        // A rejected success callback cancels navigation.
                    });
                } else {
                    afterSuccess();
                }
            }, [dataProvider?.results, sessionKey]);

            const formView = data?.form?.modify?.view;

            if (!formView) {
                return;
            }

            const blockPrefixes = [
                (formView.name || "form") + "Field",
                ...(formView.block_prefixes || [])
            ];

            return (
                <Preloader loader={formView.full_name}>
                    <BaseForm
                        key={sessionKey}
                        ref={formRef}
                        id={formView.id || "form"}
                        name={formView.name || "form"}
                        action={actionURL}
                        method={"POST"}
                        onStateChange={onStateChange}
                        onSubmit={onSubmit}>
                        <FormRequestError
                            session={sessionKey}
                            pending={submitted}
                            loader={formView.full_name || "form"}
                            onError={onError}
                        />
                        <FormViewProvider
                            view={formView}
                            syncMode={loaded?.mode}
                            submission={loaded?.submission}>
                            <Block name={"content"}>
                                <DynamicView
                                    key={formView.id || "form"}
                                    view={blockPrefixes}
                                    prefix={"modify/form"}
                                    data={formView}>
                                    <Block name={"messages"}>
                                        {Object.keys(data?.messages || {}).map(
                                            (messageType, index) => {
                                                return (
                                                    <div
                                                        key={"alert-" + messageType}
                                                        className={[
                                                            "alert",
                                                            "alert-" + messageType
                                                        ].join(" ")}>
                                                        {(
                                                            data?.messages[messageType] || [
                                                                "Item was saved successful."
                                                            ]
                                                        ).join(" ")}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </Block>

                                    <FormRestError className={"alert alert-danger"} />
                                    <FormRest />

                                    <Block name={"actions"}>
                                        <Button type={"submit"} className={"btn btn-primary"}>
                                            <T>Save</T>
                                        </Button>
                                    </Block>
                                </DynamicView>
                            </Block>
                        </FormViewProvider>
                    </BaseForm>
                </Preloader>
            );
        }
    ),
    { name: "form" }
);

export default Form;
