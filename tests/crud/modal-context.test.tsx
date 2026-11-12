import type { PropsWithChildren } from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import Modal from "@crud-react/component/Modal.tsx";
import Modify from "@crud-react/component/crud/Modify.tsx";
import {
    CurrentActionCollectionProvider,
    CurrentActionRequestProvider
} from "@crud-react/component/crud/CrudLoader.tsx";
import { AsTemplate, Block, Extend } from "@crud-react/component/templating/Template.tsx";
import { ConfigProvider } from "@crud-react/context/ConfigContext.tsx";
import { DataContextProvider } from "@crud-react/context/GetData.tsx";
import { ModalProvider, UseModal } from "@crud-react/context/ModalContext.tsx";
import { ModalScopeProvider, useIsModal } from "@crud-react/context/ModalScopeContext.tsx";

vi.mock("@crud-react/context/AlertContext.tsx", () => ({
    UseAlert: () => ({ open: vi.fn() }),
    Icon: { success: "success", denied: "denied" }
}));

vi.mock("@crud-react/context/ActionContext.tsx", () => ({
    UseActions: () => ({
        getAction: (entity: string, name: string, namespace: string) => ({
            entity,
            name,
            namespace
        }),
        generateActionLink: () => "/edit",
        externalToInternalPath: (path: string) => path,
        navigate: vi.fn()
    })
}));

vi.mock("@crud-react/component/crud/form/Form.tsx", () => ({
    default: ({ embedded }: { embedded?: boolean }) => (
        <output data-testid={"form"}>{JSON.stringify({ embedded, inside: useIsModal() })}</output>
    )
}));

afterEach(cleanup);

const Probe = ({ name }: { name: string }) => (
    <output data-testid={name}>{String(useIsModal())}</output>
);

const Controls = ({ name, modal }: { name: string; modal?: boolean }) => {
    const { openModal, closeModal, modal: currentModal } = UseModal();

    return (
        <>
            <Probe name={name} />
            <output data-testid={`${name}-legacy`}>{String(modal)}</output>
            <output data-testid={`${name}-open`}>{String(Boolean(currentModal))}</output>
            <button
                onClick={() =>
                    openModal({
                        action: { action: { entity: "item", namespace: "test", name: "edit" } }
                    })
                }>
                Open first
            </button>
            <button
                onClick={() =>
                    openModal({
                        action: { action: { entity: "item", namespace: "test", name: "view" } }
                    })
                }>
                Open nested
            </button>
            <button onClick={closeModal}>Close {name}</button>
        </>
    );
};

it("scopes loaded views before their modal shell and leaves the page outside the modal stack", async () => {
    const view = render(
        <ConfigProvider
            config={{
                templates: {
                    "crud/test/Edit.tsx": async () => ({
                        default: (props: { modal?: boolean }) => (
                            <Controls name={"first"} {...props} />
                        )
                    }),
                    "crud/test/View.tsx": async () => ({
                        default: (props: { modal?: boolean }) => (
                            <Controls name={"nested"} {...props} />
                        )
                    })
                }
            }}>
            <CurrentActionCollectionProvider>
                <ModalProvider>
                    <Controls name={"page"} />
                </ModalProvider>
            </CurrentActionCollectionProvider>
        </ConfigProvider>
    );
    expect(view.getByTestId("page").textContent).toBe("false");
    fireEvent.click(view.getByText("Open first"));
    expect((await view.findByTestId("first")).textContent).toBe("true");
    expect(view.getByTestId("first-legacy").textContent).toBe("true");
    expect(view.getByTestId("page").textContent).toBe("false");
    expect(view.getByTestId("page-open").textContent).toBe("true");
    fireEvent.click(view.getAllByText("Open nested")[1]);
    expect((await view.findByTestId("nested")).textContent).toBe("true");
    expect(view.queryByTestId("first")).toBeNull();
    fireEvent.click(view.getByText("Close nested"));
    expect((await view.findByTestId("first")).textContent).toBe("true");
    fireEvent.click(view.getByText("Close first"));
    expect(view.queryByTestId("first")).toBeNull();
    expect(view.getByTestId("page").textContent).toBe("false");
    expect(view.getByTestId("page-open").textContent).toBe("false");
});

it("provides context through direct and nested modal portals without requiring ModalProvider", () => {
    const DirectContent = () => {
        const inside = useIsModal();

        return (
            <Extend name={"content"}>
                <output data-testid={"direct"}>{String(inside)}</output>
                <Modal animation={""}>
                    <Extend name={"content"}>
                        <Probe name={"nested"} />
                    </Extend>
                </Modal>
            </Extend>
        );
    };
    const view = render(
        <>
            <Probe name={"page"} />
            <Modal animation={""}>
                <DirectContent />
            </Modal>
        </>
    );
    expect(view.getByTestId("page").textContent).toBe("false");
    expect(view.getByTestId("direct").textContent).toBe("true");
    expect(view.getByTestId("nested").textContent).toBe("true");
    expect(view.container.contains(view.getByTestId("direct"))).toBe(false);
});

const PageTemplate = AsTemplate(
    () => (
        <section data-testid={"page-template"}>
            <Block name={"content"} />
        </section>
    ),
    { name: "modify" }
);

const Unscoped = ({ children }: PropsWithChildren) => children;

it.each([
    { inside: false, modal: undefined, expected: false },
    { inside: true, modal: undefined, expected: true },
    { inside: true, modal: false, expected: false },
    { inside: false, modal: true, expected: true }
])(
    "Modify respects modal context and explicit overrides ($inside, $modal)",
    async ({ inside, modal, expected }) => {
        const Scope = inside ? ModalScopeProvider : Unscoped;
        const view = render(
            <ConfigProvider config={{ templates: {} }}>
                <DataContextProvider
                    data={{
                        url: "/edit",
                        status: 200,
                        results: { form: { modify: { view: { full_name: "form" } } } },
                        refresh: vi.fn(),
                        cancel: vi.fn()
                    }}>
                    <CurrentActionCollectionProvider>
                        <CurrentActionRequestProvider
                            actionRequest={{
                                action: { entity: "item", namespace: "test", name: "edit" }
                            }}>
                            <Scope>
                                <Modify template={PageTemplate} modal={modal} />
                            </Scope>
                        </CurrentActionRequestProvider>
                    </CurrentActionCollectionProvider>
                </DataContextProvider>
            </ConfigProvider>
        );
        await waitFor(() =>
            expect(view.getByTestId("form").textContent).toBe(
                JSON.stringify({ embedded: expected, inside: inside || expected })
            )
        );
        expect(Boolean(view.queryByTestId("page-template"))).toBe(!expected);
    }
);
