import React, {PropsWithChildren, useEffect, useReducer, useRef} from "react";
import {ViewLoader} from "@crud-react/component/crud/ViewLoader.tsx";
import {ActionRequestType} from "@crud-react/type/ActionRequestType.tsx";
import {ModalType} from "@crud-react/component/Modal.tsx";
import ErrorBoundary from "@crud-react/component/error/ErrorBoundary.tsx";
import {Icon, UseAlert} from "@crud-react/context/AlertContext.tsx";
import {CurrentActionRequestProvider} from "@crud-react/component/crud/CrudLoader.tsx";

export type ModalActionType = {
    action: ActionRequestType;
    props?: ModalType
}

export type ModalContextType = {
    modal?: ModalActionType | null,
    setModal?: (modal: ModalActionType | null) => void;
    closeModal?: () => void;
}

const ModalContext = React.createContext<ModalContextType>({});

export function UseModal() {
    const {modal, setModal} = React.useContext<ModalContextType>(ModalContext);

    return {
        modal: modal,
        openModal: (modal: ModalActionType) => {
            setModal && setModal(modal)
        },
        closeModal: () => {
            setModal?.(null)
        }
    };
}

export function ModalProvider(props: PropsWithChildren) {

    const [path, dispatch] = useReducer((state: ModalActionType[], newModal: ModalActionType | null) => {
        const newState = [...state];
        if (newModal) {
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
        ...currentModal?.props || {}
    }

    const getModalKey = (modal: ModalActionType | null): string => {
        return modal ? [
            modal.action.action.entity,
            modal.action.action.namespace,
            modal.action.action.name
        ].filter(v => v).join('-') : Date.now().toString()
    }

    const currentModalKey = getModalKey(currentModal);

    return (
        <ModalContext.Provider value={{
            modal: currentModal,
            setModal: (newModal: ModalActionType | null): void => {
                if(currentModalKey === getModalKey(newModal)) {
                    return;
                }

                dispatch(newModal);
            }
        }}>
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
                    <CurrentActionRequestProvider key={currentModalKey} actionRequest={currentModal.action}>
                        <ViewLoader
                            view={currentModal.action.action.name || 'list'}
                            props={{
                                modal: true,
                                props: modalProps
                            }}
                        />
                    </CurrentActionRequestProvider>
                </ErrorBoundary>
            )}
        </ModalContext.Provider>
    );
}
