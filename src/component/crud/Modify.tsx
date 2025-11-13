import React, {ComponentType, ReactNode} from "react";
import {UseActions} from "@src/context/ActionContext.tsx";
import Form from "@src/component/crud/form/Form.tsx";
import {ModifyType} from "@src/type/ModifyType.tsx";
import {UseDataProvider, WithDataProvider} from "@src/context/GetData.tsx";
import Modal from "@src/component/Modal.tsx";
import {Icon as AlertIcon, UseAlert} from "@src/context/AlertContext.tsx";
import {ExceptionType} from "@src/type/ExceptionType.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import Link from "@src/component/Link.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";
import {AsTemplate, Block, Extend} from "@src/component/templating/Template.tsx";
import Button from "@src/component/Button.tsx";
import {default as T} from "@src/component/Translation.tsx";
import {UseModal} from "@src/context/ModalContext.tsx";

const DefaultModifyTemplate = AsTemplate(({children}: {
    children?: ReactNode;
    results?: ModifyType;
}) => {
    const {action: currentAction} = UseCurrentAction();
    const {getAction, generateLink} = UseActions();
    const listAction = getAction(currentAction.action.entity, 'list', currentAction.action.namespace);

    return (
        <section className="edit">
            <header>
                <h2 className="title">
                    {listAction && (
                        <Link to={generateLink(listAction.route, currentAction.parameters)}>&larr;</Link>
                    )}
                    <Block name={"title"}/>
                </h2>
                <nav>
                    <Block name={"navigation"}/>
                </nav>
            </header>

            <main>
                <Block name={"content"}/>
                <Block name={"actions"}/>
            </main>
            {/*{children}*/}
        </section>
    )
}, {name: 'modify'});

const Modify = WithDataProvider(({template, children, onSuccess, modal, props}: {
    template?: ComponentType;
    children?: ReactNode;
    onSuccess?: (event: CustomEvent, data: ModifyType) => void;
    modal?: boolean;
    props?: any;
}) => {

    const {open: openAlert} = UseAlert();
    const {closeModal} = UseModal();
    const dataProvider = UseDataProvider();
    const ComponentTemplate = modal ? Modal : (template || DefaultModifyTemplate);

    if(!dataProvider) {
        return;
    }

    return (
        <ComponentTemplate>
            <Extend name={"title"}>
                {dataProvider?.results?.title || 'Title'}
            </Extend>

            <Extend name={"navigation"}>
                <DynamicView view={"navigation"} prefix={"modify"}/>
            </Extend>

            <Extend name={"content"}>
                <DynamicView view={"content"} prefix={"modify"}>
                    <Form
                        onSuccess={(data: ModifyType) => new Promise((resolve, reject) => {
                            closeModal();

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
                    >
                        <Extend name={"actions"}/>
                    </Form>
                </DynamicView>
            </Extend>
            <Extend name={"actions"}>
                <Button
                    type={"submit"}
                    className={"btn btn-primary"}
                    form={dataProvider?.results?.form?.modify?.view.full_name || "modify"}
                >
                    <T>Submit</T>
                </Button>
            </Extend>
            {children}
        </ComponentTemplate>
    );
});

export default Modify;
