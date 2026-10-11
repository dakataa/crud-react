import React, { createRef } from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Form } from "@crud-react/component/form/Form.tsx";
import type { FormRef } from "@crud-react/component/form/Form.tsx";
import { FormViewProvider } from "@crud-react/component/crud/form/Form.tsx";
import FormField from "@crud-react/component/crud/form/FormField.tsx";
import FormError from "@crud-react/component/crud/form/FormError.tsx";
import FormFieldError from "@crud-react/component/form/FormFieldError.tsx";
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

it.each(["schema", "base"])(
    "%s error containers forward HTML attributes and disappear when the field error clears",
    (kind) => {
        const ref = createRef<FormRef>();
        const onClick = vi.fn();
        const view: FormViewType = {
            type: "form",
            full_name: "form",
            children: {
                field: { type: "text", full_name: "form[field]", data: "" }
            }
        };
        const attributes = {
            id: "field-error",
            role: "alert",
            className: "alert alert-danger",
            title: "Field validation",
            style: { color: "red" },
            tabIndex: 0,
            "aria-label": "Field error",
            "data-field": "field",
            onClick
        };
        const error =
            kind === "schema" ? (
                <FormError name="field" {...attributes} />
            ) : (
                <FormFieldError name="form[field]" {...attributes} />
            );
        const result = render(
            <Form ref={ref}>
                <FormViewProvider view={view}>
                    <FormField name="field" />
                    {error}
                </FormViewProvider>
            </Form>
        );

        expect(result.container.querySelector("#field-error")).toBeNull();

        act(() => {
            ref.current!.setErrors({ "form[field]": [{ message: "Invalid value" }] });
        });

        const element = result.getByRole("alert");
        expect(element.id).toBe("field-error");
        expect(element.className).toBe("alert alert-danger");
        expect(element.title).toBe("Field validation");
        expect(element.style.color).toBe("red");
        expect(element.tabIndex).toBe(0);
        expect(element.getAttribute("aria-label")).toBe("Field error");
        expect(element.getAttribute("data-field")).toBe("field");
        expect(element.hasAttribute("name")).toBe(false);
        expect(element.textContent).toBe("Invalid value");

        fireEvent.click(element);
        expect(onClick).toHaveBeenCalledOnce();

        fireEvent.change(result.getByRole("textbox"), { target: { value: "new value" } });
        expect(result.container.querySelector("#field-error")).toBeNull();
        expect(result.queryByRole("alert")).toBeNull();
    }
);

it("error containers leave announcement roles to the caller", () => {
    const ref = createRef<FormRef>();
    const result = render(
        <Form ref={ref}>
            <FormFieldError name="code" id="code-error" />
        </Form>
    );

    act(() => {
        ref.current!.setErrors({ code: [{ message: "Invalid code" }] });
    });

    const element = result.container.querySelector("#code-error")!;
    expect(element.hasAttribute("role")).toBe(false);
    expect(element.hasAttribute("aria-live")).toBe(false);
});
