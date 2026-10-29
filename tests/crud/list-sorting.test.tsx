import React, { createRef, useState } from "react";
import Requester from "@dakataa/requester";
import { act, cleanup, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { ConfigProvider } from "@crud-react/context/ConfigContext.tsx";
import { ActionProvider } from "@crud-react/context/ActionContext.tsx";
import CrudLoader, {
    CurrentActionCollectionProvider,
    CurrentActionRequestProvider,
    UseCurrentActionRequest
} from "@crud-react/component/crud/CrudLoader.tsx";
import type { CurrentActionRequestProviderRef } from "@crud-react/component/crud/CrudLoader.tsx";
import { ListProvider, UseList } from "@crud-react/context/ListContext.tsx";
import { DataProvider } from "@crud-react/context/GetData.tsx";
import GridView from "@crud-react/component/crud/GridView.tsx";
import List from "@crud-react/component/crud/List.tsx";
import Link from "@crud-react/component/Link.tsx";

const mocks = vi.hoisted(() => ({ fetch: vi.fn(), click: vi.fn(), embedded: false }));

vi.mock("@crud-react/Crud.tsx", () => ({
    CRUD_NAMESPACE: "sorting-test",
    CrudRequester: () => ({ fetch: mocks.fetch })
}));
vi.mock("@crud-react/component/crud/ViewLoader.tsx", () => ({
    ViewLoader: () => <TestList />
}));
vi.mock("@crud-react/component/crud/batch/BatchItemSelector.tsx", () => ({ default: () => null }));
vi.mock("@crud-react/context/ModalContext.tsx", () => ({ UseModal: () => ({}) }));
vi.mock("@crud-react/context/AlertContext.tsx", () => ({
    UseAlert: () => ({}),
    Icon: {}
}));

function TestList() {
    return <List embedded={mocks.embedded} onAction={mocks.click} title={<State />} />;
}

function State() {
    const { data } = UseList();
    const { actionRequest } = UseCurrentActionRequest();
    return (
        <>
            <output data-testid="sort">{data?.sort.date || data?.sort.name || "none"}</output>
            <output data-testid="request-sort">
                {actionRequest.query?.sort?.date || actionRequest.query?.sort?.name || "none"}
            </output>
        </>
    );
}

function PropertyTabs() {
    const [tab, setTab] = useState("summary");
    return (
        <>
            <button onClick={() => setTab(tab === "summary" ? "transactions" : "summary")}>
                Toggle tab
            </button>
            <React.Activity mode={tab === "transactions" ? "visible" : "hidden"}>
                <CurrentActionRequestProvider
                    actionRequest={{
                        action: {
                            name: "list",
                            entity: "buildingTransaction",
                            namespace: "dashboard/building/transaction"
                        },
                        parameters: { building_id: 1 },
                        query: { filter: { property_Id: 55 } }
                    }}>
                    <DataProvider>
                        <ListProvider embedded onClick={mocks.click}>
                            <GridView />
                            <State />
                        </ListProvider>
                    </DataProvider>
                </CurrentActionRequestProvider>
            </React.Activity>
        </>
    );
}

beforeEach(() => {
    mocks.fetch.mockReset();
    mocks.click.mockReset();
    window.history.replaceState(null, "", "/items");
    sessionStorage.setItem(
        "actions",
        btoa(JSON.stringify([{ name: "list", entity: "item", route: { path: "/items" } }]))
    );
    Requester.namespace ??= {};
    Requester.namespace["sorting-test"] = {};
    mocks.fetch.mockImplementation(async ({ url }: { url: string }) => {
        const parsed = new URL(url, window.location.origin);
        const field = parsed.pathname.includes("/transactions") ? "date" : "name";
        const direction = parsed.searchParams.get(`sort[${field}]`) || null;
        const names = direction === "ASC" ? ["Alpha", "Zulu"] : ["Zulu", "Alpha"];
        return {
            response: { status: 200, redirected: false },
            data: {
                entity: {
                    columns: [{ field, label: field, visible: true, sortable: true }],
                    data: { items: names.map((value) => ({ [field]: value })) }
                },
                sort: { [field]: direction }
            }
        };
    });
});
afterEach(() => {
    cleanup();
    sessionStorage.removeItem("actions");
    delete Requester.namespace["sorting-test"];
});

it.each([
    { embedded: false, strict: false },
    { embedded: true, strict: false },
    { embedded: false, strict: true },
    { embedded: true, strict: true }
])(
    "cycles sorting through repeated clicks with one request per click (embedded=$embedded, strict=$strict)",
    async ({ embedded, strict }) => {
        const user = userEvent.setup();
        mocks.embedded = embedded;
        const content = (
            <ConfigProvider config={{}}>
                <ActionProvider>
                    <CurrentActionCollectionProvider>
                        <CrudLoader />
                    </CurrentActionCollectionProvider>
                </ActionProvider>
            </ConfigProvider>
        );
        const screen = render(strict ? <React.StrictMode>{content}</React.StrictMode> : content);
        await screen.findByTestId("sort");
        const initialCalls = mocks.fetch.mock.calls.length;
        for (const [index, direction] of ["ASC", "DESC", "none", "ASC"].entries()) {
            await user.click(screen.getByRole("link"));
            await waitFor(() => expect(screen.getByTestId("sort").textContent).toBe(direction));
            const rows = Array.from(
                screen.container.querySelectorAll("tbody tr td"),
                (cell) => cell.textContent
            );
            expect(rows).toEqual(direction === "ASC" ? ["Alpha", "Zulu"] : ["Zulu", "Alpha"]);
            expect(mocks.click).toHaveBeenCalledTimes(index + 1);
            expect(mocks.fetch).toHaveBeenCalledTimes(initialCalls + index + 1);
        }
    }
);

it.each([false, true])("sorts a nested list in an Activity tab (revisit=%s)", async (revisit) => {
    const user = userEvent.setup();
    sessionStorage.setItem(
        "actions",
        btoa(
            JSON.stringify([
                { name: "view", entity: "property", route: { path: "/properties/{id}" } },
                {
                    name: "list",
                    entity: "buildingTransaction",
                    namespace: "dashboard/building/transaction",
                    route: { path: "/buildings/{building_id}/transactions" }
                }
            ])
        )
    );
    const screen = render(
        <ConfigProvider config={{}}>
            <ActionProvider>
                <CurrentActionCollectionProvider>
                    <CurrentActionRequestProvider
                        actionRequest={{
                            action: { name: "view", entity: "property" },
                            parameters: { id: 55 }
                        }}>
                        <DataProvider>
                            <PropertyTabs />
                        </DataProvider>
                    </CurrentActionRequestProvider>
                </CurrentActionCollectionProvider>
            </ActionProvider>
        </ConfigProvider>
    );
    await screen.findByRole("button", { name: "Toggle tab" });
    await user.click(screen.getByRole("button", { name: "Toggle tab" }));
    await screen.findByRole("link");
    for (const [index, direction] of ["ASC", "DESC", "none", "ASC"].entries()) {
        if (revisit && index === 1) {
            await user.click(screen.getByRole("button", { name: "Toggle tab" }));
            await user.click(screen.getByRole("button", { name: "Toggle tab" }));
            await screen.findByRole("link");
            expect(screen.getByTestId("request-sort").textContent).toBe("ASC");
        }
        const beforeClick = mocks.fetch.mock.calls.length;
        await user.click(screen.getByRole("link"));
        await waitFor(() => expect(screen.getByTestId("sort").textContent).toBe(direction));
        expect(mocks.click).toHaveBeenCalledTimes(index + 1);
        expect(mocks.fetch).toHaveBeenCalledTimes(beforeClick + 1);
        const request = mocks.fetch.mock.lastCall![0];
        const url = new URL(request.url, window.location.origin);
        expect(url.searchParams.get("filter[property_Id]")).toBe("55");
        expect(url.searchParams.get("sort[date]")).toBe(direction === "none" ? "" : direction);
        const rows = Array.from(
            screen.container.querySelectorAll("tbody tr td"),
            (cell) => cell.textContent
        );
        expect(rows).toEqual(direction === "ASC" ? ["Alpha", "Zulu"] : ["Zulu", "Alpha"]);
    }
});

it("does not keep old click handlers when an Activity hides and restores a link", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((event) => event.preventDefault());
    function Tabs() {
        const [visible, setVisible] = useState(true);
        return (
            <>
                <button onClick={() => setVisible((value) => !value)}>Toggle</button>
                <React.Activity mode={visible ? "visible" : "hidden"}>
                    <Link to="#" onClick={onClick}>
                        Sort
                    </Link>
                </React.Activity>
            </>
        );
    }
    const screen = render(
        <ConfigProvider config={{}}>
            <ActionProvider>
                <Tabs />
            </ActionProvider>
        </ConfigProvider>
    );
    const link = screen.getByRole("link");
    await user.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("link")).toBe(link);
    await user.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(2);
});

it("preserves sorting on refresh and replaces it only when incoming action props change", async () => {
    const user = userEvent.setup();
    const ref = createRef<CurrentActionRequestProviderRef>();
    const tree = (filter: string) => (
        <ConfigProvider config={{}}>
            <ActionProvider>
                <CurrentActionCollectionProvider>
                    <CurrentActionRequestProvider
                        ref={ref}
                        actionRequest={{
                            action: { name: "list", entity: "item" },
                            query: { filter: { property_Id: filter } }
                        }}>
                        <List embedded title={<State />} />
                    </CurrentActionRequestProvider>
                </CurrentActionCollectionProvider>
            </ActionProvider>
        </ConfigProvider>
    );
    const screen = render(tree("55"));
    await screen.findByRole("link");
    await user.click(screen.getByRole("link"));
    await waitFor(() => expect(screen.getByTestId("sort").textContent).toBe("ASC"));
    const beforeRerender = mocks.fetch.mock.calls.length;
    screen.rerender(tree("55"));
    expect(screen.getByTestId("request-sort").textContent).toBe("ASC");
    expect(mocks.fetch).toHaveBeenCalledTimes(beforeRerender);
    await act(async () => ref.current!.refresh());
    expect(mocks.fetch).toHaveBeenCalledTimes(beforeRerender + 1);
    const refreshed = new URL(mocks.fetch.mock.lastCall![0].url, window.location.origin);
    expect(refreshed.searchParams.get("sort[name]")).toBe("ASC");
    expect(refreshed.searchParams.get("filter[property_Id]")).toBe("55");
    expect(refreshed.searchParams.has("_ts")).toBe(true);
    screen.rerender(tree("99"));
    await waitFor(() => expect(screen.getByTestId("sort").textContent).toBe("none"));
    const changed = new URL(mocks.fetch.mock.lastCall![0].url, window.location.origin);
    expect(changed.searchParams.get("filter[property_Id]")).toBe("99");
    expect(changed.searchParams.has("sort[name]")).toBe(false);
});
