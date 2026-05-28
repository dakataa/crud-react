import React, {forwardRef, KeyboardEvent, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {AsTemplate, Block} from "@src/component/templating/Template.tsx";
import {UseModal} from "@src/context/ModalContext.tsx";

export type ModalType = {
    children?: ReactNode,
    open?: boolean,
    onClose?: () => void,
    backdrop?: boolean,
    animation?: Animation | string,
    keyboard?: boolean,
    size?: 'sm' | 'lg' | 'xl' | 'auto',
    className?: string,
};

export type ModalRefType = {
    toggle: () => void;
    open: () => void;
    close: () => Promise<void>;
    isOpen: () => boolean;
};

export enum Animation {
    fade = 'fade'
}

const Modal = AsTemplate(forwardRef(({
                                         children,
                                         ...props
                                     }: ModalType, ref) => {


    const {closeModal, modal} = UseModal();
    const {
        open = true,
        animation = Animation.fade,
        backdrop = true,
        keyboard = true,
        size,
        onClose,
        className
    } = {...props, ...modal?.props || {}};
    const modalRef = useRef<HTMLDivElement | null>(null);
    const modalBackdropRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(open);
    let isShown = false;

    useImperativeHandle(ref, () => ({
        toggle: () => setIsOpen(!isOpen),
        open: () => setIsOpen(true),
        close: () => startClosing(),
        isOpen: () => isOpen,
    }));

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const closeOnKeyboard = (ev: any & KeyboardEvent<Window>): any => {
        if (!keyboard) {
            return;
        }

        switch (ev.key) {
            case 'Escape': {
                startClosing();
                break;
            }
        }
    };

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const modalElement = modalRef.current as HTMLDivElement;
        if(!modalElement) {
            return;
        }

        const onAnimationStart = () => {
            modalElement.addEventListener('animationend', onAnimationEnd);
        };

        const onAnimationEnd = () => {
            modalElement.classList.remove(animation);
            modalElement.removeEventListener('animationstart', onAnimationStart)
            modalElement.removeEventListener('animationend', onAnimationEnd);
        };

        setTimeout(() => {
            modalElement.classList.add(...['d-block', 'show']);
            modalBackdropRef?.current?.classList.add('show');
            isShown = true;
        }, animation ? 100 : 0);

        document.addEventListener('keydown', closeOnKeyboard);
        modalElement.addEventListener('animationstart', onAnimationStart);

        return () => {
            document.removeEventListener('keydown', closeOnKeyboard)
            modalElement.removeEventListener('animationstart', onAnimationStart)
            modalElement.removeEventListener('animationend', onAnimationEnd);
        }
    }, [isOpen]);

    useEffect(() => {
        return () => {
            if(isShown) {
                onClose && onClose();
            }
        }
    }, []);

    const endClosing = () => {
        setIsOpen(false);

        closeModal?.();
    }
    const startClosing = (): Promise<void> => {
        return new Promise((resolve: Function, reject: Function) => {
            if (!isOpen) {
                return resolve();
            }

            const closeAndResolve = () => {
                modalRef?.current?.classList.remove(...['show', 'd-block']);
                resolve();
                endClosing();
            };


            modalRef.current?.classList.add('close');

            if (animation) {
                const closeTimeout = setTimeout(() => {
                    closeAndResolve();
                }, animation ? 50 : 0);

                modalRef.current?.addEventListener('animationstart', () => {
                    clearTimeout(closeTimeout);
                    modalRef.current?.removeEventListener('animationend', closeAndResolve);
                    modalRef.current?.addEventListener('animationend', closeAndResolve);
                });

                modalRef.current?.classList.add(...[animation]);
            } else {
                closeAndResolve();
            }
        })
    }

    return createPortal((
        <>
            <div ref={modalRef}
                 className={["modal", (size && "modal-" + size), animation && animation, className].filter(v => v).join(' ')}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <Block name={"header"}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    <Block name={"title"}>
                                        Title
                                    </Block>
                                </h5>
                                <Block name={"navigation"}>
                                    <nav>{children}</nav>
                                </Block>
                                <button onClick={startClosing} type="button" className="btn-close" aria-label="Close"/>
                            </div>
                        </Block>
                        <div className="modal-body">
                            <Block name={"content"}>
                                {children}
                            </Block>
                        </div>
                        <Block name={"footer"}>
                            <div className="modal-footer">
                                <Block name={"actions"}>
                                    <button onClick={startClosing} type="button" className="btn btn-secondary">
                                        Close
                                    </button>
                                </Block>
                            </div>
                        </Block>
                    </div>
                </div>
            </div>
            {backdrop && (
                <div ref={modalBackdropRef}
                     className={["modal-backdrop", "fade", ...(animation && ['show'])].filter(v => v).join(' ')}></div>
            )}
        </>
    ), document.body);
}), {name: 'modal'});

export default Modal;
