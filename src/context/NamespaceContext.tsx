import React, {PropsWithChildren} from "react";

const NamespaceContext = React.createContext<string>('');

export function UseNamespace(): string {
    return React.useContext<string>(NamespaceContext);
}

export function NamespaceProvider({namespace, ...props}: { namespace: string  } & PropsWithChildren) {
    return (
        <NamespaceContext.Provider value={namespace}>
            {props.children}
        </NamespaceContext.Provider>
    );
}
