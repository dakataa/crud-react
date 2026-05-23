import React, {PropsWithChildren, SyntheticEvent} from "react";
import {ListType} from "@src/type/ListType.tsx";
import {ActionRequestType} from "../type/ActionRequestType.tsx";
import {ActionType, ActionVisibility} from "@src/type/ActionType.tsx";
import {GetDataType, UseDataProvider} from "@src/context/GetData.tsx";
import {UseCurrentActionRequest} from "@src/component/crud/CrudLoader.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {UseModal} from "@src/context/ModalContext.tsx";
import {Icon, Result, UseAlert} from "@src/context/AlertContext.tsx";
import {objectRemoveEmpty} from "@src/helper/ObjectUtils.tsx";
import {CrudRequester} from "@src/Crud.tsx";
import {Method, RequestBodyType} from "@dakataa/requester";
import {ColumnType} from "@src/type/ColumnType.tsx";
import {ChoiceType, FormViewType} from "@src/type/FormViewType.tsx";

export type ListContextPropsType = {
    embedded?: boolean;
    onClick?: (props: ActionRequestType, event?: SyntheticEvent) => void;
}

const ListItemContext = React.createContext<ListContextPropsType | undefined>(undefined);

export function UseList(safe: boolean = true) {
    const context = React.useContext<ListContextPropsType | undefined>(ListItemContext);
    if (context === undefined) {
        if (safe) {
            throw new Error("UseList must be within ListProvider")
        }

        return {};
    }

    const dataProvider = UseDataProvider() as GetDataType & { response: ListType };
    if (!dataProvider) {
        throw new Error("No Data provided. Use DataProvider.");
    }

    const {results: data, refresh} = dataProvider;

    const {actionRequest: currentActionRequest, setActionRequest} = UseCurrentActionRequest();
    const {generateActionLink, navigate} = UseActions()
    const {openModal} = UseModal();
    const {open: openAlert} = UseAlert();
    const {embedded, onClick: onAction} = context;

    const primaryColumn = data?.entity?.primaryColumn;
    const columns = (data?.entity?.columns || []).filter((c: ColumnType) => c.visible).filter((c: ColumnType) => c.group !== false);
    const actions = Object.values(data?.action || []) as ActionType[];
    const getActions = (visibility: ActionVisibility) => {
        return (Object.values(data?.action ?? []) as ActionType[]).filter(a => a.visibility === visibility && a.name !== currentActionRequest.action.name);
    }

    const getAction = (actionName: string): ActionType | undefined => {
        return (Object.values(data?.action ?? []) as ActionType[]).filter(a => a.name === actionName).shift();
    }

    const getActionRequests = (visibility: ActionVisibility) => {
        return getActions(visibility).map(action => (
            {
                ...currentActionRequest,
                action
            }
        ));
    }

    const getActionRequest = (actionName: string): ActionRequestType | undefined => {
        const action = getAction(actionName);

        if (!action) {
            return undefined;
        }

        return {
            ...currentActionRequest,
            action
        }
    }

    const objectActions = actions.filter((a: ActionType) => a.visibility === ActionVisibility.Object);
    const columnsTotal = columns.length + (actions.length ? 1 : 0);
    const items = data?.entity?.data.items ?? [];

    const filterData = ({newAction, excludeFilterParameters, clear}: {
        newAction?: ActionRequestType,
        excludeFilterParameters?: [string],
        clear?: boolean
    }): void => {
        const filterAction = {...(newAction || currentActionRequest)};
        excludeFilterParameters?.forEach((key) => {
            delete filterAction.query?.filter?.[key];
        })

        if(clear) {
            delete filterAction.query?.filter;
        }

        if (embedded) {
            setActionRequest(filterAction);
        } else {
            const url = generateActionLink(filterAction);
            navigate(url);
        }
    }

    const handleAction = (actionRequest: ActionRequestType, event?: SyntheticEvent) => {
        if (onAction?.(actionRequest, event)) {
            return;
        }

        event?.preventDefault();

        actionRequest.parameters = {...(actionRequest.parameters || {}), ...(currentActionRequest.parameters || {})}
        actionRequest.parameters = objectRemoveEmpty(actionRequest.parameters as object);
        if (!Object.keys(actionRequest.parameters as object).length) {
            actionRequest.parameters = undefined;
        }

        if (actionRequest.query !== undefined) {
            if (!Object.keys(actionRequest.query as object).length) {
                actionRequest.query = undefined;
            }
        }

        switch (actionRequest.action.name) {
            case 'list': {
                return filterData({newAction: actionRequest});
            }
            case 'delete': {
                openAlert({
                    title: 'Are you sure?',
                    icon: Icon.confirm,
                    onResult: (result: Result) => {
                        if (result.isConfirmed) {
                            CrudRequester().fetch({
                                url: generateActionLink(actionRequest),
                                method: Method.DELETE
                            }).catch((e) => {
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
                action: actionRequest,
                props: {
                    size: 'lg',
                    onClose: () => {
                        refresh?.();
                    }
                }
            });

            return;
        }

        filterData({newAction: actionRequest});
    }

    const handleBatchAction = (method: string, ids: any, data: FormData): Promise<void> => {
        return new Promise((resolve, reject) => {
            openAlert({
                title: 'Are you sure?',
                icon: Icon.confirm,
                onResult: (result: Result) => {
                    if (result.isConfirmed) {
                        CrudRequester().post({
                            url: generateActionLink(currentActionRequest),
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

    const getValue = (view: FormViewType) => {
        if (view.choices !== undefined) {
            const choices = view.choices?.reduce<ChoiceType[]>((result, c) => ([...result, ...(c.choices || [c])]), []).reduce<{
                [key: string]: string
            }>((result, choice) => {
                const choiceValue = choice.value instanceof Function ? choice.value(choice) : choice.value;
                const choiceLabel = choice.label instanceof Function ? choice.label(choice) : choice.label
                return ({...result, [choiceValue]: choiceLabel})
            }, {});

            return (view.choices ? Object.values(view.data instanceof Object ? view.data : [view.data]).map((k: any) => choices[k] ?? k).join(', ') : view.data);
        } else if (view.checked !== undefined) {
            return view.checked ? 'Yes' : 'No';
        }

        return view.data;
    }

    const appliedFilters = Object.values<FormViewType>(data.form?.filter?.view?.children || [])
        .filter(item => item.data !== null)
        .map((item) => {
            return {
                label: item.label,
                value: getValue(item),
                formView: item
            };
        });


    return {
        data,
        columns,
        actions,
        objectActions,
        columnsTotal,
        primaryColumn,
        items,
        onClick: handleAction,
        handleAction,
        filterData,
        getActions,
        getAction,
        getActionRequests,
        getActionRequest,
        handleBatchAction,
        appliedFilters
    }
}

export function ListProvider({embedded, onClick, children}: ListContextPropsType & PropsWithChildren) {

    return (
        <ListItemContext.Provider value={{embedded, onClick}}>
            {children}
        </ListItemContext.Provider>
    );
}
