import React, {PropsWithChildren, useEffect, useRef, useState} from "react";
import {ViewLoader} from "@src/component/crud/ViewLoader.tsx";
import {OnClickAction} from "@src/component/crud/GridView.tsx";
import {ModalType} from "@src/component/Modal.tsx";
import ErrorBoundary from "@src/component/error/ErrorBoundary.tsx";
import {Icon, UseAlert} from "@src/context/AlertContext.tsx";
import {ActionProvider} from "@src/context/ActionContext.tsx";
import {CurrentActionProvider} from "@src/component/crud/CrudLoader.tsx";

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
    const {open: openAlert} = UseAlert();

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
                <ErrorBoundary preventDefault={true} fallback={(error) => {
                    setModal(null);
                    openAlert({
                        title: error?.detail ?? 'Unknown Error',
                        icon: Icon.denied,
                        actions: {
                            close: {
                                label: 'OK'
                            }
                        }
                    })
                }}>
                    <CurrentActionProvider action={modal.action}>
                        <ViewLoader
                            key={updates.current}
                            view={modal.action.action.name || 'list'}
                            namespace={modal.action.action.namespace || ''}
                            props={{
                                modal: true,
                                props: modalProps
                            }}
                        />
                    </CurrentActionProvider>
                </ErrorBoundary>
            )}
        </ModalContext.Provider>
    );
}
