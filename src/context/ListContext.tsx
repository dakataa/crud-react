import React, {PropsWithChildren} from "react";
import {ListType} from "@src/type/ListType.tsx";
import {OnClickAction} from "@src/type/OnClickAction.tsx";
import {ActionVisibility} from "@src/type/ActionType.tsx";
import {UseDataProvider} from "@src/context/GetData.tsx";

export type ListContextType = {
    data?: ListType;
    onClick?: (props: OnClickAction, event: React.MouseEvent) => void;
}

const ListItemContext = React.createContext<ListContextType | undefined>(undefined);

export function UseList() {
    const context = React.useContext<ListContextType | undefined>(ListItemContext);
    if(context === undefined) {
        throw new Error("UseList must be within ListProvider")
    }

    const {data, onClick} = context;
    const primaryColumn = data?.entity?.primaryColumn;
    const columns = (data?.entity?.columns || []).filter(c => c.visible).filter(c => c.group !== false);
    const actions = Object.values(data?.action || []);
    const objectActions = actions.filter(a => a.visibility === ActionVisibility.Object);
    const columnsTotal = columns.length + (actions.length ? 1 : 0);
    const items = data?.entity?.data.items ?? [];

    return {
        data,
        columns,
        actions,
        objectActions,
        columnsTotal,
        primaryColumn,
        items,
        onClick
    }
}

export function ListProvider({data, onClick, ...props}: ListContextType & PropsWithChildren) {
    const {results} = UseDataProvider() || {};
    data ??= results;

    return (
        <ListItemContext.Provider value={{data, onClick}}>
            {props.children}
        </ListItemContext.Provider>
    );
}
