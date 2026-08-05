import React, {PropsWithChildren} from "react";

export type ListItemContextType = {
    index: number;
    id?: string | number;
    data: Record<string, unknown>;
}

const ListItemContext = React.createContext<ListItemContextType | undefined>(undefined);

export function UseListItem() {
    const context = React.useContext<ListItemContextType | undefined>(ListItemContext);
    if (context === undefined) {
        throw new Error("UseListItem must be within ListItemProvider")
    }

    return context;
}

export function ListItemProvider({children, ...props}: ListItemContextType & PropsWithChildren) {
    return (
        <ListItemContext.Provider value={props}>
            {children}
        </ListItemContext.Provider>
    );
}
