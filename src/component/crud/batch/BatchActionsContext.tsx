import React, {PropsWithChildren, useRef, useState} from "react";
import {ChoiceType} from "@src/type/FormViewType.tsx";
import {UseList} from "@src/context/ListContext.tsx";

export type BatchContextType = {
    actions: {[action: string]: string}  | undefined;
    toggle: (row: number, add: boolean) => void;
    toggleAll: (selectAll: boolean) => void;
    isSelected: (row: number) => boolean;
    isSelectedAll: boolean;
    executeAction: (method: string) => void;
    selected?: any[],
    clear: () => void;
}

const BatchActionsContext = React.createContext<BatchContextType|undefined>(undefined);

export function UseBatchActions() {
    const context = React.useContext<BatchContextType|undefined>(BatchActionsContext);
    if (context === undefined) {
        throw new Error("UseBatchActions must be within BatchActionsProvider")
    }

    return context;
}

export function BatchActionsProvider({onClick, ...props}: {
    onClick: (method: string, ids: any, data: FormData) => Promise<void>;
} & PropsWithChildren) {

    const {data, items, primaryColumn} = UseList();
    const selectedIds = useRef<number[]>([]);
    const currentIds: number[] = items.map(row => (row[primaryColumn?.field || ''] || 0));
    const isSelectedAll = !!currentIds.length && currentIds.reduce<boolean>((result: boolean, id) => result && selectedIds.current.includes(id), true);
    const actions = data?.form?.batch.view.children?.method?.choices?.reduce((result, choice: ChoiceType) => {
        const label = choice.label instanceof Function ? choice.label() : choice.label;
        const method = choice.value instanceof Function ? choice.value() : choice.value?.toString();
        return {...result, [method]: label };
    }, {});

    const hasBatchActions = !!Object.keys(actions || {}).length && primaryColumn;
    const [, updateState] = useState<any>();

    const toggle = (row: number, add: boolean = false) => {
        const id = currentIds[row];
        if (add) {
            selectedIds.current.push(id);
        } else {
            selectedIds.current = selectedIds.current.filter(v => v !== id);
        }

        updateState({});
    };

    const toggleAll = (selectAll: boolean = false) => {
        selectedIds.current = (selectAll ? selectedIds.current.concat(currentIds) : selectedIds.current.filter((id) => !currentIds.includes(id))).filter((v, i, self) => self.indexOf(v) === i)
        updateState({});
    };

    const clear = () => {
        selectedIds.current = [];
        updateState({});
    }

    const isSelected = (row: number): boolean => {
        const currentId = currentIds[row];
        return selectedIds.current.includes(currentId);
    }

    const executeAction = (method: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!selectedIds) {
                return reject();
            }

            const batchFormView = data?.form.batch.view;
            if (!hasBatchActions) {
                return reject();
            }

            if (!selectedIds.current?.length) {
                return reject();
            }

            const formData = new FormData()
            selectedIds.current.forEach((value) => {
                formData.append(`${batchFormView?.children?.ids.full_name}[]`, value.toString());
            })
            formData.append(batchFormView?.children?.method.full_name || 'method', method)

            onClick(method, selectedIds.current, formData).then(() => {
                clear();
                resolve();
            }).catch(reject);
        });
    }

    return (
        <BatchActionsContext.Provider
            value={{
                actions,
                toggle,
                toggleAll,
                isSelected,
                isSelectedAll,
                executeAction,
                selected: selectedIds.current,
                clear
        }}>
            {props.children}
        </BatchActionsContext.Provider>
    );
}
