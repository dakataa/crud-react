import React, {useEffect, useRef, useState} from "react";
import BaseButtonContent, {ButtonContentProps} from "./BaseButtonContent.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {UseDataLoaderIndicator} from "@src/context/LoaderContext.tsx";

export default ({to, children, onClick, ...props}: {
    to?: string,
} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & ButtonContentProps) => {
    const {navigate, getActionByPath, generateLink} = UseActions();
    const anchorRef = useRef<HTMLAnchorElement>(null);
    const [clicked, setClicked] = useState(false);
    const {isLoading} = UseDataLoaderIndicator(to?.toString());

    const onClickEvent = (event: Event) => {
        if(isLoading) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        setClicked(true);

        if (onClick) {
            onClick(event as any);
        }

        if (event.defaultPrevented) {
            return;
        }

        if (!to) {
            return;
        }

        event.preventDefault();
        navigate(to.toString());
    };

    useEffect(() => {
        if(!clicked) {
            return;
        }

        if(!isLoading) {
            setClicked(false);
        }
    }, [isLoading]);

    useEffect(() => {
        anchorRef?.current?.addEventListener('click', onClickEvent);

        return () => {
            anchorRef?.current?.removeEventListener('click', onClickEvent);
        };
    }, [to, onClick]);

    const preload = clicked && isLoading;

    return (
        <a ref={anchorRef} href={to} {...props}>
            <BaseButtonContent preload={preload} {...props}>{children}</BaseButtonContent>
        </a>
    );
}
