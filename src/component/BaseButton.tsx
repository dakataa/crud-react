import React from "react";

export type Link = {
    icon?: any;
    rightIcon?: any,
    textClassName?: string,
    permission?: string | string[],
    rightIconProps?: any,
    children?: any,
    preload?: boolean;
}

const BaseButton = ({icon, rightIcon, rightIconProps, children, preload = false}: Link) => {
    return (
        <>
            {/*{preload ?*/}
            {/*    <Icon {...iconProps} icon={['far', 'spinner']} spin={true} className={"icon " + (children && "me-2")}/> :*/}
            {/*    (icon && <Icon {...iconProps} icon={icon} className={"icon " + (children && "me-2")}/>)*/}
            {/*}*/}
            {children && children}
            {/*{rightIcon && <Icon className={"icon-right ms-2"} icon={rightIcon} {...rightIconProps} />}*/}
        </>
    );
}

export default BaseButton;
