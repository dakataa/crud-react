import React, { createRef } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Form } from "../src/component/form/Form.tsx";
import type { FormRef } from "../src/component/form/Form.tsx";
import Choice from "../src/component/form/Choice.tsx";
import { FormViewProvider } from "../src/component/crud/form/Form.tsx";
import FormField from "../src/component/crud/form/FormField.tsx";
import type { FormViewType } from "../src/type/FormViewType.tsx";

vi.mock("@crud-react/Crud.tsx", () => ({ CrudRequester: vi.fn() }));
vi.mock("@crud-react/component/crud/CrudLoader.tsx", () => ({ UseCurrentActionRequest: vi.fn() }));

afterEach(cleanup);

it.each([false, true])(
    "preserves grouped choice controls and their selection when reordered (expanded=%s)",
    (expanded) => {
        const ref = createRef<FormRef>();
        const first = { value: "a", label: "A" };
        const second = { value: "b", label: "B" };
        const third = { value: "c", label: "C" };
        const view: FormViewType = {
            type: "choice",
            full_name: "choice",
            data: "a",
            expanded,
            choices: [
                { label: "Main", choices: [first] },
                { label: "Other", choices: [second, third] }
            ]
        };
        const tree = (schema: FormViewType) => (
            <Form ref={ref}>
                <Choice view={schema} />
            </Form>
        );
        const result = render(tree(view));
        const original = expanded
            ? result.getByLabelText("B")
            : result.getByRole("option", { name: "B" });

        if (expanded) {
            fireEvent.click(original);
        } else {
            fireEvent.change(result.getByRole("combobox"), { target: { value: "b" } });
        }

        result.rerender(
            tree({
                ...view,
                choices: [
                    { label: "Other", choices: [third, second] },
                    { label: "Main", choices: [first] }
                ]
            })
        );

        const reordered = expanded
            ? result.getByLabelText("B")
            : result.getByRole("option", { name: "B" });

        expect(reordered).toBe(original);
        expect(ref.current!.getFormData().get("choice")).toBe("b");
    }
);

it.each(["text", "textarea", "choice"])("accepts a nullable CRUD field ref for %s", (type) => {
    const ref = createRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>();
    const view: FormViewType = {
        type: "form",
        full_name: "form",
        children: {
            field: {
                type,
                full_name: "form[field]",
                data: "a",
                choices: type === "choice" ? [{ value: "a", label: "A" }] : undefined
            }
        }
    };
    const result = render(
        <Form>
            <FormViewProvider view={view}>
                <FormField name="field" ref={ref} />
            </FormViewProvider>
        </Form>
    );

    expect(ref.current).toBe(result.container.querySelector("input, select, textarea"));
    expect(ref.current!.value).toBe("a");

    result.unmount();
    expect(ref.current).toBeNull();
});
