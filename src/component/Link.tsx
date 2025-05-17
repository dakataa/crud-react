import React, {useEffect, useRef, useState} from "react";
import {Link as LinkType} from "./BaseButton";
import {UseActions} from "@src/context/ActionContext.tsx";
import {UseLoaderIndicator} from "@src/context/LoaderContext.tsx";

export default ({to, children, onClick, ...props}: {
    to?: string,
} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & LinkType) => {
    const {navigate} = UseActions();
    const anchorRef = useRef<HTMLAnchorElement>(null);
    const [clicked, setClicked] = useState(false);
    const {isLoading} = UseLoaderIndicator(to?.toString());

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

    return (
        <a ref={anchorRef} href={to} {...props}>
            {clicked && isLoading && (<>*</>)} {children}
        </a>
    );
}
