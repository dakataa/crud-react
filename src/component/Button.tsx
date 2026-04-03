import React, {ForwardedRef, forwardRef, PropsWithChildren} from "react";
import BaseButtonContent, {ButtonContentProps} from "./BaseButtonContent.tsx";
import {UsePreloader, UsePreloaderProvider} from "@src/component/Preloader.tsx";

export default forwardRef((
    {
        children,
        type,
        form,
        preload,
        ...props
    }: {loader?: string} & ButtonContentProps & PropsWithChildren & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ref: ForwardedRef<HTMLButtonElement>) => {

    const {isLoading} = UsePreloaderProvider() || {};
    const loader = UsePreloader() || form || 'form';
    preload = preload || (type === 'submit' && isLoading?.(loader));

    return (
        <button {...{disabled: preload}} form={form} type={"submit"} {...props} ref={ref}>
            <BaseButtonContent preload={preload} {...props}>{children}</BaseButtonContent>
        </button>
    );
})
