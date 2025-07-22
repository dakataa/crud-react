import React, {PropsWithChildren, ReactElement} from "react";

export type ButtonContentProps = {
    icon?: ReactElement,
    preloader?: ReactElement,
    rightIcon?: ReactElement,
    permission?: string | string[],
    preload?: boolean;
}

const BaseButtonContent = (
    {
        icon,
        preloader,
        rightIcon,
        children,
        preload = false
    }: ButtonContentProps & PropsWithChildren) => {
    return (
        <>
            {preload ? preloader || <>*</> : icon}
            {children}
            {rightIcon}
        </>
    );
}

export default BaseButtonContent;
