import React, { createRef } from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Form } from "@crud-react/component/form/Form.tsx";
import type { FormRef } from "@crud-react/component/form/Form.tsx";
import { FormViewProvider } from "@crud-react/component/crud/form/Form.tsx";
import FormField from "@crud-react/component/crud/form/FormField.tsx";
import FormError from "@crud-react/component/crud/form/FormError.tsx";
import FormFieldError from "@crud-react/component/form/FormFieldError.tsx";
import FormLabel from "@crud-react/component/form/FormLabel.tsx";
import FormHelp from "@crud-react/component/form/FormHelp.tsx";
import { normalizeAttributes, resolveAttribute } from "@crud-react/component/form/formView.ts";
import type { FormViewType } from "@crud-react/type/FormViewType.tsx";

vi.mock("@crud-react/Crud.tsx", () => ({ CrudRequester: vi.fn() }));
vi.mock("@crud-react/component/crud/CrudLoader.tsx", () => ({ UseCurrentActionRequest: vi.fn() }));

afterEach(cleanup);

it.each([undefined, false])("throws for a missing CRUD field when optional is %s", (optional) => {
    const view: FormViewType = { type: "form", full_name: "form" };

    expect(() => {
        render(
            <Form>
                <FormViewProvider view={view}>
                    <FormField name="field" optional={optional} />
                </FormViewProvider>
            </Form>
        );
    }).toThrow("Missing Form View for FormField: field");
});

it("optional CRUD fields follow schema availability and preserve required validation", () => {
    const formRef = createRef<FormRef>();
    const fieldRef = createRef<HTMLInputElement>();
    const missing: FormViewType = { type: "form", full_name: "form" };
    const present: FormViewType = {
        ...missing,
        children: {
            field: { type: "text", full_name: "form[field]", data: "", required: true }
        }
    };
    const tree = (view: FormViewType) => (
        <Form ref={formRef}>
            <FormViewProvider view={view}>
                <FormField
                    name="field"
                    optional
                    options={{ placeholder: "Enter a value" }}
                    ref={fieldRef}
                />
            </FormViewProvider>
        </Form>
    );
    const result = render(tree(missing));

    expect(result.queryByRole("textbox")).toBeNull();
    expect(fieldRef.current).toBeNull();
    expect(formRef.current!.getFormData().has("form[field]")).toBe(false);

    result.rerender(tree(present));

    const input = result.getByRole("textbox") as HTMLInputElement;
    expect(fieldRef.current).toBe(input);
    expect(input.placeholder).toBe("Enter a value");
    expect(input.required).toBe(true);
    expect(input.validity.valueMissing).toBe(true);

    fireEvent.change(input, { target: { value: "entered" } });

    expect(formRef.current!.getFormData().get("form[field]")).toBe("entered");

    result.rerender(tree(missing));

    expect(result.queryByRole("textbox")).toBeNull();
    expect(fieldRef.current).toBeNull();
    expect(formRef.current!.getFormData().has("form[field]")).toBe(false);
});

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

it.each([
    { attr: { autocomplete: "email" }, expected: "email" },
    { attr: { autoComplete: "name" }, expected: "name" },
    { attr: { autocomplete: "email", autoComplete: "off" }, expected: "off" },
    { attr: { autoComplete: "off", autocomplete: "email" }, expected: "off" }
])("normalizes autocomplete attributes without a React warning ($expected)", ({ attr, expected }) => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
        const view: FormViewType = { type: "email", name: "email", full_name: "form[email]", attr };
        const result = render(<Form><FormViewProvider view={view}><FormField /></FormViewProvider></Form>);
        expect(result.getByRole("textbox").getAttribute("autocomplete")).toBe(expected);
        expect(errors.mock.calls.flat().join(" ")).not.toContain("Invalid DOM property");
    } finally {
        errors.mockRestore();
    }
});

it.each(["text", "textarea", "choice"])("normalizes HTML attributes before rendering %s", (type) => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const onClick = vi.fn();
    const attr = Object.freeze({
        class: "backend-control",
        inputmode: "decimal",
        autocomplete: "off",
        tabindex: 2,
        "aria-label": "Field",
        "data-source": "backend",
        onClick
    });
    const view: FormViewType = {
        type, full_name: "form[field]", data: "a", attr: () => attr,
        choices: [{ value: "a", label: "A", attr: { class: "backend-option" } }]
    };
    try {
        const result = render(<Form><FormViewProvider view={view}><FormField /></FormViewProvider></Form>);
        const element = result.getByLabelText("Field") as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        expect(element.classList.contains("backend-control")).toBe(true);
        expect(element.getAttribute("inputmode")).toBe("decimal");
        expect(element.getAttribute("autocomplete")).toBe("off");
        expect(element.tabIndex).toBe(2);
        expect(element.getAttribute("data-source")).toBe("backend");
        if (type === "text") {
            expect(element.getAttribute("step")).toBe("any");
        }
        if (type === "choice") {
            expect(element.querySelector("option")!.className).toBe("backend-option");
        }
        fireEvent.click(element);
        expect(onClick).toHaveBeenCalledOnce();
        expect(errors).not.toHaveBeenCalled();
        expect(attr.class).toBe("backend-control");
    } finally {
        errors.mockRestore();
    }
});

it.each(["text", "textarea"])("applies native text constraints supplied as HTML attributes to %s", (type) => {
    const view: FormViewType = {
        type, full_name: "form[field]", data: "initial",
        attr: { readonly: true, minlength: 2, maxlength: 12, spellcheck: false }
    };
    const result = render(<Form><FormViewProvider view={view}><FormField /></FormViewProvider></Form>);
    const element = result.getByRole("textbox") as HTMLInputElement | HTMLTextAreaElement;
    expect(element.readOnly).toBe(true);
    expect(element.minLength).toBe(2);
    expect(element.maxLength).toBe(12);
    expect(element.getAttribute("spellcheck")).toBe("false");
});

it("normalizes expanded choice containers, inputs and labels", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const view: FormViewType = {
        type: "choice", full_name: "form[choice]", expanded: true,
        attr: { class: "choice-container" },
        choice_attr: () => ({ class: "choice-input", tabindex: 3 }),
        label_attr: () => ({ class: "choice-label" }),
        choices: [{ value: "a", label: "A" }]
    };
    try {
        const result = render(<Form><FormViewProvider view={view}><FormField /></FormViewProvider></Form>);
        const input = result.getByRole("radio");
        expect(input.className).toBe("choice-input");
        expect(input.tabIndex).toBe(3);
        expect(result.container.querySelector("label")!.className).toBe("choice-label");
        expect(input.closest(".choice-container")).not.toBeNull();
        expect(errors).not.toHaveBeenCalled();
    } finally {
        errors.mockRestore();
    }
});

it("normalizes standalone label and help attributes", () => {
    const view: FormViewType = {
        type: "text", full_name: "form[field]", label: "Label", help: "Help",
        label_attr: { class: "backend-label", for: "target" },
        help_attr: () => ({ class: "backend-help", tabindex: 0 })
    };
    const result = render(<Form><FormViewProvider view={view}>
        <FormLabel view={view}/><FormHelp/>
    </FormViewProvider></Form>);
    const label = result.getByText("Label") as HTMLLabelElement;
    expect(label.className).toBe("backend-label");
    expect(label.htmlFor).toBe("target");
    const help = result.getByText("Help");
    expect(help.className).toBe("backend-help");
    expect(help.tabIndex).toBe(0);
});

it("preserves explicit React attributes, unknown attributes and value references", () => {
    const style = { color: "red" };
    const onChange = vi.fn();
    const attr = Object.freeze({
        readOnly: false, readonly: true,
        class: "fallback", className: undefined,
        "data-field": "field", "aria-hidden": false, custom: "value", style, onChange
    });
    const normalized = normalizeAttributes(attr);
    expect(normalized).toEqual({
        readOnly: false, className: undefined,
        "data-field": "field", "aria-hidden": false, custom: "value", style, onChange
    });
    expect(normalized.style).toBe(style);
    expect(normalized.onChange).toBe(onChange);
});

it("resolves individual properties without changing their values or normalizing them", () => {
    const attributes = Object.freeze({ class: "raw-class" });
    const view = {
        attr: attributes,
        label: "Label",
        enabled: false,
        count: 0,
        empty: "",
        nullable: null,
        missing: undefined
    };
    for (const key of Object.keys(view) as Array<keyof typeof view>) {
        expect(resolveAttribute(view, key)).toBe(view[key]);
    }
    expect(resolveAttribute(view, "attr")).toBe(attributes);
    expect(attributes).toEqual({ class: "raw-class" });
});

it("resolves callbacks with their owner and preserves empty results and exceptions", () => {
    const callback = vi.fn(function (this: unknown, owner: unknown) {
        expect(this).toBe(owner);
        return "resolved label";
    });
    const view = { label: callback };
    expect(resolveAttribute(view, "label")).toBe("resolved label");
    expect(callback).toHaveBeenCalledExactlyOnceWith(view);
    for (const value of [undefined, null, false, 0, ""]) {
        expect(resolveAttribute({ label: () => value }, "label")).toBe(value);
    }
    const error = new Error("callback failed");
    expect(() => resolveAttribute({ attr: () => { throw error; } }, "attr")).toThrow(error);
});

it.each([false, true])("passes the choice to its callbacks and normalizes after merging (expanded=%s)", (expanded) => {
    const choiceAttr = vi.fn(() => ({ className: "explicit-choice-class", tabIndex: 1 }));
    const choiceLabel = vi.fn(() => "Resolved choice");
    const fieldChoiceAttr = vi.fn(() => ({ class: "html-class", tabindex: 3 }));
    const choice = { value: "a", label: choiceLabel, attr: choiceAttr };
    const view: FormViewType = {
        type: "choice", full_name: "form[choice]", data: "a", expanded,
        choices: [choice], choice_attr: fieldChoiceAttr
    };
    const result = render(<Form><FormViewProvider view={view}><FormField /></FormViewProvider></Form>);
    const element = result.getByRole(expanded ? "radio" : "option");
    expect(result.getByText("Resolved choice")).toBeTruthy();
    expect(element.className).toBe("explicit-choice-class");
    expect(element.tabIndex).toBe(1);
    expect(choiceAttr).toHaveBeenLastCalledWith(choice);
    expect(choiceLabel).toHaveBeenLastCalledWith(choice);
    if (expanded) {
        expect(fieldChoiceAttr).toHaveBeenLastCalledWith(view);
    }
});
