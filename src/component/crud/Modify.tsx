import React, {ReactNode, useRef} from "react";
import TemplateBlock from "@src/component/templating/TemplateBlock.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import Form, {ModifyFormRefType} from "@src/component/crud/form/Form.tsx";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {UseDataProvider, WithDataProvider} from "@src/context/GetData.tsx";
import TemplateExtend from "@src/component/templating/TemplateExtend.tsx";
import Modal, {ModalRefType} from "@src/component/Modal.tsx";
import {Icon as AlertIcon, UseAlert} from "@src/context/AlertContext.tsx";
import {ExceptionType} from "@src/type/ExceptionType.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import Link from "@src/component/Link.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";

const DefaultModifyTemplate = ({children}: {
    children?: ReactNode;
    results?: ModifyType;
}) => {
    const currentAction = UseCurrentAction();
    const {getAction, generateLink} = UseActions();
    const listAction = getAction(currentAction.action.entity, 'list', currentAction.action.namespace);

    return (
        <section className="edit">
            <header>
                <h2 className="title">
                    {listAction && (
                        <Link to={generateLink(listAction.route, currentAction.parameters)}>&larr;</Link>
                    )}
                    <TemplateBlock name={"title"} content={children}/>
                </h2>
                <nav>
                    <TemplateBlock name={"navigation"} content={children}/>
                </nav>
            </header>

            <main>
                <TemplateBlock name={"content"} content={children}/>
                <TemplateBlock name={"actions"} content={children}/>
            </main>
        </section>
    )
}

const Modify = WithDataProvider(({children, onSuccess, modal, props}: {
    children?: ReactNode;
    onSuccess?: (event: CustomEvent, data: ModifyType) => void;
    modal?: boolean;
    props?: any;
}) => {
    const {open: openAlert} = UseAlert();
    const modifyFormRef = useRef<ModifyFormRefType>(undefined);
    const modalRef = useRef<ModalRefType>(undefined);
    const dataProvider = UseDataProvider();

    const ComponentTemplate = modal ? Modal : DefaultModifyTemplate;

    return dataProvider && (
        <ComponentTemplate ref={modalRef} {...props} open={true}>
            <TemplateExtend name={"title"}>
                <TemplateBlock name={"title"} content={children}>
                    {dataProvider?.results?.title || 'Title'}
                </TemplateBlock>
            </TemplateExtend>

            <TemplateExtend name={"navigation"}>
                <DynamicView view={"navigation"} prefix={"modify"}>
                    <TemplateBlock name={"navigation"} content={children}>
                    </TemplateBlock>
                </DynamicView>
            </TemplateExtend>

            <TemplateExtend name={"content"}>
                <DynamicView view={"content"} prefix={"modify"}>
                    <TemplateBlock name={"content"} content={children}>
                        <Form
                            ref={modifyFormRef}
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
                        />
                    </TemplateBlock>
                </DynamicView>
            </TemplateExtend>
            <TemplateExtend name={"actions"}>
                <TemplateBlock name={"actions"} content={children}>
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
});

export default Modify;
