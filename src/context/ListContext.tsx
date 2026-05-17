import React, {PropsWithChildren, SyntheticEvent} from "react";
import {ListType} from "@src/type/ListType.tsx";
import {OnClickAction} from "@src/type/OnClickAction.tsx";
import {ActionType, ActionVisibility} from "@src/type/ActionType.tsx";
import {GetDataType, UseDataProvider} from "@src/context/GetData.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {UseModal} from "@src/context/ModalContext.tsx";
import {Icon, Result, UseAlert} from "@src/context/AlertContext.tsx";
import {objectRemoveEmpty} from "@src/helper/ObjectUtils.tsx";
import {CrudRequester} from "@src/Crud.tsx";
import {Method, RequestBodyType} from "@dakataa/requester";
import {ColumnType} from "@src/type/ColumnType.tsx";

export type ListContextPropsType = {
    embedded?: boolean;
    onClick?: (props: OnClickAction, event?: SyntheticEvent) => void;
}

const ListItemContext = React.createContext<ListContextPropsType | undefined>(undefined);

export function UseList() {
    const context = React.useContext<ListContextPropsType | undefined>(ListItemContext);
    if (context === undefined) {
        throw new Error("UseList must be within ListProvider")
    }

    const dataProvider = UseDataProvider() as GetDataType & { response: ListType };
    if (!dataProvider) {
        throw new Error("No Data provided. Use DataProvider.");
    }

    const {results: data, refresh} = dataProvider;

    const {action, setAction} = UseCurrentAction();
    const {generateActionLink, location, navigate} = UseActions()
    const {openModal} = UseModal();
    const {open: openAlert} = UseAlert();

    const {embedded, onClick: onAction} = context;
    const primaryColumn = data?.entity?.primaryColumn;
    const columns = (data?.entity?.columns || []).filter((c: ColumnType) => c.visible).filter((c: ColumnType) => c.group !== false);
    const actions = Object.values(data?.action || []) as ActionType[];
    const getActions = (visibility: ActionVisibility) => {
        return (Object.values(data?.action ?? []) as ActionType[]).filter(a => a.visibility === visibility && a.name !== action.action.name);
    }

    const getAction = (actionName: string): ActionType | undefined => {
        return (Object.values(data?.action ?? []) as ActionType[]).filter(a => a.name === actionName).shift();
    }

    const getActionOnClickAction = (actionName: string): OnClickAction | undefined => {

        const listAction = getAction(actionName);

        if(!listAction) {
            return undefined;
        }

        return {
            ...action,
            action: listAction
        }
    }

    const objectActions = actions.filter((a: ActionType) => a.visibility === ActionVisibility.Object);
    const columnsTotal = columns.length + (actions.length ? 1 : 0);
    const items = data?.entity?.data.items ?? [];

    const filterData = ({newAction, excludeFilterParameters}: {
        newAction?: OnClickAction,
        excludeFilterParameters?: [string]
    }): void => {
        const filterAction = {...(newAction ?? action)};
        excludeFilterParameters?.forEach((key) => {
            delete filterAction.query?.filter?.[key];
        })

        if (embedded) {
            setAction(filterAction);
        } else {
            const url = generateActionLink(filterAction);
            navigate(url);
        }
    }

    const handleAction = (onClickAction: OnClickAction, event?: SyntheticEvent) => {
        if (onAction?.(onClickAction, event)) {
            return;
        }

        event?.preventDefault();

        onClickAction.parameters = {...(onClickAction.parameters || {}), ...(action.parameters || {})}
        onClickAction.parameters = objectRemoveEmpty(onClickAction.parameters as object);
        if (!Object.keys(onClickAction.parameters as object).length) {
            onClickAction.parameters = undefined;
        }

        if (onClickAction.query !== undefined) {
            if (!Object.keys(onClickAction.query as object).length) {
                onClickAction.query = undefined;
            }
        }

        switch (onClickAction.action.name) {
            case 'list': {
                return filterData({newAction: onClickAction});
            }
            case 'delete': {
                openAlert({
                    title: 'Are you sure?',
                    icon: Icon.confirm,
                    onResult: (result: Result) => {
                        if (result.isConfirmed) {
                            CrudRequester().fetch({
                                url: generateActionLink(onClickAction),
                                method: Method.DELETE
                            }).catch((e: any) => {
                                console.log('error', e);
                            }).finally(() => {
                                refresh?.();
                            });
                        }
                    }
                });
                return;
            }
        }

        if (embedded) {
            openModal({
                action: onClickAction,
                props: {
                    size: 'lg',
                    onClose: () => {
                        refresh?.();
                    }
                }
            });

            return;
        }

        filterData({newAction: onClickAction});
    }

    const handleBatchAction = (method: string, ids: any, data: FormData): Promise<void> => {
        return new Promise((resolve, reject) => {
            openAlert({
                title: 'Are you sure?',
                icon: Icon.confirm,
                onResult: (result: Result) => {
                    if (result.isConfirmed) {
                        CrudRequester().post({
                            url: generateActionLink(action),
                            body: data,
                            bodyType: RequestBodyType.FormData
                        }).catch((e: any) => {
                            reject();
                        }).finally(() => {
                            refresh?.();
                            resolve();
                        });
                    } else {
                        reject();
                    }
                }
            });
        });
    }


    return {
        data,
        columns,
        actions,
        objectActions,
        columnsTotal,
        primaryColumn,
        items,
        onClick: onAction,
        handleAction,
        filterData,
        getActions,
        getAction,
        getActionOnClickAction,
        handleBatchAction
    }
}

export function ListProvider({embedded, onClick, children}: ListContextPropsType & PropsWithChildren) {

    return (
        <ListItemContext.Provider value={{embedded, onClick}}>
            {children}
        </ListItemContext.Provider>
    );
}
