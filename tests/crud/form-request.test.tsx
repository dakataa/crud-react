import React, { useState } from "react";
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DataContextProvider, GetDataByAction } from "@crud-react/context/GetData.tsx";
import { FormStore } from "@crud-react/component/form/FormStore.ts";
import CrudForm from "@crud-react/component/crud/form/Form.tsx";
import type { FormProps } from "@crud-react/component/form/Form.tsx";
import PreloaderProvider from "@crud-react/component/Preloader.tsx";
import { ConfigProvider } from "@crud-react/context/ConfigContext.tsx";

const request = vi.hoisted(() => {
    return {
        fetch: vi.fn(),
        action: null as any,
        setAction: null as any,
        navigate: vi.fn()
    };
});

vi.mock("@crud-react/Crud.tsx", () => {
    return {
        CrudRequester: () => {
            return { fetch: request.fetch };
        }
    };
});

vi.mock("@crud-react/context/ActionContext.tsx", () => {
    return {
        UseActions: () => {
            return {
                navigate: request.navigate,
                generateActionLink: () => "/edit",
                generateLink: () => "/saved",
                externalToInternalPath: (path: string) => path,
                internalToExternalPath: (path: string) => path
            };
        }
    };
});

vi.mock("@crud-react/component/crud/CrudLoader.tsx", () => {
    return {
        UseCurrentActionRequest: () => {
            return { actionRequest: request.action, setActionRequest: request.setAction };
        }
    };
});

function result(status = 200, errors = false) {
    return {
        response: { status, statusText: "Request failed", redirected: false, url: "/edit" },
        data: {
            form: {
                modify: {
                    view: {
                        type: "form",
                        full_name: "form",
                        children: {
                            title: {
                                type: "text",
                                full_name: "form[title]",
                                data: "backend",
                                errors: errors ? [{ message: "Invalid title" }] : []
                            }
                        }
                    }
                }
            }
        }
    };
}

function Harness({
    onError,
    fallback,
    onStateChange
}: {
    onError?: any;
    fallback: any;
    onStateChange?: FormProps["onStateChange"];
}) {
    const [action, setAction] = useState({
        action: { entity: "item", name: "edit", namespace: "test" },
        parameters: { id: 1 }
    });
    request.action = action;
    request.setAction = setAction;
    const data = GetDataByAction({ actionRequest: action, onError: fallback });

    return (
        <ConfigProvider config={{}}>
            <PreloaderProvider>
                <DataContextProvider data={data}>
                    <CrudForm embedded onError={onError} onStateChange={onStateChange} />
                </DataContextProvider>
            </PreloaderProvider>
        </ConfigProvider>
    );
}

beforeEach(() => {
    vi.spyOn(FormStore.prototype, "registerField");
    request.fetch.mockReset();
    request.navigate.mockReset();
    request.fetch.mockResolvedValueOnce(result());
});

it.each(["saved", "invalid", "network error"])(
    "CRUD state notifications follow submission and its %s response",
    async (outcome) => {
        let completeRequest: () => void = () => {
            throw new Error("Submission has not started");
        };

        request.fetch.mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                completeRequest = () => {
                    if (outcome === "network error") {
                        reject(new Error("Connection lost"));

                        return;
                    }

                    const response = result(
                        outcome === "invalid" ? 422 : 200,
                        outcome === "invalid"
                    );
                    const data = {
                        ...response.data,
                        form: {
                            modify: {
                                view: {
                                    ...response.data.form.modify.view,
                                    submitted: true
                                }
                            }
                        }
                    };

                    resolve({ ...response, data });
                };
            });
        });

        const onStateChange = vi.fn();
        const screen = render(
            <Harness onError={vi.fn()} fallback={vi.fn()} onStateChange={onStateChange} />
        );
        await screen.findByRole("textbox");

        expect(onStateChange.mock.lastCall![0].submitting).toBe(false);
        fireEvent.submit(screen.container.querySelector("form")!);

        await waitFor(() => {
            expect(request.fetch).toHaveBeenCalledTimes(2);
        });
        expect(onStateChange.mock.lastCall![0].submitting).toBe(true);

        await act(async () => completeRequest());

        await waitFor(() => {
            expect(onStateChange.mock.lastCall![0].submitting).toBe(false);
        });
        expect(onStateChange.mock.lastCall![0].success).toBe(outcome === "saved");

        if (outcome === "invalid") {
            expect(onStateChange.mock.lastCall![0].errors).toEqual({
                "form[title]": [{ message: "Invalid title" }]
            });
        }
    }
);

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

async function submit(onError?: any, fallback = vi.fn()) {
    const screen = render(<Harness onError={onError} fallback={fallback} />);
    const input = await screen.findByRole("textbox");
    fireEvent.change(input, { target: { value: "draft" } });
    fireEvent.submit(screen.container.querySelector("form")!);

    await waitFor(() => {
        expect(request.fetch).toHaveBeenCalledTimes(2);
    });

    return { screen, input, fallback };
}

describe("CRUD submission errors through the real request provider", () => {
    it("handles network errors locally, retains edits and allows retry", async () => {
        request.fetch.mockRejectedValueOnce(new Error("Connection lost"));
        const onError = vi.fn();
        const { screen, input, fallback } = await submit(onError);

        await waitFor(() => {
            expect(onError).toHaveBeenCalledWith({
                status: 0,
                detail: "Connection lost",
                trace: undefined
            });
        });
        const store = vi
            .mocked(FormStore.prototype.registerField)
            .mock.contexts.at(-1) as FormStore;
        expect(store.getState().submitting).toBe(false);
        expect(onError).toHaveBeenCalledOnce();
        expect((input as HTMLInputElement).value).toBe("draft");
        expect(fallback).not.toHaveBeenCalled();
        expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(
            false
        );

        request.fetch.mockResolvedValueOnce(result());
        fireEvent.submit(screen.container.querySelector("form")!);
        await waitFor(() => {
            expect(request.fetch).toHaveBeenCalledTimes(3);
        });
    });

    it("handles HTTP errors with a backend detail and trace", async () => {
        request.fetch.mockResolvedValueOnce({
            response: { status: 503, statusText: "Unavailable" },
            data: { detail: "Try again later", trace: [] }
        });
        const onError = vi.fn();
        const { input, fallback } = await submit(onError);

        await waitFor(() => {
            expect(onError).toHaveBeenCalledWith({
                status: 503,
                detail: "Try again later",
                trace: []
            });
        });
        expect((input as HTMLInputElement).value).toBe("draft");
        expect(fallback).not.toHaveBeenCalled();
    });

    it("keeps validation responses inline without invoking onError", async () => {
        request.fetch.mockResolvedValueOnce(result(422, true));
        const onError = vi.fn();
        const { screen, input, fallback } = await submit(onError);

        await screen.findByText("Invalid title");
        expect((input as HTMLInputElement).value).toBe("draft");
        expect(onError).not.toHaveBeenCalled();
        expect(fallback).not.toHaveBeenCalled();
    });

    it("routes server failures with a form view to onError", async () => {
        request.fetch.mockResolvedValueOnce(result(500, true));
        const onError = vi.fn();
        await submit(onError);

        await waitFor(() => {
            expect(onError).toHaveBeenCalledWith({
                status: 500,
                detail: "Request failed",
                trace: undefined
            });
        });
    });

    it("preserves the provider fallback without a form callback and clears submitting", async () => {
        const error = new Error("Connection lost");
        request.fetch.mockRejectedValueOnce(error);
        const { screen, input, fallback } = await submit();

        await waitFor(() => {
            expect(fallback).toHaveBeenCalledWith(error);
        });
        const store = vi
            .mocked(FormStore.prototype.registerField)
            .mock.contexts.at(-1) as FormStore;
        expect(store.getState().submitting).toBe(false);
        expect((input as HTMLInputElement).value).toBe("draft");
        expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(
            false
        );
    });

    it("ignores a canceled submission failure after unmounting", async () => {
        let reject: (error: Error) => void = () => {
            throw new Error("Request not started");
        };
        request.fetch.mockImplementationOnce(() => {
            return new Promise((_resolve, rejectRequest) => {
                reject = rejectRequest;
            });
        });
        const onError = vi.fn();
        const { screen, fallback } = await submit(onError);
        const signal = request.fetch.mock.calls[1][0].signal;
        screen.unmount();

        await act(async () => {
            reject(new Error("Canceled request"));
        });
        expect(signal.aborted).toBe(true);
        expect(onError).not.toHaveBeenCalled();
        expect(fallback).not.toHaveBeenCalled();
    });
});

it("a superseded request failure does not stop or handle the newer submission", async () => {
    let rejectFirst: (error: Error) => void = () => {
        throw new Error("First request not started");
    };
    let rejectSecond: (error: Error) => void = () => {
        throw new Error("Second request not started");
    };
    request.fetch.mockImplementationOnce(() => {
        return new Promise((_resolve, reject) => {
            rejectFirst = reject;
        });
    });
    request.fetch.mockImplementationOnce(() => {
        return new Promise((_resolve, reject) => {
            rejectSecond = reject;
        });
    });
    const onError = vi.fn();
    const { screen, fallback } = await submit(onError);
    fireEvent.submit(screen.container.querySelector("form")!);
    await waitFor(() => {
        expect(request.fetch).toHaveBeenCalledTimes(3);
    });

    await act(async () => {
        rejectFirst(new Error("Old failure"));
    });
    expect(request.fetch.mock.calls[1][0].signal.aborted).toBe(true);
    expect(onError).not.toHaveBeenCalled();
    expect(fallback).not.toHaveBeenCalled();
    const store = vi.mocked(FormStore.prototype.registerField).mock.contexts.at(-1) as FormStore;
    expect(store.getState().submitting).toBe(true);
    expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(true);

    await act(async () => {
        rejectSecond(new Error("Current failure"));
    });
    expect(onError).toHaveBeenCalledOnce();
    expect(onError.mock.calls[0][0].detail).toBe("Current failure");
    expect(store.getState().submitting).toBe(false);
    expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(
        false
    );
});

it("initial loading errors use provider handling before a CRUD form is available", async () => {
    request.fetch.mockReset();
    const error = new Error("Loading failed");
    request.fetch.mockRejectedValueOnce(error);
    const onError = vi.fn();
    const fallback = vi.fn();
    const screen = render(<Harness onError={onError} fallback={fallback} />);

    await waitFor(() => {
        expect(fallback).toHaveBeenCalledWith(error);
    });
    expect(onError).not.toHaveBeenCalled();
    expect(screen.queryByRole("textbox")).toBe(null);
});

it("allows a form error callback to delegate authentication failures to the provider", async () => {
    request.fetch.mockResolvedValueOnce({
        response: { status: 401, statusText: "Unauthorized" },
        data: { detail: "Session expired" }
    });
    const onError = vi.fn(() => false);
    const { input, fallback } = await submit(onError);

    await waitFor(() => {
        expect(fallback).toHaveBeenCalledOnce();
    });
    expect(onError).toHaveBeenCalledWith({
        status: 401,
        detail: "Session expired",
        trace: undefined
    });
    expect((input as HTMLInputElement).value).toBe("draft");
    const store = vi.mocked(FormStore.prototype.registerField).mock.contexts.at(-1) as FormStore;
    expect(store.getState().submitting).toBe(false);
});
