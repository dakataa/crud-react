import React, {ReactNode} from "react";
import {UseListItem} from "@src/context/ListItemContext.tsx";
import Link from "@src/component/Link.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {UseList} from "@src/context/ListContext.tsx";
import {ActionType} from "@src/type/ActionType.tsx";

const Action = ({children, action, className, routeParams}: {
    action: ActionType;
    routeParams?: { [key: string]: any };
    className?: string;
    children?: ReactNode;
}) => {
    const {generateLink} = UseActions();
    const {id} = UseListItem();
    const {onClick} = UseList();

    return <Link
        onClick={(event) => onClick && onClick({
            action: action,
            parameters: {
                ...(routeParams || {}),
                id: id
            }
        }, event)}
        className={className}
        to={generateLink(action.route, {
            ...(routeParams || {}),
            id: id
        })}
    >
        {children ?? action.title}
    </Link>
}

export default Action;
