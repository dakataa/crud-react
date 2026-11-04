import type { ActionRequestType } from "@crud-react/type/ActionRequestType.tsx";
import type { FormViewType } from "@crud-react/type/FormViewType.tsx";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import FiltersView from "@crud-react/component/crud/FiltersView.tsx";
import { ConfigProvider } from "@crud-react/context/ConfigContext.tsx";
import { ListProvider, UseList } from "@crud-react/context/ListContext.tsx";

const mocks = vi.hoisted(() => ({
    results: {} as Record<string, unknown>,
    actionRequest: {} as ActionRequestType,
    setActionRequest: vi.fn()
}));

vi.mock("@crud-react/context/GetData.tsx", () => ({
    UseDataProvider: () => ({ results: mocks.results })
}));
vi.mock("@crud-react/component/LottieAnimation.tsx", () => ({ default: () => null }));
vi.mock("lottie-web", () => ({ default: {} }));
vi.mock("@crud-react/component/crud/CrudLoader.tsx", () => ({
    UseCurrentActionRequest: () => ({
        actionRequest: mocks.actionRequest,
        setActionRequest: mocks.setActionRequest
    })
}));
vi.mock("@crud-react/context/ActionContext.tsx", () => ({
    UseActions: () => ({})
}));
vi.mock("@crud-react/context/ModalContext.tsx", () => ({
    UseModal: () => ({})
}));
vi.mock("@crud-react/context/AlertContext.tsx", async (importOriginal) => ({
    ...(await importOriginal<object>()),
    UseAlert: () => ({})
}));

beforeEach(() => {
    mocks.setActionRequest.mockReset();
    mocks.actionRequest = {
        action: { name: "list", entity: "item" },
        query: { building_id: 53, date: "2026-10" }
    };
});
afterEach(cleanup);

function Harness() {
    const { filterData, appliedFilters } = UseList();

    return (
        <>
            <FiltersView
                formView={{ type: "form" }}
                onClick={(key) => filterData?.({ excludeFilterParameters: [key] })}
            />
            <output data-testid="filter-count">{appliedFilters?.length}</output>
        </>
    );
}

const renderFilters = (children: Record<string, FormViewType>) => {
    mocks.results = { form: { filter: { view: { children } } } };

    return render(
        <ConfigProvider config={{ translate: (key) => key }}>
            <ListProvider embedded>
                <Harness />
            </ListProvider>
        </ConfigProvider>
    );
};

const propertyFilter = (data: unknown): FormViewType => ({
    type: "form",
    name: "property_id",
    label: "Property",
    data: { search: data },
    children: {
        search: {
            type: "choice",
            name: "search",
            data,
            choices: [{ label: "Floor 2", choices: [{ value: "22", label: "Residence 5" }] }]
        }
    }
});

it("renders a compound property's selected label and removes the whole filter", () => {
    mocks.actionRequest.query!.filter = {
        property_id: { search: "22" },
        contact_name: "Ivan"
    };
    const result = renderFilters({ property_id: propertyFilter("22") });

    expect(result.getByText("Residence 5")).toBeDefined();
    expect(result.getByTestId("filter-count").textContent).toBe("1");
    fireEvent.click(result.getByText("×"));
    expect(mocks.setActionRequest).toHaveBeenCalledWith({
        action: { name: "list", entity: "item" },
        query: { building_id: 53, date: "2026-10", filter: { contact_name: "Ivan" } }
    });
});

it("reads ID-keyed property choices returned by the API", () => {
    const property = propertyFilter("22");
    property.children!.search.choices = [
        {
            label: "Floor 2",
            choices: {
                "22": { value: "22", label: "Residence 5" },
                "1031": { value: "1031", label: "Garage 31" }
            }
        }
    ];
    const result = renderFilters({ property_id: property });

    expect(result.getByText("Residence 5")).toBeDefined();
    expect(result.getByTestId("filter-count").textContent).toBe("1");
});

it.each([null, undefined, "", []].map((data) => ({ data })))(
    "omits an empty compound selection: $data",
    ({ data }) => {
        const result = renderFilters({ property_id: propertyFilter(data) });

        expect(result.queryByText("Property")).toBeNull();
        expect(result.getByTestId("filter-count").textContent).toBe("0");
    }
);

it("resolves nested compounds and multiple selections through existing choice labels", () => {
    const result = renderFilters({
        nested: {
            type: "form",
            label: "Nested",
            data: { property_id: { search: "22" }, status: ["a", "b"] },
            children: {
                property_id: propertyFilter("22"),
                status: {
                    type: "choice",
                    multiple: true,
                    data: ["a", "b"],
                    choices: [
                        { value: "a", label: "Active" },
                        { value: () => "b", label: () => "Pending" }
                    ]
                }
            }
        }
    });

    expect(result.getByText("Residence 5, Active, Pending")).toBeDefined();
});

it("preserves flat filters, zero values, false checkboxes and unknown choice tokens", () => {
    const result = renderFilters({
        text: { type: "text", label: "Name", data: "Ivan" },
        floor: { type: "integer", label: "Floor", data: 0 },
        zero: {
            type: "choice",
            label: "Zero choice",
            data: 0,
            choices: [{ value: 0, label: "Ground floor" }]
        },
        enabled: { type: "checkbox", label: "Enabled", data: false, checked: false },
        type: {
            type: "choice",
            label: "Type",
            data: "unknown",
            choices: [{ value: "a", label: "Active" }]
        },
        empty: { type: "text", label: "Empty", data: null }
    });

    expect(result.getByText("Ivan")).toBeDefined();
    expect(result.getByText("0")).toBeDefined();
    expect(result.getByText("Ground floor")).toBeDefined();
    expect(result.getByText("No")).toBeDefined();
    expect(result.getByText("unknown")).toBeDefined();
    expect(result.queryByText("Empty")).toBeNull();
    expect(result.getByTestId("filter-count").textContent).toBe("5");
});
