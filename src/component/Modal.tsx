import TemplateBlock from "@src/component/TemplateBlock.tsx";
import React, {forwardRef, KeyboardEvent, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {createPortal} from "react-dom";

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

const Modal = forwardRef(({
                              children,
                              open = false,
                              animation = Animation.fade,
                              backdrop = true,
                              keyboard = true,
                              size,
                              onClose,
                              className,
                          }: ModalType, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(open);

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

        const onAnimationStart = () => {
            modalRef.current?.addEventListener('animationend', onAnimationEnd);
        };

        const onAnimationEnd = () => {
            modalRef.current?.classList.remove(animation);
            modalRef.current?.removeEventListener('animationstart', onAnimationStart)
            modalRef.current?.removeEventListener('animationend', onAnimationEnd);
        };

        setTimeout(() => {
            modalRef.current?.classList.add(...['d-block']);
            modalBackdropRef?.current?.classList.add('show');
        }, animation ? 100 : 0);

        document.addEventListener('keydown', closeOnKeyboard);
        modalRef.current?.addEventListener('animationstart', onAnimationStart);

        return () => {
            document.removeEventListener('keydown', closeOnKeyboard)
            modalRef.current?.removeEventListener('animationstart', onAnimationStart)
            modalRef.current?.removeEventListener('animationend', onAnimationEnd)
        }
    }, [isOpen]);

    const modalRef = useRef<HTMLDivElement | null>(null);
    const modalBackdropRef = useRef<HTMLDivElement | null>(null);

    const endClosing = () => {
        setIsOpen(false);
        onClose && onClose();
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

            if (animation) {
                modalRef.current?.classList.add(...[animation, 'close']);
                modalRef.current?.removeEventListener('animationend', closeAndResolve);
                modalRef.current?.addEventListener('animationend', closeAndResolve);
            } else {
                closeAndResolve();
            }
        })

    }

    return isOpen && createPortal((
        <>
            <div ref={modalRef}
                 className={["modal", (size && "modal-" + size), animation && animation, className].filter(v => v).join(' ')}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <TemplateBlock name={"header"} content={children} data={null}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    <TemplateBlock name={"title"} content={children} data={null}>
                                        Title
                                    </TemplateBlock>
                                </h5>
                                <button onClick={startClosing} type="button" className="btn-close" aria-label="Close"/>
                            </div>
                        </TemplateBlock>
                        <div className="modal-body">
                            <TemplateBlock name={"content"} content={children} data={null}>
                                {children}
                            </TemplateBlock>
                        </div>
                        <TemplateBlock name={"footer"} content={children} data={null}>
                            <div className="modal-footer">
                                <TemplateBlock name={"actions"} content={children} data={null}>
                                    <button onClick={startClosing} type="button" className="btn btn-secondary">
                                        Close
                                    </button>
                                </TemplateBlock>
                            </div>
                        </TemplateBlock>
                    </div>
                </div>
            </div>
            {backdrop && (
                <div ref={modalBackdropRef}
                     className={["modal-backdrop", "fade", ...(animation && ['show'])].filter(v => v).join(' ')}></div>
            )}
        </>
    ), document.body);
});

export default Modal;
