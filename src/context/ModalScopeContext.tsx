import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

const ModalScopeContext = createContext(false);

/** Whether this component belongs to a modal view, rather than the page behind it. */
export const useIsModal = () => useContext(ModalScopeContext);

/** @internal Establishes the scope for a modal view and its descendants. */
export const ModalScopeProvider = ({ children }: PropsWithChildren) => (
    <ModalScopeContext.Provider value={true}>{children}</ModalScopeContext.Provider>
);
