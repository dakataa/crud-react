import React, {PropsWithChildren, RefObject, useEffect, useRef, useState} from "react";
import BaseButtonContent, {ButtonContentProps} from "./BaseButtonContent.tsx";
import {UsePreloader, UsePreloaderProvider} from "@crud-react/component/Preloader.tsx";

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
    const internalButtonRef = useRef<HTMLButtonElement>(null);
    const buttonRef = ref ?? internalButtonRef;
    const [disabled, setDisabled] = useState(autoDisableOnInvalid || false);
    const isSubmitButton = type && type === "submit";
    const [connectedForm, setConnectedForm] = useState<HTMLFormElement | null>();

    preload = preload || (isSubmitButton && isLoading?.(loader));

    useEffect(() => {
        if (!autoDisableOnInvalid || !isSubmitButton) {
            setDisabled(false);
            return;
        }

        if (!connectedForm) {
            return;
        }

        const fieldsetEl = buttonRef.current?.closest('fieldset') || connectedForm;
        const onChange = () => {
            if (!buttonRef.current) {
                return;
            }

            setDisabled(!connectedForm?.checkValidity() || false);
        }

        const observerSelector = "input, select, textarea";
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation)  => {
                [...mutation.addedNodes, ...mutation.removedNodes, mutation.target].forEach((node: Node) => {
                    if (!(node instanceof Element)) {
                        return;
                    }

                    if (node.matches(observerSelector) || node.querySelector(observerSelector)) {
                        onChange();
                    }
                });
            });
        });

        fieldsetEl.addEventListener('input', onChange)

        observer.observe(connectedForm, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["hidden", "style", "class"]
        });

        onChange();

        return () => {
            observer.disconnect();
            fieldsetEl.removeEventListener('input', onChange);
        }

    }, [connectedForm, autoDisableOnInvalid, isSubmitButton]);

    useEffect(() => {
        if (!autoDisableOnInvalid || !isSubmitButton) {
            return;
        }

        if (!buttonRef.current) {
            return;
        }

        const currentForm =
            buttonRef.current.form ??
            buttonRef.current.closest('form');

        if (currentForm) {
            setConnectedForm(currentForm);
            return;
        }

        const documentObserver = new MutationObserver(() => {
            const currentForm = buttonRef.current?.form;

            if (!currentForm) {
                return;
            }

            documentObserver.disconnect();

            setConnectedForm(currentForm);
        });

        documentObserver.observe(buttonRef.current.ownerDocument.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            documentObserver.disconnect();
        }
    }, [form, isSubmitButton, autoDisableOnInvalid])

    return (
        <button {...props} form={form} type={type} disabled={props.disabled ?? Boolean(preload || disabled)}  ref={buttonRef}>
            <BaseButtonContent preload={preload} {...props}>{children}</BaseButtonContent>
        </button>
    );
}
