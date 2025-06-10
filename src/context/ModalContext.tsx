import React, {PropsWithChildren, useEffect, useReducer, useRef, useState} from "react";
import {ViewLoader} from "@src/component/crud/ViewLoader.tsx";
import {OnClickAction} from "@src/component/crud/GridView.tsx";
import {ModalType} from "@src/component/Modal.tsx";
import ErrorBoundary from "@src/component/error/ErrorBoundary.tsx";
import {AlertProvider, Icon, UseAlert} from "@src/context/AlertContext.tsx";
import {CurrentActionProvider} from "@src/component/crud/CrudLoader.tsx";

export type ModalActionType = {
    action: OnClickAction;
    props?: ModalType
}

export type ModalContextType = {
    modal?: ModalActionType | null,
    setModal?: (modal: ModalActionType | null) => void;
}

const ModalContext = React.createContext<ModalContextType>({});

export function UseModal() {
    const {modal, setModal} = React.useContext<ModalContextType>(ModalContext);

    return {
        modal,
        openModal: (modal: ModalActionType) => {
            setModal && setModal(modal)
        }
    };
}

export function ModalProvider(props: PropsWithChildren) {

    const [path, dispatch] = useReducer((state: ModalActionType[], newModal: ModalActionType | null) => {
        const newState = [...state];
        if(newModal) {
            newState.push(newModal);
        } else {
            newState.pop();
        }

        return newState;
    }, [])

    const currentModal = path[path.length - 1] ?? null;

    const {open: openAlert} = UseAlert();

    const updates = useRef(0);
    useEffect(() => {
        updates.current += 1;
    }, [currentModal]);

    const modalProps = {
        ...currentModal?.props || {},
        onClose: () => {
            currentModal?.props?.onClose && currentModal.props.onClose();
            dispatch(null);
        }
    }

    return (
        <ModalContext.Provider value={{setModal: (newModal: ModalActionType | null): void => {
                dispatch(newModal);
          }}}>
            {props.children}
            {currentModal && (
                <ErrorBoundary preventDefault={true} fallback={(error) => {
                    dispatch(null);
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
                    <AlertProvider>
                        <CurrentActionProvider action={currentModal.action}>
                                <ViewLoader
                                    key={updates.current}
                                    view={currentModal.action.action.name || 'list'}
                                    props={{
                                        modal: true,
                                        props: modalProps
                                    }}
                                />
                        </CurrentActionProvider>
                    </AlertProvider>
                </ErrorBoundary>
            )}
        </ModalContext.Provider>
    );
}
