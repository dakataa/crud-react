import type { AlertConfigType } from "@crud-react/context/AlertContext.tsx";
import { AlertProvider, UseAlert } from "@crud-react/context/AlertContext.tsx";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("@crud-react/component/LottieAnimation.tsx", () => ({ default: () => null }));

const Trigger = ({
    config,
    replacement
}: {
    config: Partial<AlertConfigType>;
    replacement?: Partial<AlertConfigType>;
}) => {
    const { open } = UseAlert();

    return (
        <>
            <button onClick={() => open(config)}>Show alert</button>
            {replacement && <button onClick={() => open(replacement)}>Show replacement</button>}
        </>
    );
};

const setup = (config: Partial<AlertConfigType> = {}, replacement?: Partial<AlertConfigType>) => {
    const options: Partial<AlertConfigType> = {
        title: "Update summary",
        icon: "none",
        animation: "",
        actions: {
            cancel: { label: "Cancel" },
            confirm: { label: "Update" }
        },
        ...config
    };
    const view = render(
        <AlertProvider>
            <Trigger
                config={options}
                replacement={replacement ? { ...options, ...replacement } : undefined}
            />
        </AlertProvider>
    );
    const open = () => fireEvent.click(view.getByRole("button", { name: "Show alert" }));
    open();

    return {
        ...view,
        replace: async () => {
            await act(async () =>
                fireEvent.click(view.getByRole("button", { name: "Show replacement" }))
            );
        }
    };
};

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
});

it.each([undefined, 0])("keeps action dialogs open with timeout %s", async (timeout) => {
    const onResult = vi.fn();
    const view = setup({ timeout, onResult });

    await act(async () => vi.advanceTimersByTime(10000));

    expect(view.getByRole("button", { name: "Update" })).toBeTruthy();
    expect(onResult).not.toHaveBeenCalled();

    await act(async () => fireEvent.click(view.getByRole("button", { name: "Update" })));

    expect(onResult).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ isConfirmed: true })
    );
    expect(view.queryByRole("button", { name: "Update" })).toBeNull();
});

it("closes after an explicitly requested timeout without confirming an action", async () => {
    const onResult = vi.fn();
    const view = setup({ timeout: 2000, onResult });

    await act(async () => vi.advanceTimersByTime(1999));
    expect(view.getByText("Update summary")).toBeTruthy();

    await act(async () => vi.advanceTimersByTime(1));
    expect(view.queryByText("Update summary")).toBeNull();
    expect(onResult).not.toHaveBeenCalled();
});

it("uses the default timeout when timeout progress is requested", async () => {
    const view = setup({ timeoutProgress: true });

    await act(async () => vi.advanceTimersByTime(4999));
    expect(view.getByText("Update summary")).toBeTruthy();

    await act(async () => vi.advanceTimersByTime(1));
    expect(view.queryByText("Update summary")).toBeNull();
});

it("allows an explicit zero to disable the timeout even with timeout progress enabled", async () => {
    const view = setup({ timeout: 0, timeoutProgress: true });

    await act(async () => vi.advanceTimersByTime(10000));

    expect(view.getByText("Update summary")).toBeTruthy();
});

it("does not let the previous dialog's timeout close its replacement", async () => {
    const view = setup({ timeout: 2000 }, { title: "Confirm a different update", timeout: 0 });
    await act(async () => vi.advanceTimersByTime(1000));

    await view.replace();
    await act(async () => vi.advanceTimersByTime(5000));

    expect(view.queryByText("Update summary")).toBeNull();
    expect(view.getByText("Confirm a different update")).toBeTruthy();
});
