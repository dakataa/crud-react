import React, {MouseEvent, useEffect, useRef} from "react";
import BaseButton, {Link as LinkType} from "./BaseButton";
import {UseRouter} from "@src/context/RouterContext.tsx";
export default ({to, children, ...props}:  {to: string} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & LinkType) => {

    const {navigate} = UseRouter();
    const anchorRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const onClick = (event: Event) => {

            if(event.defaultPrevented) {
                return;
            }

            if(!anchorRef?.current?.href) {
                return;
            }

            event.preventDefault();
            navigate(anchorRef.current.href);
        };

        anchorRef?.current?.addEventListener('click', onClick);

        return () => {
            anchorRef?.current?.removeEventListener('click', onClick);
        };
    }, []);

    return (
        <a ref={anchorRef} href={to} {...props}>
            <BaseButton {...props}>{children && children}</BaseButton>
        </a>
    );
}
