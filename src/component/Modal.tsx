import TemplateBlock from "@src/component/TemplateBlock.tsx";
import React, {forwardRef, KeyboardEvent, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import TemplateExtend from "@src/component/TemplateExtend.tsx";
import {createPortal} from "react-dom";

type ModalType = {
    children: ReactNode,
    open?: boolean,
    onClose?: () => void,
    backdrop?: boolean,
    fade?: boolean,
    keyboard?: boolean,
    size?: 'sm' | 'lg' | 'xl' | 'auto'
};

const Modal = forwardRef(({children, open = false, fade = false, backdrop = true, keyboard = true, size, onClose}: ModalType, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(open);

    useImperativeHandle(ref, () => ({
        toggle: () => setIsOpen(!isOpen),
        open: () => setIsOpen(true),
        close: () => startClosing()
    }));

    const closeOnKeyboard = (ev: any & KeyboardEvent<Window>): any => {
        if(!keyboard) {
            return;
        }

        switch (ev.key) {
            case 'Escape': {
                close();
                break;
            }
        }
    };

    useEffect(() => {
        if(!isOpen) {
           return;
        }

        setTimeout(() => {
            modalRef.current?.classList.add('show');
            modalBackdropRef?.current?.classList.add('show');
        }, fade ? 100 : 0);

        modalRef.current?.removeEventListener('keydown', closeOnKeyboard)
        modalRef.current?.addEventListener('keydown', closeOnKeyboard);
    }, [isOpen]);

    const modalRef = useRef<HTMLDivElement | null>(null);
    const modalBackdropRef = useRef<HTMLDivElement | null>(null);

    const endClosing = () => {
        setIsOpen(false);
        onClose && onClose();
    }
    const startClosing = () => {
        if(!isOpen) {
            return;
        }

        modalRef.current?.classList.remove('show');
        modalBackdropRef?.current?.classList.remove('show');

        if(fade) {
            modalRef.current?.removeEventListener('transitionend', endClosing);
            modalRef.current?.addEventListener('transitionend', endClosing);
        } else {
            endClosing();
        }
    }

    return isOpen && createPortal((
        <>
            <div ref={modalRef} className={["modal", (size && "modal-" + size), "d-block", (fade && "fade")].join(' ')}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                <TemplateBlock name={"title"} content={children} data={null}>
                                    Title
                                </TemplateBlock>
                            </h5>
                            <button onClick={startClosing} type="button" className="btn-close" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            {React.Children.toArray(children).filter(e => React.isValidElement(e) && e.type !== TemplateExtend)}
                        </div>
                        <div className="modal-footer">
                            <TemplateBlock name={"footer"} content={children} data={null}>
                                <button onClick={startClosing} type="button" className="btn btn-secondary">Close</button>
                            </TemplateBlock>
                        </div>
                    </div>
                </div>
            </div>
            {backdrop && (
                <div ref={modalBackdropRef} className={["modal-backdrop", fade && ["fade"]].join(' ')}></div>
            )}
        </>
    ), document.body);
});


export default Modal;
