import React, {memo, ReactNode, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import TemplateBlock from "@src/component/TemplateBlock.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import ModifyForm, {ModifyFormRefType} from "@src/component/ModifyForm.tsx";
import {generateRoute} from "@src/helper/RouterUtils.tsx";
import {ModifyType} from "@src/type/ModifyType.tsx";
import GetData from "@src/component/hooks/GetData.tsx";

const Modify = memo(({children}: {
    children?: ReactNode
}) => {

    const {getAction, getActionByPath} = UseActions();
    const action = getActionByPath(location.pathname);
    if (!action)
        throw new Error('Invalid Location Path');

    const routeParams = useParams();
    const modifyTemplateRef = useRef<ModifyFormRefType>();
    const {results}: any & { results: ModifyType } = GetData({entityAction: action, initParameters: routeParams});

    return (
        <section className="edit-items">
            <header>
                <div className="wrap">
                    <h2 className="title">
                        <Link
                            to={generateRoute(getAction(action.entity, 'list', action.namespace)?.route, routeParams)}>&larr;</Link>
                        <TemplateBlock name={"title"} content={children} data={results}>
                            {results?.title || 'Title'}
                        </TemplateBlock>
                    </h2>

                    <nav className="nav">
                        <TemplateBlock name={"navigation"} content={children} data={results}/>
                    </nav>
                </div>
            </header>

            <main>
                <TemplateBlock name={"content"} content={children} data={results}>
                    <ModifyForm
                        ref={modifyTemplateRef}
                        name={"form"}
                        data={results}
                        action={action}
                        parameters={{...routeParams}}
                    />
                </TemplateBlock>
            </main>
        </section>
    );
})

export default Modify;
