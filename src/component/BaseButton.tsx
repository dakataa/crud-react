import React from "react";
import {FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import Icon, {IconDefinitionType} from "@src/component/Icon";

export type Link = {
    icon?: IconDefinitionType;
    rightIcon?: IconDefinitionType,
    textClassName?: string,
    permission?: string | string[],
    iconProps?: FontAwesomeIconProps
    rightIconProps?: any,
    children?: any,
    preload?: boolean;
}

const BaseButton = ({icon, iconProps, rightIcon, rightIconProps, children, preload = false}: Link) => {
    return (
        <>
            {preload ?
                <Icon {...iconProps} icon={['far', 'spinner']} spin={true} className={"icon " + (children && "me-2")}/> :
                (icon && <Icon {...iconProps} icon={icon} className={"icon " + (children && "me-2")}/>)
            }
            {children && children}
            {rightIcon && <Icon className={"icon-right ms-2"} icon={rightIcon} {...rightIconProps} />}
        </>
    );
}

export default BaseButton;
