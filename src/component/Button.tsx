import React, {PropsWithChildren, RefObject, useEffect, useRef} from "react";
import BaseButtonContent, {ButtonContentProps} from "./BaseButtonContent.tsx";
import {UsePreloader, UsePreloaderProvider} from "@src/component/Preloader.tsx";

export default (
    {
        children,
        type,
        form,
        preload,
        autoDisableOnInvalid,
        ref,
        ...props
    }: {
        loader?: string,
        autoDisableOnInvalid?: boolean,
        ref?: RefObject<HTMLButtonElement>
    } & ButtonContentProps & PropsWithChildren & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {

    const {isLoading} = UsePreloaderProvider() || {};
    const loader = UsePreloader() || form || 'form';
    const buttonRef = ref || useRef<HTMLButtonElement>(null);

    preload = preload || (type === 'submit' && isLoading?.(loader));

    useEffect(() => {
        if(!autoDisableOnInvalid) {
            return;
        }

        const formEl = buttonRef.current?.closest('form');
        const fieldsetEl =  buttonRef.current?.closest('fieldset, form');

        const onChange = () => {
            if(!buttonRef.current) {
                return;
            }

            buttonRef.current.disabled = !formEl?.checkValidity();
        }

        fieldsetEl?.addEventListener('input', onChange)

        if(buttonRef.current) {
            buttonRef.current.disabled = true;
        }

        return () => {
            fieldsetEl?.removeEventListener('input', onChange)
        }
    }, []);

    return (
        <button {...{disabled: preload}} form={form} type={"submit"} {...props} ref={buttonRef}>
            <BaseButtonContent preload={preload} {...props}>{children}</BaseButtonContent>
        </button>
    );
}
