import React, {ReactNode, useEffect, useRef} from "react";
import {Link, useParams} from "react-router";
import TemplateBlock from "@src/component/TemplateBlock.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import ModifyForm, {ModifyFormRefType} from "@src/component/ModifyForm.tsx";
import {ModifyType} from "@src/type/ModifyType.tsx";
import GetData from "@src/component/hooks/GetData.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import TemplateExtend from "@src/component/TemplateExtend.tsx";
import Modal, {ModalRefType} from "@src/component/Modal.tsx";
import {generateRoute} from "@src/helper/RouterUtils.tsx";
import {Icon as AlertIcon, UseAlert} from "@src/context/AlertContext.tsx";
import {ExceptionType} from "@src/type/ExceptionType.tsx";
import {OnClickAction} from "@src/component/crud/GridTableView.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";

const DefaultModifyTemplate = ({action, children, routeParams, results}: {
    action: ActionType;
    children?: ReactNode;
    routeParams?: { [key: string]: any };
    results?: ModifyType;
}) => {

    const {getAction} = UseActions();
    const listAction = getAction(action.entity, 'list', action.namespace);

    return (
        <section className="edit">
            <header>
                <h2 className="title">
                    {listAction && (
                        <Link to={generateRoute(listAction.route, routeParams)}>&larr;</Link>
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

const Modify = ({action, children, onSuccess, modal, props}: {
    action: OnClickAction;
    children?: ReactNode;
    onSuccess?: (event: CustomEvent, data: ModifyType) => void;
    modal?: boolean;
    props?: any;
}) => {
    const routeParams = {...(action.parameters || {}), ...useParams()}
    const modifyFormRef = useRef<ModifyFormRefType>(undefined);
    const modalRef = useRef<ModalRefType>(undefined);
    const {results, setParameters}: any & { results: ModifyType } = GetData({
        entityAction: action.action,
        initParameters: routeParams
    });
    const {open: openAlert} = UseAlert();

    useEffect(() => {
        setParameters(routeParams);
    }, [JSON.stringify(routeParams)]);

    useEffect(() => {
        modalRef.current?.open();
    }, [JSON.stringify(results)]);

    const ComponentTemplate = modal ? Modal : DefaultModifyTemplate;

    return (
        <ComponentTemplate ref={modalRef} {...props} action={action} routeParams={routeParams}>
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
                        <ModifyForm
                            ref={modifyFormRef}
                            data={results}
                            action={action.action}
                            onSuccess={(data: ModifyType) => {
                                modalRef.current?.close();
                                const event = new CustomEvent('success', {detail: data})
                                onSuccess && onSuccess(event, data);

                                if (event.defaultPrevented) {
                                    return;
                                }

                                openAlert({
                                    title: 'Success',
                                    text: Object.values(data.messages?.success ?? []).join(' ') ?? 'Item was saved successful!',
                                    icon: AlertIcon.success,
                                    actions: {
                                        close: {
                                            label: 'OK'
                                        }
                                    }
                                });
                            }}
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
                                console.log('loaded');
                                // modalRef.current?.open();
                            }}
                            embedded={modal}
                            parameters={routeParams}
                        >
                            {modal && <TemplateExtend name={"actions"}></TemplateExtend>}
                        </ModifyForm>
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
