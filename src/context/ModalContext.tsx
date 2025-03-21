import React, {PropsWithChildren, useEffect, useRef, useState} from "react";
import ViewLoader from "@src/component/ViewLoader.tsx";
import {OnClickAction} from "@src/component/crud/GridTableView.tsx";
import {ModalType} from "@src/component/Modal.tsx";
import CrudContext from "@src/CrudContext.tsx";

export type ModalActionType = {
    action: OnClickAction;
    props?: ModalType
}

export type ModalContextType = {
    setModal?: (modal: ModalActionType) => void;
}

const ModalContext = React.createContext<ModalContextType>({});

export function UseModal() {
    const {setModal} = React.useContext<ModalContextType>(ModalContext);

    return {
        openModal: (modal: ModalActionType) => {
            setModal && setModal(modal)
        }
    };
}

export function ModalProvider(props: PropsWithChildren) {
    const [modal, setModal] = useState<ModalActionType | undefined>();

    const updates = useRef(0);
    useEffect(() => {
        updates.current += 1;
    }, [modal]);

    return (
        <ModalContext.Provider value={{setModal}}>
            {props.children}
            {modal && (
                <CrudContext>
                    <ViewLoader
                        key={updates.current}
                        view={modal.action.action.name || 'list'}
                        namespace={modal.action.action.namespace || ''}
                        props={{
                            action: modal.action.action,
                            routeParams: modal.action.parameters,
                            modal: true,
                            props: modal.props
                        }}
                    />
                </CrudContext>
            )}
        </ModalContext.Provider>
    );
}
