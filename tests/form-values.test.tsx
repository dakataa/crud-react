import React, { createRef, StrictMode } from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import {
    Form,
    UseForm,
    useFormField,
    useFormValue,
    useFormValues
} from "../src/component/form/Form.tsx";
import type { FormRef, FormValueField } from "../src/component/form/Form.tsx";
import type { FormStore } from "../src/component/form/FormStore.ts";
import type { FormViewType } from "../src/type/FormViewType.tsx";
import { NotBlank } from "../src/component/form/constraint/NotBlank.tsx";

let store: FormStore;

function StoreAccess() {
    store = UseForm().store;

    return null;
}

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

it.each(["title", { type: "text", full_name: "title", data: "backend" }])(
    "observes %j without registering a control or initializing its value",
    (field) => {
        const onRead = vi.fn();

        function Observer() {
            const value = useFormValue(field);
            onRead(value);

            return <output>{value}</output>;
        }

        const result = render(
            <Form>
                <StoreAccess />
                <Observer />
            </Form>
        );

        expect(onRead.mock.lastCall![0]).toBeUndefined();
        expect(store.getNames()).toEqual([]);
        expect(store.isRegistered("title")).toBe(false);

        act(() => store.setValue("title", "draft"));

        expect(result.getByRole("status").textContent).toBe("draft");
        expect(store.isRegistered("title")).toBe(false);
        expect(store.getState().constraints).toEqual({});
    }
);

it("keeps missing fields undefined and explicitly cleared values null", () => {
    const onRead = vi.fn();

    function Observer() {
        const missing = useFormValue();
        const values = useFormValues([undefined, null, "", { type: "text" }, "title"]);
        onRead(missing, values);

        return null;
    }

    render(
        <Form>
            <StoreAccess />
            <Observer />
        </Form>
    );

    expect(onRead.mock.lastCall).toEqual([
        undefined,
        [undefined, undefined, undefined, undefined, undefined]
    ]);

    act(() => store.setValue("title", null));
    expect(onRead.mock.lastCall![1]).toEqual([undefined, undefined, undefined, undefined, null]);

    act(() => store.setValue("title", ""));
    expect(onRead.mock.lastCall![1]).toEqual([undefined, undefined, undefined, undefined, ""]);
});

it("rerenders only for observed value changes, including array changes", () => {
    const onRead = vi.fn();
    const rules = [new NotBlank({})];

    function Observer() {
        onRead(useFormValue("tags[]"), useFormValues(["tags"]));

        return null;
    }

    render(
        <Form>
            <StoreAccess />
            <Observer />
        </Form>
    );

    act(() => store.reconcile({ values: { tags: ["a"] }, collections: {} }));
    const initialSnapshot = onRead.mock.lastCall![1];
    onRead.mockClear();

    act(() => {
        store.setValue("other", "changed");
        store.setErrors({ tags: [{ message: "Invalid selection" }] });
        store.setSubmitting(true);
        store.registerField("tags", ["a"], "multiple", rules, Symbol("tags"));
        store.changeNative("tags", ["a"]);
    });

    expect(onRead).not.toHaveBeenCalled();

    act(() => store.reconcile({ values: { tags: ["a"] }, collections: {} }));
    act(() => store.reset());
    expect(onRead).not.toHaveBeenCalled();

    act(() => store.setValue("tags", ["a", "b"]));

    expect(onRead).toHaveBeenCalledOnce();
    expect(onRead.mock.lastCall).toEqual([["a", "b"], [["a", "b"]]]);
    expect(onRead.mock.lastCall![1]).not.toBe(initialSnapshot);

    act(() => store.setValue("tags", ["b", "a"]));
    expect(onRead.mock.lastCall![0]).toEqual(["b", "a"]);
});

it("retains the snapshot and subscription for equivalent inline field lists", () => {
    const onRead = vi.fn();

    function Observer() {
        const values = useFormValues(["first", { type: "choice", full_name: "tags[]" }]);
        onRead(values);

        return null;
    }

    const tree = () => (
        <Form>
            <StoreAccess />
            <Observer />
        </Form>
    );
    const result = render(tree());

    act(() => {
        store.setValue("first", "a");
        store.setValue("tags", ["b"]);
    });

    const initialSnapshot = onRead.mock.lastCall![0];
    const subscribe = vi.spyOn(store, "subscribeField");
    result.rerender(tree());

    expect(onRead.mock.lastCall![0]).toBe(initialSnapshot);
    expect(subscribe).not.toHaveBeenCalled();
});

it("preserves field order and duplicates while updating subscriptions as targets change", () => {
    const onRead = vi.fn();

    function Observer({ fields }: { fields: readonly FormValueField[] }) {
        onRead(useFormValues(fields));

        return null;
    }

    const tree = (fields: readonly FormValueField[]) => (
        <Form>
            <StoreAccess />
            <Observer fields={fields} />
        </Form>
    );
    const result = render(tree([]));

    act(() => {
        store.setValue("first", "a");
        store.setValue("second", "b");
        store.setValue("third", "c");
    });

    const subscribe = vi.spyOn(store, "subscribeField");
    result.rerender(tree(["first", "first[]", "second"]));

    expect(onRead.mock.lastCall![0]).toEqual(["a", "a", "b"]);
    expect(subscribe).toHaveBeenCalledTimes(2);

    result.rerender(tree(["second", "first"]));
    expect(onRead.mock.lastCall![0]).toEqual(["b", "a"]);

    result.rerender(tree(["third"]));
    onRead.mockClear();

    act(() => store.setValue("first", "unobserved"));
    expect(onRead).not.toHaveBeenCalled();

    act(() => store.setValue("third", "changed"));
    expect(onRead).toHaveBeenCalledExactlyOnceWith(["changed"]);

    result.rerender(tree([]));
    const emptySnapshot = onRead.mock.lastCall![0];
    result.rerender(tree([]));
    expect(onRead.mock.lastCall![0]).toBe(emptySnapshot);
    onRead.mockClear();

    act(() => store.setValue("third", "unobserved"));
    expect(onRead).not.toHaveBeenCalled();
});

it("follows field initialization, edits, remounts and reset under StrictMode", () => {
    const ref = createRef<FormRef>();
    const view: FormViewType = { type: "text", full_name: "title", data: "backend" };
    const rules = [new NotBlank({})];

    function Observer() {
        return <output>{useFormValue(view)}</output>;
    }

    function Control() {
        const field = useFormField(view, rules);

        return (
            <input
                name={field.name}
                value={field.value as string}
                onChange={(event) => field.change(event.target.value)}
            />
        );
    }

    const tree = (visible: boolean) => (
        <StrictMode>
            <Form ref={ref}>
                <StoreAccess />
                <Observer />
                {visible && <Control />}
            </Form>
        </StrictMode>
    );
    const result = render(tree(true));

    expect(result.getByRole("status").textContent).toBe("backend");
    expect(store.getState().constraints.title).toEqual(rules);

    fireEvent.change(result.getByRole("textbox"), { target: { value: "draft" } });
    expect(result.getByRole("status").textContent).toBe("draft");

    result.rerender(tree(false));
    expect(result.getByRole("status").textContent).toBe("draft");
    expect(store.getState().constraints).toEqual({});

    act(() => ref.current!.setValue("title", "hidden draft"));
    result.rerender(tree(true));
    expect(result.getByRole("status").textContent).toBe("hidden draft");

    act(() => ref.current!.reset());
    expect(result.getByRole("status").textContent).toBe("backend");
});

it("switches a single observed field and unsubscribes on unmount", () => {
    const onRead = vi.fn();

    function Observer({ field }: { field: FormValueField }) {
        onRead(useFormValue(field));

        return null;
    }

    const tree = (field: FormValueField) => (
        <Form>
            <StoreAccess />
            <Observer field={field} />
        </Form>
    );
    const result = render(tree("first"));

    act(() => {
        store.setValue("first", "a");
        store.setValue("second", "b");
    });

    result.rerender(tree({ type: "text", full_name: "second" }));
    expect(onRead.mock.lastCall![0]).toBe("b");
    onRead.mockClear();

    act(() => store.setValue("first", "unobserved"));
    expect(onRead).not.toHaveBeenCalled();

    result.unmount();
    act(() => store.setValue("second", "after unmount"));
    expect(onRead).not.toHaveBeenCalled();
});

it("observes the current form session without retaining subscriptions to the previous store", () => {
    const onRead = vi.fn();

    function Observer() {
        onRead(useFormValue("title"));

        return null;
    }

    const tree = (session: string) => (
        <Form key={session}>
            <StoreAccess />
            <Observer />
        </Form>
    );
    const result = render(tree("first"));

    act(() => store.setValue("title", "first draft"));
    const previousStore = store;
    result.rerender(tree("second"));

    expect(onRead.mock.lastCall![0]).toBeUndefined();
    onRead.mockClear();

    act(() => previousStore.setValue("title", "stale draft"));
    expect(onRead).not.toHaveBeenCalled();

    act(() => store.setValue("title", "current draft"));
    expect(onRead).toHaveBeenCalledExactlyOnceWith("current draft");
});
