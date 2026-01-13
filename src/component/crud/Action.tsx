import React, {ReactNode} from "react";
import Link from "@src/component/Link.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {UseList} from "@src/context/ListContext.tsx";
import {OnClickAction} from "@src/type/OnClickAction.tsx";
import Translation from "@src/component/Translation.tsx";

const Action = ({children, action, className}: {
    action: OnClickAction;
    className?: string;
    children?: ReactNode;
}) => {
    const {generateActionLink} = UseActions();
    const {onClick} = UseList();

    return <Link
        onClick={(event) => {
            onClick && onClick(action, event)
        }}
        className={className}
        to={generateActionLink(action)}
    >
        {children ?? <Translation>{action.action.title ?? action.action.name}</Translation>}
    </Link>
}

export default Action;
