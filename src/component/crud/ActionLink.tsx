import React, {ReactNode, SyntheticEvent} from "react";
import Link from "@src/component/Link.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {UseList} from "@src/context/ListContext.tsx";
import {ActionRequestType} from "@src/type/ActionRequestType.tsx";
import Translation from "@src/component/Translation.tsx";

const ActionLink = ({children, action, className, onClick, ...props}: {
    action: ActionRequestType;
    className?: string;
    children?: ReactNode;
    onClick?: (e: SyntheticEvent) => void;
}) => {
    const {generateActionLink} = UseActions();
    const {onClick: listOnClick} = UseList(false);

    return (
        <Link
            onClick={(event) => {
                if (onClick) {
                    onClick(event);

                    if (event?.defaultPrevented) {
                        return;
                    }
                }

                listOnClick && listOnClick(action, event)
            }}
            className={className}
            to={generateActionLink(action)}
            {...props}
        >
            {children ?? <Translation>{action.action.title ?? action.action.name}</Translation>}
        </Link>
    )
}

export default ActionLink;
