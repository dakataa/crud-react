import React, {ReactNode, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import TemplateBlock from "@src/component/TemplateBlock.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import ModifyForm, {ModifyFormRefType} from "@src/component/ModifyForm.tsx";
import {ModifyType} from "@src/type/ModifyType.tsx";
import GetData from "@src/component/hooks/GetData.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import TemplateExtend from "@src/component/TemplateExtend.tsx";
import Modal, {ModalRefType} from "@src/component/Modal.tsx";
import TemplateParentBlock from "@src/component/TemplateParentBlock.tsx";

const DefaultModifyTemplate = ({children, results, ...props}: {
    children?: ReactNode;
    results?: any
}) => {
    return (
        <section className="edit">
            <header>
                <h2 className="title">
                    <TemplateBlock name={"title"} content={children} data={results}>
                        Title
                    </TemplateBlock>
                </h2>
                <nav>
                    <TemplateBlock name={"navigation"} content={children} data={results}>
                        Nav
                    </TemplateBlock>
                </nav>
            </header>

            <main>
                <TemplateBlock name={"content"} content={children} data={results}></TemplateBlock>
            </main>
        </section>
    )
}

const Modify = ({action, routeParams, children, onSuccess, modal, props}: {
    action?: ActionType;
    routeParams?: { [key: string]: any };
    children?: ReactNode;
    onSuccess?: () => void;
    modal?: boolean;
    props?: any;
}) => {
    const {getAction, getActionByPath} = UseActions();
    action = action || getActionByPath(document.location.pathname);

    if (!action)
        throw new Error('Invalid Location Path');

    routeParams = {...routeParams, ...useParams()}

    const modifyFormRef = useRef<ModifyFormRefType>();
    const modalRef = useRef<ModalRefType>();
    const {results, setParameters}: any & { results: ModifyType } = GetData({
        entityAction: action,
        initParameters: routeParams
    });

    useEffect(() => {
        setParameters(routeParams);
    }, [JSON.stringify(routeParams)]);

    useEffect(() => {
        modalRef.current?.open();
    }, [JSON.stringify(results)]);

    const ComponentTemplate = modal ? Modal : DefaultModifyTemplate;

    return (
        <ComponentTemplate ref={modalRef} {...props}>
            <TemplateExtend name={"title"}>
                <TemplateBlock name={"title"} content={children} data={results}>
                    {results?.title || 'Title'}
                </TemplateBlock>
            </TemplateExtend>

            <TemplateExtend name={"navigation"}>
                <TemplateBlock name={"navigation"} content={children} data={results}>
                </TemplateBlock>
            </TemplateExtend>

            <TemplateExtend name={"content"}>
                <TemplateBlock name={"content"} content={children} data={results}>
                    <ModifyForm
                        ref={modifyFormRef}
                        data={results}
                        action={action}
                        onSuccess={() => {
                            modalRef.current?.close();
                            onSuccess && onSuccess();
                        }}
                        onLoad={() => {
                            console.log('loaded');
                            // modalRef.current?.open();
                        }}
                        parameters={routeParams}
                    >
                        {modal &&  <TemplateExtend name={"actions"}></TemplateExtend> }
                    </ModifyForm>
                </TemplateBlock>
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
