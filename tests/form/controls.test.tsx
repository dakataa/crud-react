import React, { createRef } from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Form } from "@crud-react/component/form/Form.tsx";
import { FormViewProvider } from "@crud-react/component/crud/form/Form.tsx";
import FormField from "@crud-react/component/crud/form/FormField.tsx";
import type { FormViewType } from "@crud-react/type/FormViewType.tsx";

vi.mock("@crud-react/Crud.tsx", () => ({ CrudRequester: vi.fn() }));
vi.mock("@crud-react/component/crud/CrudLoader.tsx", () => ({ UseCurrentActionRequest: vi.fn() }));

afterEach(cleanup);

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
