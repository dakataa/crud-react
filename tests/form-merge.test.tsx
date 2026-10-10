import React, { createRef, StrictMode } from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Form } from "../src/component/form/Form.tsx";
import type { FormRef } from "../src/component/form/Form.tsx";
import { FormViewProvider } from "../src/component/crud/form/Form.tsx";
import Input from "../src/component/form/Input.tsx";
import type { FormViewType } from "../src/type/FormViewType.tsx";

// These tests exercise field reconciliation without loading the surrounding CRUD application.
vi.mock("@crud-react/Crud.tsx", () => ({ CrudRequester: vi.fn() }));
vi.mock("@crud-react/component/crud/CrudLoader.tsx", () => ({ UseCurrentActionRequest: vi.fn() }));

afterEach(cleanup);

it("keeps a hidden input draft across validation renders and refreshes its reset baseline", () => {
    const formRef = createRef<FormRef>();
    const inputRef = createRef<HTMLInputElement>();

    const tree = (data: string, visible = true) => {
        const token: FormViewType = { type: "hidden", full_name: "form[token]", data };
        const root: FormViewType = {
            type: "form",
            full_name: "form",
            children: { token }
        };

        return (
            <StrictMode>
                <Form ref={formRef}>
                    <FormViewProvider view={root}>
                        {visible && <Input ref={inputRef} view={token} />}
                    </FormViewProvider>
                </Form>
            </StrictMode>
        );
    };

    const result = render(tree("original"));
    const originalInput = inputRef.current!;

    result.rerender(tree("refreshed"));
    expect(inputRef.current).toBe(originalInput);
    expect(originalInput.value).toBe("refreshed");

    act(() => formRef.current!.setValue("form[token]", "draft"));
    act(() => formRef.current!.setErrors({ "form[token]": [{ message: "Invalid token" }] }));
    expect(inputRef.current).toBe(originalInput);
    expect(originalInput.value).toBe("draft");

    result.rerender(tree("latest"));
    expect(inputRef.current).toBe(originalInput);
    expect(formRef.current!.getFormData().get("form[token]")).toBe("draft");

    result.rerender(tree("latest", false));
    expect(inputRef.current).toBeNull();
    result.rerender(tree("latest"));
    expect(inputRef.current!.value).toBe("draft");

    act(() => formRef.current!.reset());
    expect(inputRef.current!.value).toBe("latest");
    expect(formRef.current!.getFormData().get("form[token]")).toBe("latest");
});

it("adopts changed backend checkbox defaults without remounting or overwriting a draft", () => {
    const formRef = createRef<FormRef>();

    const tree = (checked: boolean, visible = true) => {
        const check: FormViewType = {
            type: "checkbox",
            full_name: "form[check]",
            value: "yes",
            checked
        };
        const root: FormViewType = {
            type: "form",
            full_name: "form",
            children: { check }
        };

        return (
            <StrictMode>
                <Form ref={formRef}>
                    <FormViewProvider view={root}>
                        {visible && <Input view={check} />}
                    </FormViewProvider>
                </Form>
            </StrictMode>
        );
    };

    const result = render(tree(false));
    const originalInput = result.getByRole("checkbox") as HTMLInputElement;

    expect(originalInput.checked).toBe(false);
    result.rerender(tree(true));
    expect(result.getByRole("checkbox")).toBe(originalInput);
    expect(originalInput.checked).toBe(true);

    fireEvent.click(originalInput);
    expect(originalInput.checked).toBe(false);

    result.rerender(tree(true));
    expect(result.getByRole("checkbox")).toBe(originalInput);
    expect(originalInput.checked).toBe(false);
    expect(formRef.current!.getFormData().has("form[check]")).toBe(false);

    result.rerender(tree(true, false));
    result.rerender(tree(true));
    expect((result.getByRole("checkbox") as HTMLInputElement).checked).toBe(false);

    act(() => formRef.current!.reset());
    expect((result.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
    expect(formRef.current!.getFormData().get("form[check]")).toBe("yes");
});
