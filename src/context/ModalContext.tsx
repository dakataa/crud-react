import React, {PropsWithChildren, useEffect, useRef, useState} from "react";
import {ViewLoader} from "@src/component/crud/ViewLoader.tsx";
import {OnClickAction} from "@src/component/crud/GridTable.tsx";
import {ModalType} from "@src/component/Modal.tsx";

export type ModalActionType = {
    action: OnClickAction;
    props?: ModalType
}

export type ModalContextType = {
    setModal?: (modal: ModalActionType | null) => void;
}

const ModalContext = React.createContext<ModalContextType>({});

export function UseModal() {
    const {setModal} = React.useContext<ModalContextType>(ModalContext);

    return {
        openModal: (modal: ModalActionType) => {
            setModal && setModal(modal)
        },
    };
}

export function ModalProvider(props: PropsWithChildren) {
    const [modal, setModal] = useState<ModalActionType | null>();

    const updates = useRef(0);
    useEffect(() => {
        updates.current += 1;
    }, [modal]);

    const modalProps = {
        ...modal?.props || {},
        onClose: () => {
            modal?.props?.onClose && modal.props.onClose();
            setModal(null);
        }
    }

    return (
        <ModalContext.Provider value={{setModal}}>
            {props.children}
            {modal && (
                <ViewLoader
                    key={updates.current}
                    view={modal.action.action.name || 'list'}
                    namespace={modal.action.action.namespace || ''}
                    props={{
                        action: modal.action,
                        modal: true,
                        props: modalProps
                    }}
                />
            )}
        </ModalContext.Provider>
    );
}
