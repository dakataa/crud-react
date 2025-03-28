import React, {useEffect, useRef} from "react";
import BaseButton, {Link as LinkType} from "./BaseButton";
import {UseActions} from "@src/context/ActionContext.tsx";

export default ({to, children, onClick, ...props}:  {to: string} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & LinkType) => {
    const {navigate} = UseActions();
    const anchorRef = useRef<HTMLAnchorElement>(null);

    const onClickEvent = (event: Event) => {
        if(onClick) {
            onClick(event as any);
        }

        if(event.defaultPrevented) {
            return;
        }

        if(!anchorRef?.current?.href) {
            return;
        }

        event.preventDefault();
        navigate(anchorRef.current.href);
    };

    useEffect(() => {
        anchorRef?.current?.addEventListener('click', onClickEvent);

        return () => {
            anchorRef?.current?.removeEventListener('click', onClickEvent);
        };
    }, [to, onClick]);

    return (
        <a ref={anchorRef} href={to} {...props}>
            <BaseButton>{children && children}</BaseButton>
        </a>
    );
}
