import React, {memo, ReactNode, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import TemplateBlock from "@src/component/TemplateBlock.tsx";
import {useActions} from "@src/context/ActionContext.tsx";
import ModifyForm, {ModifyFormRefType} from "@src/component/ModifyForm.tsx";
import {generateRoute} from "@src/helper/RouterUtils.tsx";

const Modify = memo(({id, entity, params, children}: {
    entity?: string | null,
    id?: string | number,
    params?: { [key: string]: any },
    children?: ReactNode
}) => {

    const {getEntity, getAction, getActionByPath} = useActions();
    const action = getActionByPath(location.pathname);
    if(!action)
        throw new Error('Invalid Location Path');

    const routeParams = useParams();
    entity = entity || getEntity();
    const modifyTemplateRef = useRef<ModifyFormRefType>();
    const results = modifyTemplateRef.current?.getData();

    if (!entity) {
        throw new Error('Missing Entity.')
    }


    return (
        <section className="edit-items">
            <header>
                <div className="wrap">
                    <h2 className="title">
                        <Link to={generateRoute(getAction(entity, 'list')?.route, routeParams)}>&larr;</Link>
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
                    <ModifyForm ref={modifyTemplateRef} action={action} entity={entity} id={id} parameters={{...routeParams, ...(params ?? {})}} />
                </TemplateBlock>
            </main>
        </section>
    );
})

export default Modify;
