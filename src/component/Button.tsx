import React, {PropsWithChildren, RefObject, useEffect, useRef, useState} from "react";
import BaseButtonContent, {ButtonContentProps} from "./BaseButtonContent.tsx";
import {UsePreloader, UsePreloaderProvider} from "@src/component/Preloader.tsx";

export type ButtonPropsType =
    {
        loader?: string,
        autoDisableOnInvalid?: boolean,
        ref?: RefObject<HTMLButtonElement>
    }
    & ButtonContentProps
    & PropsWithChildren
    & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default (
    {
        children,
        type,
        form,
        preload,
        autoDisableOnInvalid,
        ref,
        ...props
    }: ButtonPropsType) => {

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
