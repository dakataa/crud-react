import React, { createRef, StrictMode, useState } from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Form, UseForm } from "@crud-react/component/form/Form.tsx";
import type { FormRef, FormState } from "@crud-react/component/form/Form.tsx";
import type { FormStore } from "@crud-react/component/form/FormStore.ts";
import { NotBlank } from "@crud-react/component/form/constraint/NotBlank.tsx";

let store: FormStore;

function StoreAccess() {
    store = UseForm().store;

    return null;
}

afterEach(cleanup);

it("notifies the initial state once under StrictMode", () => {
    const onStateChange = vi.fn();

    render(
        <StrictMode>
            <Form onStateChange={onStateChange}>
                <StoreAccess />
            </Form>
        </StrictMode>
    );

    expect(onStateChange).toHaveBeenCalledExactlyOnceWith({
        constraints: {},
        errors: {},
        success: false,
        submitting: false
    });
});

it("uses the latest callback without notifying for callback replacement alone", () => {
    const originalCallback = vi.fn();
    const latestCallback = vi.fn();
    const result = render(
        <Form onStateChange={originalCallback}>
            <StoreAccess />
        </Form>
    );

    result.rerender(
        <Form onStateChange={latestCallback}>
            <StoreAccess />
        </Form>
    );

    expect(originalCallback).toHaveBeenCalledOnce();
    expect(latestCallback).not.toHaveBeenCalled();

    act(() => store.setSubmitting(true));

    expect(originalCallback).toHaveBeenCalledOnce();
    expect(latestCallback).toHaveBeenCalledExactlyOnceWith(store.getState());
    expect(latestCallback.mock.calls[0][0].submitting).toBe(true);

    act(() => store.setSubmitting(true));
    expect(latestCallback).toHaveBeenCalledOnce();
});

it("receives the current state when observation is enabled later", () => {
    const onStateChange = vi.fn();
    const result = render(
        <Form>
            <StoreAccess />
        </Form>
    );

    act(() => store.setSubmitting(true));

    result.rerender(
        <Form onStateChange={onStateChange}>
            <StoreAccess />
        </Form>
    );

    expect(onStateChange).toHaveBeenCalledExactlyOnceWith(store.getState());
    expect(onStateChange.mock.calls[0][0].submitting).toBe(true);
});

it("reports errors, success and reset without subscribing to field values", () => {
    const ref = createRef<FormRef>();
    const onStateChange = vi.fn();

    render(
        <Form ref={ref} onStateChange={onStateChange}>
            <StoreAccess />
        </Form>
    );

    act(() => ref.current!.setValue("title", "draft"));
    expect(onStateChange).toHaveBeenCalledOnce();

    const errors = { title: [{ message: "Invalid title" }] };
    act(() => ref.current!.setErrors(errors));
    expect(onStateChange.mock.lastCall![0].errors).toEqual(errors);

    act(() => ref.current!.success());
    expect(onStateChange.mock.lastCall![0].success).toBe(true);

    act(() => ref.current!.reset());
    expect(onStateChange.mock.lastCall![0]).toEqual({
        constraints: {},
        errors: {},
        success: false,
        submitting: false
    });
});

it("updates surrounding UI with an inline callback without rerendering form consumers", () => {
    const ref = createRef<FormRef>();
    const onSubmit = vi.fn();
    let accessRenders = 0;

    function Access() {
        accessRenders++;

        return <StoreAccess />;
    }

    // Keep this child stable so only store subscriptions can rerender it.
    const fields = <Access />;

    function Parent() {
        const [verifying, setVerifying] = useState(false);

        return (
            <>
                <Form
                    ref={ref}
                    onSubmit={onSubmit}
                    onStateChange={({ submitting }) => setVerifying(submitting)}>
                    {fields}
                </Form>
                <button type="button" disabled={verifying}>
                    Resend code
                </button>
            </>
        );
    }

    const result = render(<Parent />);
    const button = result.getByRole("button") as HTMLButtonElement;
    const initialRenders = accessRenders;

    expect(button.disabled).toBe(false);

    act(() => ref.current!.submit());

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(button.disabled).toBe(true);
    expect(accessRenders).toBe(initialRenders);

    act(() => store.setSubmitting(false));

    expect(button.disabled).toBe(false);
    expect(accessRenders).toBe(initialRenders);
});

it("preserves the native onChange event separately from state notifications", () => {
    const onChange = vi.fn();
    const onStateChange = vi.fn();
    const result = render(
        <Form onChange={onChange} onStateChange={onStateChange}>
            <input name="title" defaultValue="" />
        </Form>
    );

    fireEvent.change(result.getByRole("textbox"), { target: { value: "draft" } });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0][0].target.value).toBe("draft");
    expect(onStateChange).toHaveBeenCalledOnce();
});

it("stops observing when the callback is removed and after unmount", () => {
    const onStateChange = vi.fn();
    const result = render(
        <Form onStateChange={onStateChange}>
            <StoreAccess />
        </Form>
    );

    result.rerender(
        <Form>
            <StoreAccess />
        </Form>
    );

    act(() => store.setSubmitting(true));
    expect(onStateChange).toHaveBeenCalledOnce();

    result.rerender(
        <Form onStateChange={onStateChange}>
            <StoreAccess />
        </Form>
    );
    expect(onStateChange).toHaveBeenCalledTimes(2);

    result.unmount();
    act(() => store.setSubmitting(false));

    expect(onStateChange).toHaveBeenCalledTimes(2);
});

it("reports the final committed snapshot of batched state updates", () => {
    const onStateChange = vi.fn<(state: FormState) => void>();

    render(
        <Form onStateChange={onStateChange}>
            <StoreAccess />
        </Form>
    );

    act(() => {
        store.setSubmitting(true);
        store.setSuccess(true);
    });

    expect(onStateChange).toHaveBeenCalledTimes(2);
    expect(onStateChange.mock.lastCall![0]).toEqual({
        constraints: {},
        errors: {},
        success: true,
        submitting: false
    });
});

it("reports constraint changes when a field is registered and removed", () => {
    const onStateChange = vi.fn();
    const constraint = new NotBlank({});
    const result = render(
        <Form onStateChange={onStateChange}>
            <StoreAccess />
        </Form>
    );
    let unregister: () => void;

    act(() => {
        unregister = store.registerField("title", "", "scalar", [constraint], Symbol("title"));
    });

    expect(onStateChange.mock.lastCall![0].constraints).toEqual({ title: [constraint] });

    act(() => unregister());

    expect(onStateChange.mock.lastCall![0].constraints).toEqual({});
    result.unmount();
});
