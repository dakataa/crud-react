import React, {PropsWithChildren} from "react";
import {UseList} from "@src/context/ListContext.tsx";

type ListItemContextType = {
    index: number;
}

const ListItemContext = React.createContext<ListItemContextType | undefined>(undefined);

export function UseListItem() {
    const context = React.useContext<ListItemContextType | undefined>(ListItemContext);
    if (context === undefined) {
        throw new Error("UseListItem must be within ListItemProvider")
    }

    const {index} = context;
    const {data, primaryColumn} = UseList();

    return {
        index,
        id: data?.entity?.data.items[index][primaryColumn?.field || ''] ?? null,
        data: data?.entity?.data.items[index] ?? null
    }
}

export function ListItemProvider({index, ...props}: { index: number } & PropsWithChildren) {
    return (
        <ListItemContext.Provider value={{index}}>
            {props.children}
        </ListItemContext.Provider>
    );
}
