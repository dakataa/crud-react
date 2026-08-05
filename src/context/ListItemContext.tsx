import React, {PropsWithChildren} from "react";

export type ListItemContextType<
    TData = Record<string, any>
> = {
    index: number;
    id?: string | number;
    data: TData;
}

const ListItemContext = React.createContext<ListItemContextType | undefined>(undefined);

export function UseListItem<
    TData = Record<string, any>
>() {
    const context = React.useContext<ListItemContextType | undefined>(ListItemContext);
    if (context === undefined) {
        throw new Error("UseListItem must be within ListItemProvider")
    }

    return context as ListItemContextType<TData>;
}

export function ListItemProvider({children, ...props}: ListItemContextType & PropsWithChildren) {
    return (
        <ListItemContext.Provider value={props}>
            {children}
        </ListItemContext.Provider>
    );
}
