import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import Button from "@crud-react/component/Button.tsx";

afterEach(cleanup);

it.each([false, true])(
    "tracks native validity with an external submit button: %s",
    async (external) => {
        const save = (
            <Button type="submit" form="details" autoDisableOnInvalid>
                Save
            </Button>
        );
        const result = render(
            <>
                <form id="details">
                    <input aria-label="Email" type="email" required />
                    <fieldset disabled>
                        <input required />
                    </fieldset>
                    <input required readOnly />
                    {!external && save}
                </form>
                {external && save}
            </>
        );
        const input = result.getByRole<HTMLInputElement>("textbox", { name: "Email" });
        const button = result.getByRole<HTMLButtonElement>("button", { name: "Save" });

        await waitFor(() => expect(button.disabled).toBe(true));
        fireEvent.input(input, { target: { value: "invalid" } });
        expect(button.disabled).toBe(true);
        fireEvent.input(input, { target: { value: "valid@example.test" } });
        await waitFor(() => expect(button.disabled).toBe(false));

        input.setCustomValidity("Unavailable");
        fireEvent.input(input);
        await waitFor(() => expect(button.disabled).toBe(true));
        input.setCustomValidity("");
        fireEvent.input(input);
        await waitFor(() => expect(button.disabled).toBe(false));

        fireEvent.input(input, { target: { value: "" } });
        await waitFor(() => expect(button.disabled).toBe(true));
        input.disabled = true;
        await waitFor(() => expect(button.disabled).toBe(false));
        input.disabled = false;
        await waitFor(() => expect(button.disabled).toBe(true));
        input.remove();
        await waitFor(() => expect(button.disabled).toBe(false));
    }
);

it("preserves native submission validation when automatic disabling is off", async () => {
    const submitted = vi.fn();
    const invalid = vi.fn();
    const result = render(
        <form
            onSubmit={(event) => {
                event.preventDefault();
                submitted();
            }}
            onInvalid={invalid}>
            <input aria-label="Name" required />
            <Button type="submit">Save</Button>
        </form>
    );
    const button = result.getByRole<HTMLButtonElement>("button", { name: "Save" });
    expect(button.disabled).toBe(false);
    fireEvent.click(button);
    expect(submitted).not.toHaveBeenCalled();
    expect(invalid).toHaveBeenCalledOnce();

    fireEvent.input(result.getByRole("textbox"), { target: { value: "Name" } });
    fireEvent.click(button);
    expect(submitted).toHaveBeenCalledOnce();
});
