import '@src/assets/style/alert.scss';
import React, {PropsWithChildren, useContext, useEffect, useRef, useState} from "react";
import Modal, {ModalRefType} from "@src/component/Modal.tsx";
import TemplateExtend from "@src/component/TemplateExtend.tsx";
import Button from "@src/component/Button.tsx";
import {default as LottieAnimation} from "@src/component/Animation.tsx";

type AlertConfigOptionalType = {
    [K in keyof AlertConfigType]?: AlertConfigType[K]
}

type AlertContextType = {
    open: (config: AlertConfigOptionalType) => void;
};

const AlertContext = React.createContext<AlertContextType | undefined>(undefined);

export enum Icon {
    success,
    denied,
    warning,
    info,
    confirm
}

export enum Animation {
    scale = 'scale',
    fade = 'fade'
}

export enum Size {
    small = 'sm',
    default = 'auto',
    large = 'lg',
    extraLarge = 'xl'
}

export type Action = {
    label: string;
    classList?: string[];
};

export type AlertConfigType = {
    title: string;
    text?: string | null;
    icon: Icon | string;
    animation: Animation | string;
    size: Size | string;
    actions?: { [key: string]: Action } | null;
    allowClose?: boolean;
    timeout?: number;
    timeoutProgress?: boolean;
    onResult?: (result: Result) => void
};

export type Result = {
    [action: string]: boolean;
    isConfirmed: boolean;
    isCancelled: boolean;
    isDenied: boolean;
}

export function UseAlert() {
    const context = React.useContext<AlertContextType | undefined>(AlertContext);
    if (context === undefined) {
        throw new Error("UseAlert must be within AlertProvider")
    }

    return context;
}

export function AlertProvider(props: PropsWithChildren) {
    const [alert, setAlert] = useState<AlertConfigType>();

    const updates = useRef(0);
    const modalRef = useRef<ModalRefType>();
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        updates.current += 1;
    }, [alert]);

    const animationFiles = import.meta.glob('@src/assets/images/alert/*');

    const open = (config?: AlertConfigOptionalType): void => {
        let alertConfig = {
            title: 'Are you confirm?',
            icon: Icon.success,
            animation: Animation.scale,
            size: Size.default,
            allowClose: false,
            timeoutProgress: false,
            ...(config || {})
        };

        const iconMap = {
            [Icon.success]: 'success.json',
            [Icon.denied]: 'denied.json',
            [Icon.warning]: 'warning.json',
            [Icon.info]: 'info.json',
            [Icon.confirm]: 'info.json',
        };

        if (Object.hasOwn(iconMap, alertConfig.icon)) {
            const iconPath = iconMap[alertConfig.icon as Icon];
            const iconFilePath = Object.keys(animationFiles).filter(k => k.endsWith(iconPath)).pop()
            if(iconFilePath) {
                animationFiles[iconFilePath]().then((module: any) => {
                    setAnimationData(module.default)
                });
            }
        }

        if (!alertConfig.actions && !alertConfig.timeoutProgress) {
            alertConfig.actions = {
                cancel: {
                    label: 'Cancel',
                    classList: ['btn-outline-primary']
                },
                confirm: {
                    label: 'Confirm',
                }
            }
        }

        if (modalRef.current?.isOpen()) {
            modalRef.current?.close().finally(() => {
                setAlert(alertConfig);
            });
        } else {
            setAlert(alertConfig);
        }
    }

    const actionHandler = (action: string) => {
        const result: Result = {
            [action]: true,
            isConfirmed: action === 'confirm',
            isCancelled: action === 'cancel',
            isDenied: action === 'deny',
        };

        alert?.onResult && alert.onResult(result);
        modalRef.current?.close().then(() => {
            setAlert(undefined);
        });
    };

    return (
        <AlertContext.Provider value={{open}}>
            {props.children}
            {alert && (
                <Modal size={alert.size as any} className={"modal-alert"} animation={alert.animation} open={true} ref={modalRef}>
                    <TemplateExtend name={"header"}/>
                    <TemplateExtend name={"footer"}/>
                    <TemplateExtend name={"content"}>
                        <div className={"d-flex flex-column align-items-center"}>
                            {animationData !== null && (
                                <LottieAnimation className={"modal-alert-icon"} animationData={animationData} />
                            )}
                            <h3 className={"modal-alert-title"}>{alert.title}</h3>
                            {alert.text?.length && (
                                <p className={"modal-alert-text"}>{alert.text}</p>
                            )}
                            {alert.actions && (
                                <div className={"d-flex justify-content-center align-items-center"}>
                                    {Object.keys(alert.actions).map((action: string) => (
                                        <Button key={action}
                                                className={"btn btn-lg mx-2 " + (alert.actions?.[action].classList ?? ["btn-primary"]).join(' ')}
                                                onClick={() => actionHandler(action)}>{(alert.actions?.[action] ?? null)?.label || action}</Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TemplateExtend>
                </Modal>
            )}
        </AlertContext.Provider>
    );
}
