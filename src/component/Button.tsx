import React, {ForwardedRef, forwardRef, PropsWithChildren} from "react";
import BaseButtonContent, {ButtonContentProps} from "./BaseButtonContent.tsx";
import {UsePreloader, UsePreloaderProvider} from "@src/component/Preloader.tsx";

export default forwardRef((
    {
        children,
        type,
        ...props
    }: ButtonContentProps & PropsWithChildren & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ref: ForwardedRef<HTMLButtonElement>) => {

    const {isLoading} = UsePreloaderProvider() || {};
    const loader = UsePreloader();
    const preload = type === 'submit' && isLoading?.(loader || 'form');

    return (
        <button {...{disabled: preload}} {...props} ref={ref}>
            <BaseButtonContent preload={preload} {...props}>{children}</BaseButtonContent>
        </button>
    );
})
