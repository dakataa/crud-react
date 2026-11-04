import React, { createRef, StrictMode } from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
    choiceList,
    choiceToken,
    selectionTokens
} from "@crud-react/component/form/formChoices.ts";
import { initialFieldValue, selectedValues } from "@crud-react/component/form/formView.ts";
import { Form, UseForm } from "@crud-react/component/form/Form.tsx";
import type { FormRef } from "@crud-react/component/form/Form.tsx";
import type { FormStore } from "@crud-react/component/form/FormStore.ts";
import Choice from "@crud-react/component/form/Choice.tsx";
import { FormViewProvider } from "@crud-react/component/crud/form/Form.tsx";
import type { ChoiceType, FormViewType } from "@crud-react/type/FormViewType.tsx";

vi.mock("@crud-react/Crud.tsx", () => ({ CrudRequester: vi.fn() }));
vi.mock("@crud-react/component/crud/CrudLoader.tsx", () => ({ UseCurrentActionRequest: vi.fn() }));

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const choiceView = (multiple = false, expanded = false): FormViewType => {
    return {
        type: "choice",
        full_name: "form[choice]",
        data: multiple ? ["a"] : "a",
        multiple,
        expanded,
        choices: [
            { value: "a", label: "A" },
            { value: "b", label: "B" },
            { value: 0, label: "Zero" }
        ]
    };
};

describe("Choice helpers", () => {
    it("resolves function choice values with their metadata and preserves zero and empty tokens", () => {
        const resolve = vi.fn((choice: ChoiceType) => choice.data!.id);
        const choice: ChoiceType = { value: resolve, label: "Zero", data: { id: 0 } };

        expect(choiceToken(choice)).toBe("0");
        expect(resolve).toHaveBeenCalledExactlyOnceWith(choice);
        expect(choiceToken({ value: 0, label: "Zero" })).toBe("0");
        expect(choiceToken({ value: null, label: "Placeholder" })).toBe("");
        expect(choiceToken({ value: () => undefined, label: "Missing" })).toBe("");
        expect(choiceToken({ value: () => null, label: "Cleared" })).toBe("");
        expect(choiceToken({ value: "", label: "Empty" })).toBe("");
    });

    it("normalizes selections without mutating arrays or removing explicit empty array tokens", () => {
        const choice: ChoiceType = { value: "a", label: "A" };
        const choices = [choice];
        const tokens = ["", "0", "a"];

        expect(choiceList(null)).toEqual([]);
        expect(choiceList(undefined)).toEqual([]);
        expect(choiceList(choice)).toEqual([choice]);
        expect(choiceList(choices)).toBe(choices);
        expect(choiceList(choices).map(choiceToken)).toEqual(["a"]);
        expect(selectionTokens(undefined)).toEqual([]);
        expect(selectionTokens(null)).toEqual([]);
        expect(selectionTokens("")).toEqual([]);
        expect(selectionTokens("0")).toEqual(["0"]);
        expect(selectionTokens(tokens)).toBe(tokens);
        expect(tokens).toEqual(["", "0", "a"]);
        expect(selectedValues("")).toEqual([""]);
    });
});

describe("Choice rendering and selection", () => {
    it.each([
        { expanded: false, keyed: false },
        { expanded: true, keyed: false },
        { expanded: false, keyed: true },
        { expanded: true, keyed: true }
    ])(
        "preserves grouped choices when reordered (expanded=$expanded, keyed=$keyed)",
        ({ expanded, keyed }) => {
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
                    { label: "Main", choices: keyed ? { a: first } : [first] },
                    { label: "Other", choices: keyed ? { b: second, c: third } : [second, third] }
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
                        {
                            label: "Other",
                            choices: keyed ? { c: third, b: second } : [third, second]
                        },
                        { label: "Main", choices: keyed ? { a: first } : [first] }
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

    it.each([false, true])(
        "initializes and preserves function-valued choice controls when reordered (expanded=%s)",
        (expanded) => {
            const ref = createRef<FormRef>();
            const value = (token: string) => () => token;
            const first: ChoiceType = { value: value("0"), label: "Zero" };
            const second: ChoiceType = { value: value("b"), label: "Beta" };
            const checked = vi.fn((token: string) => token === "0");
            const view: FormViewType = {
                type: "choice",
                full_name: "choice",
                expanded,
                checked: expanded ? checked : undefined,
                choices: [{ label: "Group", choices: [first, second] }]
            };
            const tree = (schema: FormViewType) => (
                <Form ref={ref}>
                    <Choice view={schema} />
                </Form>
            );
            const result = render(tree(view));

            expect(ref.current!.getFormData().get("choice")).toBe("0");

            if (expanded) {
                expect(checked).toHaveBeenCalledWith("0");
                fireEvent.click(result.getByLabelText("Beta"));
            } else {
                fireEvent.change(result.getByRole("combobox"), { target: { value: "b" } });
            }

            const original = expanded
                ? result.getByLabelText("Beta")
                : result.getByRole("option", { name: "Beta" });
            result.rerender(
                tree({ ...view, choices: [{ label: "Group", choices: [second, first] }] })
            );

            expect(
                expanded
                    ? result.getByLabelText("Beta")
                    : result.getByRole("option", { name: "Beta" })
            ).toBe(original);
            expect(ref.current!.getFormData().get("choice")).toBe("b");
        }
    );

    it("keeps select label fallback separate from empty choice tokens", () => {
        const ref = createRef<FormRef>();
        const view: FormViewType = {
            type: "choice",
            full_name: "choice",
            choices: [{ value: null, label: () => "Fallback" }]
        };
        const result = render(
            <Form ref={ref}>
                <Choice view={view} />
            </Form>
        );

        expect(initialFieldValue(view)).toBe("Fallback");
        expect((result.getByRole("option") as HTMLOptionElement).value).toBe("Fallback");
        expect(ref.current!.getFormData().get("choice")).toBe("Fallback");
        expect(choiceToken(view.choices![0] as ChoiceType)).toBe("");
    });

    it("expanded checked predicates initialize multiple selection but do not control later edits", () => {
        const view = {
            ...choiceView(true, true),
            data: undefined,
            checked: (value: string) => value === "b"
        };
        const result = render(
            <Form>
                <Choice view={view} />
            </Form>
        );
        expect((result.getByLabelText("B") as HTMLInputElement).checked).toBe(true);
        fireEvent.click(result.getByLabelText("B"));
        expect((result.getByLabelText("B") as HTMLInputElement).checked).toBe(false);
    });

    it("expanded field callbacks run once and may cancel a change", () => {
        const callback = vi.fn((event: React.ChangeEvent<HTMLInputElement>) =>
            event.preventDefault()
        );
        const result = render(
            <Form>
                <Choice view={{ ...choiceView(false, true), attr: { onChange: callback } }} />
            </Form>
        );
        fireEvent.click(result.getByLabelText("B"));
        expect(callback).toHaveBeenCalledOnce();
        expect((result.getByLabelText("A") as HTMLInputElement).checked).toBe(true);
    });

    it("changing a select from multiple to single preserves a valid scalar value", () => {
        const ref = createRef<FormRef>();
        const result = render(
            <Form ref={ref}>
                <Choice view={choiceView(true)} />
            </Form>
        );
        act(() => ref.current!.setValue("form[choice]", ["b", "0"]));
        result.rerender(
            <Form ref={ref}>
                <Choice view={choiceView(false)} />
            </Form>
        );
        expect(ref.current!.getFormData().get("form[choice]")).toBe("b");
    });

    it("choice defaults and explicitly cleared or temporarily missing choices match FormData", () => {
        const ref = createRef<FormRef>();
        const view = { ...choiceView(), data: undefined };
        const result = render(
            <Form ref={ref}>
                <Choice view={view} />
            </Form>
        );
        expect(ref.current!.getFormData().get("form[choice]")).toBe("a");
        act(() => ref.current!.setValue("form[choice]", ""));
        expect(result.container.querySelector("select")!.value).toBe("");
        expect(ref.current!.getFormData().get("form[choice]")).toBe("");
        act(() => ref.current!.setValue("form[choice]", "b"));
        result.rerender(
            <Form ref={ref}>
                <Choice view={{ ...view, choices: [{ value: "a", label: "A" }] }} />
            </Form>
        );
        expect(result.container.querySelector("select")!.value).toBe("b");
        expect(ref.current!.getFormData().get("form[choice]")).toBe("b");
    });
});

describe("Choice validation and placeholders", () => {
    it("required expanded multiple choice requires one selection and supports immediate setValue then submit", () => {
        const submit = vi.fn();
        const ref = createRef<FormRef>();
        const result = render(
            <Form ref={ref} onSubmit={submit}>
                <Choice view={{ ...choiceView(true, true), data: [], required: true }} />
            </Form>
        );
        expect(result.container.querySelector("form")!.checkValidity()).toBe(false);
        act(() => {
            ref.current!.setValue("form[choice][]", ["b"]);
            ref.current!.submit();
        });
        expect(submit).toHaveBeenCalledOnce();
        expect(submit.mock.calls[0][0].getAll("form[choice][]")).toEqual(["b"]);
    });

    it("expanded empty placeholder stays selected through imperative reads and submission", () => {
        const ref = createRef<FormRef>();
        const onSubmit = vi.fn();
        const view = {
            ...choiceView(false, true),
            placeholder: "Choose an option",
            checked: () => false
        };
        const screen = render(
            <Form ref={ref} onSubmit={onSubmit}>
                <Choice view={view} />
            </Form>
        );
        const placeholder = screen.getByLabelText("Choose an option") as HTMLInputElement;
        expect(placeholder.checked).toBe(true);
        expect(ref.current!.getFormData().get("form[choice]")).toBe("");
        expect(placeholder.checked).toBe(true);

        act(() => {
            ref.current!.submit();
        });
        expect(onSubmit.mock.calls[0][0].get("form[choice]")).toBe("");
        fireEvent.click(screen.getByLabelText("A"));
        expect(ref.current!.getFormData().get("form[choice]")).toBe("a");

        act(() => {
            ref.current!.setValue("form[choice]", null);
        });
        expect(ref.current!.getFormData().get("form[choice]")).toBe("");
        expect(placeholder.checked).toBe(true);
    });
});

describe("Choice value lifecycle", () => {
    it.each([false, true])("select multiple=%s preserves selection through remount", (multiple) => {
        const ref = createRef<FormRef>();
        const view = choiceView(multiple);

        const tree = (shown: boolean) => {
            return <Form ref={ref}>{shown && <Choice view={view} />}</Form>;
        };

        const result = render(tree(true));
        const select = result.container.querySelector("select")!;
        act(() => ref.current!.setValue(view.full_name!, multiple ? ["b", "0"] : "0"));
        result.rerender(tree(false));
        result.rerender(tree(true));
        const restored = result.container.querySelector("select")!;
        expect(Array.from(restored.selectedOptions).map((option) => option.value)).toEqual(
            multiple ? ["b", "0"] : ["0"]
        );
        expect(ref.current!.getFormData().getAll(view.full_name!)).toEqual(
            multiple ? ["b", "0"] : ["0"]
        );
        expect(select).not.toBe(restored);
    });

    it.each([false, true])(
        "expanded choices multiple=%s use current selection and preserve it",
        (multiple) => {
            const view = choiceView(multiple, true);
            const ref = createRef<FormRef>();

            const tree = (shown: boolean) => {
                return (
                    <StrictMode>
                        <Form ref={ref}>{shown && <Choice view={view} />}</Form>
                    </StrictMode>
                );
            };

            const result = render(tree(true));
            fireEvent.click(result.getByLabelText("B"));

            if (multiple) {
                fireEvent.click(result.getByLabelText("A"));
            }

            result.rerender(tree(false));
            result.rerender(tree(true));
            expect((result.getByLabelText("B") as HTMLInputElement).checked).toBe(true);
            expect((result.getByLabelText("A") as HTMLInputElement).checked).toBe(false);
            expect(
                ref.current!.getFormData().getAll("form[choice]" + (multiple ? "[]" : ""))
            ).toEqual(["b"]);
        }
    );
});

describe("Choice value transforms", () => {
    it("uses transformed tokens for expanded choice initialization and submission", () => {
        const ref = createRef<FormRef>();
        const view: FormViewType = {
            type: "choice",
            full_name: "choice",
            expanded: true,
            multiple: true,
            checked: (token) => token === "token-0",
            choices: [
                { value: () => 0, label: "Zero" },
                { value: () => "b", label: "Beta" }
            ]
        };
        const transform = (choice: ChoiceType) => `token-${choiceToken(choice)}`;
        const result = render(
            <Form ref={ref}>
                <Choice view={view} choiceValueTransform={transform} />
            </Form>
        );

        expect(ref.current!.getFormData().getAll("choice[]")).toEqual(["token-0"]);
        fireEvent.click(result.getByLabelText("Beta"));
        expect(ref.current!.getFormData().getAll("choice[]")).toEqual(["token-0", "token-b"]);
    });

    it.each([false, true])(
        "expanded choice initialization uses transformed tokens (multiple=%s)",
        (multiple) => {
            const ref = createRef<FormRef>();
            const onSubmit = vi.fn();
            const view = {
                ...choiceView(multiple, true),
                checked: (token: string) => token === "token-a"
            };
            const root: FormViewType = {
                type: "form",
                full_name: "form",
                children: { choice: view }
            };
            const transform = (choice: any) => {
                return `token-${choice.value}`;
            };
            const tree = (visible: boolean) => {
                return (
                    <StrictMode>
                        <Form ref={ref} onSubmit={onSubmit}>
                            <FormViewProvider view={root}>
                                {visible && <Choice view={view} choiceValueTransform={transform} />}
                            </FormViewProvider>
                        </Form>
                    </StrictMode>
                );
            };
            const screen = render(tree(true));
            const name = multiple ? "form[choice][]" : "form[choice]";
            expect(ref.current!.getFormData().getAll(name)).toEqual(["token-a"]);
            fireEvent.click(screen.getByLabelText("B"));
            const edited = multiple ? ["token-a", "token-b"] : ["token-b"];
            expect(ref.current!.getFormData().getAll(name)).toEqual(edited);
            screen.rerender(tree(false));
            screen.rerender(tree(true));
            expect(ref.current!.getFormData().getAll(name)).toEqual(edited);

            act(() => {
                ref.current!.reset();
                ref.current!.submit();
            });
            expect(onSubmit.mock.calls[0][0].getAll(name)).toEqual(["token-a"]);
        }
    );

    it.each(["refresh", "saved"] as const)(
        "transformed choice defaults follow a %s response",
        (syncMode) => {
            const ref = createRef<FormRef>();
            let store: FormStore;
            function Access() {
                store = UseForm().store;

                return null;
            }
            const transform = (choice: any) => {
                return `token-${choice.value}`;
            };
            const viewFor = (selected: string): FormViewType => {
                return {
                    ...choiceView(false, true),
                    checked: (token: string) => token === selected
                };
            };
            const tree = (
                view: FormViewType,
                submission?: ReturnType<FormStore["snapshot"]>,
                visible = true
            ) => {
                return (
                    <Form ref={ref}>
                        <Access />
                        <FormViewProvider
                            view={{ type: "form", full_name: "form", children: { choice: view } }}
                            syncMode={syncMode}
                            submission={submission}>
                            {visible && <Choice view={view} choiceValueTransform={transform} />}
                        </FormViewProvider>
                    </Form>
                );
            };
            const screen = render(tree(viewFor("token-a")));
            expect(ref.current!.getFormData().get("form[choice]")).toBe("token-a");
            const submission = store!.snapshot();
            screen.rerender(tree(viewFor("token-b"), submission, false));
            expect(store!.getValue("form[choice]")).toBe("token-b");
            screen.rerender(tree(viewFor("token-b"), submission));
            expect(ref.current!.getFormData().get("form[choice]")).toBe("token-b");

            act(() => {
                ref.current!.setValue("form[choice]", "token-a");
                ref.current!.reset();
            });
            expect(ref.current!.getFormData().get("form[choice]")).toBe("token-b");

            const latestSubmission = store!.snapshot();
            act(() => {
                ref.current!.setValue("form[choice]", "token-a");
            });
            screen.rerender(tree(viewFor("token-0"), latestSubmission));
            expect(ref.current!.getFormData().get("form[choice]")).toBe("token-a");

            act(() => {
                ref.current!.reset();
            });
            expect(ref.current!.getFormData().get("form[choice]")).toBe("token-0");
        }
    );
});
