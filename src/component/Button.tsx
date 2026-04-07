import React, {PropsWithChildren, RefObject, useEffect, useRef, useState} from "react";
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
    const [disabled, setDisabled] = useState(autoDisableOnInvalid || false);

    preload = preload || (type === 'submit' && isLoading?.(loader));

    useEffect(() => {
        if (!autoDisableOnInvalid) {
            return;
        }

        const formEl = buttonRef.current?.closest('form');
        const fieldsetEl = buttonRef.current?.closest('fieldset, form');

        const onChange = () => {
            if (!buttonRef.current) {
                return;
            }

            const boundingClientRect = buttonRef.current.getBoundingClientRect();
            const isVisible = !(boundingClientRect.width === 0 && boundingClientRect.height === 0);
            if(!isVisible) {
                return;
            }

            setDisabled(!formEl?.checkValidity() || false);
        }

        fieldsetEl?.addEventListener('input', onChange)

        setTimeout(onChange, 50);

        return () => {
            fieldsetEl?.removeEventListener('input', onChange)
        }
    }, []);

    useEffect(() => {
        if (!buttonRef.current) {
            return;
        }

        buttonRef.current.disabled = preload || disabled;

    }, [preload]);

    return (
        <button form={form} type={type} disabled={disabled} {...props} ref={buttonRef}>
            <BaseButtonContent preload={preload} {...props}>{children}</BaseButtonContent>
        </button>
    );
}
