import React, {ReactNode, useEffect, useRef} from "react";
import TemplateBlock from "@src/component/templating/TemplateBlock.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import Form, {ModifyFormRefType} from "@src/component/crud/form/Form.tsx";
import {ModifyType} from "@src/type/ModifyType.tsx";
import GetData from "@src/context/GetData.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import TemplateExtend from "@src/component/templating/TemplateExtend.tsx";
import Modal, {ModalRefType} from "@src/component/Modal.tsx";
import {Icon as AlertIcon, UseAlert} from "@src/context/AlertContext.tsx";
import {ExceptionType} from "@src/type/ExceptionType.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import Link from "@src/component/Link.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";

const DefaultModifyTemplate = ({action, children, routeParams, results}: {
    action: ActionType;
    children?: ReactNode;
    routeParams?: { [key: string]: any };
    results?: ModifyType;
}) => {

    const {getAction, generateLink} = UseActions();
    const listAction = getAction(action.entity, 'list', action.namespace);

    return (
        <section className="edit">
            <header>
                <h2 className="title">
                    {listAction && (
                        <Link to={generateLink(listAction.route, routeParams)}>&larr;</Link>
                    )}
                    <TemplateBlock name={"title"} content={children} data={results}/>
                </h2>
                <nav>
                    <TemplateBlock name={"navigation"} content={children} data={results}/>
                </nav>
            </header>

            <main>
                <TemplateBlock name={"content"} content={children} data={results}/>
            </main>
        </section>
    )
}

const Modify = ({children, onSuccess, modal, props}: {
    children?: ReactNode;
    onSuccess?: (event: CustomEvent, data: ModifyType) => void;
    modal?: boolean;
    props?: any;
}) => {
    const action = UseCurrentAction();
    const routeParams = {...(action.parameters || {})}
    const modifyFormRef = useRef<ModifyFormRefType>(undefined);
    const modalRef = useRef<ModalRefType>(undefined);
    const {results, setParameters, cancel}: any & { results: ModifyType } = GetData({
        entityAction: action.action,
        initParameters: routeParams
    });
    const {open: openAlert} = UseAlert();

    useEffect(() => {
        if(!results) {
            return;
        }

        modalRef.current?.open()
    }, [JSON.stringify(results)]);

    useEffect(() => {
        return () => {
            cancel()
        }
    }, []);

    const ComponentTemplate = modal ? Modal : DefaultModifyTemplate;

    return (
        <ComponentTemplate ref={modalRef} {...props} action={action} routeParams={routeParams} open={false}>
            <TemplateExtend name={"title"}>
                <TemplateBlock name={"title"} content={children} data={results}>
                    {results?.title || 'Title'}
                </TemplateBlock>
            </TemplateExtend>

            <TemplateExtend name={"navigation"}>
                <DynamicView namespace={action.action.namespace} view={"navigation"} prefix={"modify"}>
                    <TemplateBlock name={"navigation"} content={children} data={results}>
                    </TemplateBlock>
                </DynamicView>
            </TemplateExtend>

            <TemplateExtend name={"content"}>
                <DynamicView namespace={action.action.namespace} view={"content"} prefix={"modify"}>
                    <TemplateBlock name={"content"} content={children} data={results}>
                        <Form
                            ref={modifyFormRef}
                            data={results}
                            action={action.action}
                            onSuccess={(data: ModifyType) => new Promise((resolve, reject) => {
                                modalRef.current?.close();
                                const event = new CustomEvent('success', {detail: data})
                                onSuccess && onSuccess(event, data);

                                if (event.defaultPrevented) {
                                    return reject();
                                }

                                openAlert({
                                    title: 'Success',
                                    text: Object.values(data.messages?.success ?? []).join(' ') ?? 'Item was saved successful!',
                                    icon: AlertIcon.success,
                                    actions: {
                                        close: {
                                            label: 'OK'
                                        }
                                    },
                                    onResult: () => {
                                        resolve();
                                    }
                                });
                            })}
                            onError={(error: ExceptionType) => {
                                openAlert({
                                    title: error.status + ' ' + error.detail,
                                    text: error.detail,
                                    icon: AlertIcon.denied,
                                    actions: {
                                        close: {
                                            label: 'OK'
                                        }
                                    }
                                });
                            }}
                            onLoad={() => {

                            }}
                            embedded={modal}
                            parameters={routeParams}
                        >
                            {modal && <TemplateExtend name={"actions"}></TemplateExtend>}
                        </Form>
                    </TemplateBlock>
                </DynamicView>
            </TemplateExtend>
            <TemplateExtend name={"actions"}>
                <TemplateBlock name={"actions"} content={children} data={results}>
                    <button
                        type={"submit"}
                        className={"btn btn-primary"}
                        onClick={() => modifyFormRef.current?.getFormRef()?.submit()}>
                        Submit
                    </button>
                </TemplateBlock>
            </TemplateExtend>

        </ComponentTemplate>
    );
};

export default Modify;
