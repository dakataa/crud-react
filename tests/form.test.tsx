import React, { createRef, StrictMode } from 'react';
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
    Form,
    FormRef,
    UseForm,
    useFormState,
    useFormField,
    useFormCollection
} from '../src/component/form/Form.tsx';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from '../src/context/ConfigContext.tsx';
import DynamicView, { UseDynamicView } from '../src/component/crud/DynamicView.tsx';
import FormRest from '../src/component/crud/form/FormRest.tsx';
import FormRestError from '../src/component/crud/form/FormRestError.tsx';
import { formSessionKey } from '../src/component/form/formSession.ts';
import Input from '../src/component/form/Input.tsx';
import Textarea from '../src/component/form/Textarea.tsx';
import Choice from '../src/component/form/Choice.tsx';
import CrudForm, { FormViewProvider } from '../src/component/crud/form/Form.tsx';
import FormGroupViewLoader from '../src/component/crud/form/FormGroupViewLoader.tsx';
import FormField from '../src/component/crud/form/FormField.tsx';
import { FormStore } from '../src/component/form/FormStore.ts';
import { formDefaults, formErrors, instantiateView } from '../src/component/form/formView.ts';
import { FormViewType } from '../src/type/FormViewType.tsx';
import { Constraint } from '../src/component/form/constraint/Contraint.tsx';

const request = vi.hoisted(() => {
    return {
        actionRequest: {
            action: { entity: 'item', name: 'edit', namespace: 'test' },
            parameters: { id: 1 }
        } as any,
        provider: null as any,
        set: vi.fn(),
        navigate: vi.fn()
    };
});
vi.mock('@crud-react/context/ActionContext.tsx', () => {
    return {
        UseActions: () => {
            return {
                navigate: request.navigate,
                generateLink: () => '/saved',
                generateActionLink: () => '/edit'
            };
        }
    };
});
vi.mock('@crud-react/context/GetData.tsx', () => {
    return {
        UseDataProvider: () => request.provider
    };
});
vi.mock('@crud-react/component/crud/CrudLoader.tsx', () => {
    return {
        UseCurrentActionRequest: () => {
            return { actionRequest: request.actionRequest, setActionRequest: request.set };
        }
    };
});
vi.mock('@crud-react/component/Link.tsx', () => {
    return {
        default: ({ children, onClick }: any) => {
            return (
                <button type="button" onClick={onClick}>
                    {children}
                </button>
            );
        }
    };
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});
beforeEach(() => {
    request.actionRequest = {
        action: { entity: 'item', name: 'edit', namespace: 'test' },
        parameters: { id: 1 }
    };
    request.provider = null;
    request.set.mockClear();
    request.navigate.mockClear();
});

const textView = (data = 'backend'): FormViewType => {
    return {
        type: 'text',
        name: 'title',
        full_name: 'form[title]',
        id: 'title',
        label: 'Title',
        data
    };
};

const rootView = (data = 'backend'): FormViewType => {
    return {
        type: 'form',
        name: 'form',
        full_name: 'form',
        id: 'form',
        children: { title: textView(data) }
    };
};

const choiceView = (multiple = false, expanded = false): FormViewType => {
    return {
        type: 'choice',
        full_name: 'form[choice]',
        data: multiple ? ['a'] : 'a',
        multiple,
        expanded,
        choices: [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
            { value: 0, label: 'Zero' }
        ]
    };
};

const collectionView = (): FormViewType => {
    return {
        type: 'form',
        full_name: 'form',
        children: {
            rows: {
                type: 'collection',
                name: 'rows',
                full_name: 'form[rows]',
                id: 'rows',
                label: 'Rows',
                children: {
                    old: {
                        type: 'form',
                        name: 'old',
                        full_name: 'form[rows][old]',
                        children: {
                            title: {
                                type: 'text',
                                name: 'title',
                                full_name: 'form[rows][old][title]',
                                id: 'old_title',
                                label: 'Title',
                                data: 'old'
                            }
                        }
                    }
                },
                prototype: {
                    type: 'form',
                    name: '__name__',
                    full_name: 'form[rows][__name__]',
                    children: {
                        title: {
                            type: 'text',
                            name: 'title',
                            full_name: 'form[rows][__name__][title]',
                            id: 'rows___name___title',
                            label: 'Title',
                            data: ''
                        }
                    }
                }
            }
        }
    };
};

const constraint = (valid: (value: any) => boolean, message = 'Invalid'): Constraint => {
    return {
        message,
        options: {},
        isValid: valid,
        getMessage: () => message
    };
};

it.each([
    ['input', Input, textView()],
    ['textarea', Textarea, { ...textView(), type: 'textarea' }]
])('%s preserves edits through rerender and remount', (_, Component, view) => {
    const ref = createRef<FormRef>();

    const tree = (shown: boolean, schema = view) => {
        return (
            <StrictMode>
                <Form ref={ref}>{shown && <Component view={schema} />}</Form>
            </StrictMode>
        );
    };

    const result = render(tree(true));
    const original = result.container.querySelector('input,textarea') as HTMLInputElement;
    fireEvent.change(original, { target: { value: 'draft' } });
    result.rerender(tree(true, { ...view, label: 'changed' }));
    expect(result.container.querySelector('input,textarea')).toBe(original);
    result.rerender(tree(false));
    result.rerender(tree(true));
    expect((result.container.querySelector('input,textarea') as HTMLInputElement).value).toBe(
        'draft'
    );
    expect(view.data).toBe('backend');
});

it('setValue works while hidden, and getFormData reads it synchronously when mounted', () => {
    const ref = createRef<FormRef>();

    const tree = (shown: boolean) => {
        return <Form ref={ref}>{shown && <Input view={textView()} />}</Form>;
    };

    const result = render(tree(false));
    act(() => ref.current!.setValue('form[title]', 'hidden draft'));
    expect(ref.current!.getFormData().has('form[title]')).toBe(false);
    result.rerender(tree(true));
    expect(result.getByRole('textbox').getAttribute('value')).toBe('hidden draft');
    act(() => {
        ref.current!.setValue('form[title]', 'immediate');
        expect(ref.current!.getFormData().get('form[title]')).toBe('immediate');
    });
});

it('preserves an explicitly cleared field through backend refresh', () => {
    const tree = (view: FormViewType) => {
        return (
            <Form>
                <FormViewProvider view={view}>
                    <FormGroupViewLoader />
                </FormViewProvider>
            </Form>
        );
    };

    const result = render(tree(rootView()));
    fireEvent.change(result.getByRole('textbox'), { target: { value: '' } });
    result.rerender(tree(rootView('new backend')));
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('');
});

it('refresh updates pristine fields and reset uses the new baseline', () => {
    const ref = createRef<FormRef>();

    const tree = (view: FormViewType) => {
        return (
            <Form ref={ref}>
                <FormViewProvider view={view}>
                    <FormGroupViewLoader />
                </FormViewProvider>
            </Form>
        );
    };

    const result = render(tree(rootView()));
    result.rerender(tree(rootView('refreshed')));
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('refreshed');
    fireEvent.change(result.getByRole('textbox'), { target: { value: 'draft' } });
    act(() => ref.current!.reset());
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('refreshed');
});

it('reset restores hidden fields and clears errors and success, invoking callback once', () => {
    const ref = createRef<FormRef>();
    const reset = vi.fn();
    let state: any;

    function Probe() {
        state = useFormState();

        return null;
    }

    const tree = (shown: boolean) => {
        return (
            <Form ref={ref} onReset={reset}>
                {shown && <Input view={textView()} />}
                <Probe />
                <button type="reset">Reset</button>
            </Form>
        );
    };

    const result = render(tree(true));
    fireEvent.change(result.getByRole('textbox'), { target: { value: 'draft' } });
    act(() => {
        ref.current!.setErrors({ 'form[title]': [{ message: 'server' }] });
        ref.current!.success();
    });
    result.rerender(tree(false));
    fireEvent.click(result.getByText('Reset'));
    result.rerender(tree(true));
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('backend');
    expect(state.errors).toEqual({});
    expect(state.success).toBe(false);
    expect(reset).toHaveBeenCalledTimes(1);
    act(() => ref.current!.reset());
    expect(reset).toHaveBeenCalledTimes(2);
});

it.each([false, true])('select multiple=%s preserves selection through remount', (multiple) => {
    const ref = createRef<FormRef>();
    const view = choiceView(multiple);

    const tree = (shown: boolean) => {
        return <Form ref={ref}>{shown && <Choice view={view} />}</Form>;
    };

    const result = render(tree(true));
    const select = result.container.querySelector('select')!;
    act(() => ref.current!.setValue(view.full_name!, multiple ? ['b', '0'] : '0'));
    result.rerender(tree(false));
    result.rerender(tree(true));
    const restored = result.container.querySelector('select')!;
    expect(Array.from(restored.selectedOptions).map((option) => option.value)).toEqual(
        multiple ? ['b', '0'] : ['0']
    );
    expect(ref.current!.getFormData().getAll(view.full_name!)).toEqual(
        multiple ? ['b', '0'] : ['0']
    );
    expect(select).not.toBe(restored);
});

it.each([false, true])(
    'expanded choices multiple=%s use current selection and preserve it',
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
        fireEvent.click(result.getByLabelText('B'));

        if (multiple) {
            fireEvent.click(result.getByLabelText('A'));
        }

        result.rerender(tree(false));
        result.rerender(tree(true));
        expect((result.getByLabelText('B') as HTMLInputElement).checked).toBe(true);
        expect((result.getByLabelText('A') as HTMLInputElement).checked).toBe(false);
        expect(ref.current!.getFormData().getAll('form[choice]' + (multiple ? '[]' : ''))).toEqual([
            'b'
        ]);
    }
);

it('checkbox selection is independent from its submitted token', () => {
    const view: FormViewType = { type: 'checkbox', full_name: 'agree', value: 'yes', data: true };
    const ref = createRef<FormRef>();

    const tree = (shown: boolean) => {
        return <Form ref={ref}>{shown && <Input view={view} />}</Form>;
    };

    const result = render(tree(true));
    expect(ref.current!.getFormData().get('agree')).toBe('yes');
    fireEvent.click(result.getByRole('checkbox'));
    result.rerender(tree(false));
    result.rerender(tree(true));
    expect((result.getByRole('checkbox') as HTMLInputElement).checked).toBe(false);
    expect(ref.current!.getFormData().has('agree')).toBe(false);
});

it('setFormData handles cached hidden fields, multiple selections, unchecked groups and native controls', () => {
    const ref = createRef<FormRef>();
    const view = choiceView(true, true);

    const tree = (shown: boolean) => {
        return (
            <Form ref={ref}>
                {shown && <Input view={textView()} />}
                <Choice view={view} />
                <input name="native" defaultValue="native default" />
            </Form>
        );
    };

    const result = render(tree(true));
    result.rerender(tree(false));
    const data = new FormData();
    data.set('form[title]', 'restored');
    data.append('form[choice][]', 'b');
    data.set('native', 'native new');
    act(() => ref.current!.setFormData(data));
    result.rerender(tree(true));
    expect(ref.current!.getFormData().get('form[title]')).toBe('restored');
    expect(ref.current!.getFormData().getAll('form[choice][]')).toEqual(['b']);
    expect(ref.current!.getFormData().get('native')).toBe('native new');
    act(() => {
        return ref.current!.setFormData(new FormData());
    });
    expect(ref.current!.getFormData().getAll('form[choice][]')).toEqual([]);
});

it('submit retains native successful-control rules, custom controls and the submitter', () => {
    const submit = vi.fn();
    const result = render(
        <Form onSubmit={submit}>
            <Input view={textView()} />
            <Input view={{ ...textView("disabled"), full_name: "disabled", disabled: true }} />
            <fieldset disabled>
                <Input view={{ ...textView("fieldset"), full_name: "fieldset" }} />
            </fieldset>
            <Input view={{ type: "hidden", full_name: "token", data: "secret" }} />
            <input name="native" defaultValue="native" />
            <button type="submit" name="action" value="save">
                Save
            </button>
        </Form>
    );
    fireEvent.click(result.getByText('Save'));
    const data: FormData = submit.mock.calls[0][0];
    expect(data.get('form[title]')).toBe('backend');
    expect(data.get('token')).toBe('secret');
    expect(data.get('native')).toBe('native');
    expect(data.get('action')).toBe('save');
    expect(data.has('disabled')).toBe(false);
    expect(data.has('fieldset')).toBe(false);
});

it('validation reads the new value, updates constraints, and does not block on hidden fields', () => {
    const submit = vi.fn();
    const ref = createRef<FormRef>();
    const valid = constraint((value) => value === 'valid');
    const invalid = constraint(() => false, 'Changed rule');

    const tree = (shown: boolean, rules: Constraint[]) => {
        return (
            <Form ref={ref} onSubmit={submit}>
                {shown && <Input view={textView()} constraints={rules} />}
            </Form>
        );
    };

    const result = render(tree(true, [valid]));
    fireEvent.change(result.getByRole('textbox'), { target: { value: 'valid' } });
    expect(result.getByRole('textbox').getAttribute('aria-invalid')).toBe('false');
    result.rerender(tree(true, [invalid]));
    fireEvent.change(result.getByRole('textbox'), { target: { value: 'other' } });
    expect(result.getByRole('textbox').getAttribute('aria-invalid')).toBe('true');
    fireEvent.submit(result.container.querySelector('form')!);
    expect(submit).not.toHaveBeenCalled();
    result.rerender(tree(false, [invalid]));
    fireEvent.submit(result.container.querySelector('form')!);
    expect(submit).toHaveBeenCalledOnce();
});

it('does not rerender unrelated fields on input or changing field errors', () => {
    const counts = Array(40).fill(0);
    const fields = counts.map((_, index) => {
        return (
            <Input
                key={index}
                view={{
                    type: "text",
                    full_name: `field${index}`,
                    data: "",
                    attr: () => {
                        counts[index]++;

                        return {};
                    }
                }}
                constraints={index === 0 ? [constraint((value) => !!value)] : undefined}
            />
        );
    });
    const result = render(<Form>{fields}</Form>);
    counts.fill(0);
    fireEvent.change(result.getAllByRole('textbox')[0], { target: { value: 'typed' } });
    expect(counts[0]).toBeGreaterThan(0);
    expect(counts.slice(1)).toEqual(Array(39).fill(0));
    counts.fill(0);
    fireEvent.change(result.getAllByRole('textbox')[0], { target: { value: '' } });
    expect(counts.slice(1)).toEqual(Array(39).fill(0));
});

it('supports a custom controlled field through the public binding hook', () => {
    function Custom() {
        const field = useFormField(textView());

        return (
            <input
                aria-label="custom"
                name="form[title]"
                value={field.value as string}
                onChange={(event) => field.change(event.target.value)}
            />
        );
    }
    const result = render(
        <Form>
            <Custom />
        </Form>
    );
    fireEvent.change(result.getByLabelText('custom'), { target: { value: 'custom draft' } });
    expect((result.getByLabelText('custom') as HTMLInputElement).value).toBe('custom draft');
});

it('datetime defaults retain the time', () => {
    const result = render(
        <Form>
            <Input
                view={{
                    type: "datetime",
                    full_name: "date",
                    data: { date: "2026-10-09T10:30:00" }
                }}
            />
        </Form>
    );
    expect((result.container.querySelector('input') as HTMLInputElement).value).toBe(
        '2026-10-09T10:30'
    );
});

it('collections preserve additions, deletions and values through remount, and reset restores the baseline', () => {
    const view = collectionView();
    const ref = createRef<FormRef>();

    const tree = (shown: boolean) => {
        return (
            <StrictMode>
                <Form ref={ref}>
                    <FormViewProvider view={view}>
                        {shown && <FormGroupViewLoader />}
                    </FormViewProvider>
                </Form>
            </StrictMode>
        );
    };

    const result = render(tree(true));
    fireEvent.click(result.getByText('+ Add'));
    const added = result.getAllByRole('textbox')[1] as HTMLInputElement;
    const addedName = added.name;
    fireEvent.change(added, { target: { value: 'new row draft' } });
    fireEvent.click(result.getAllByText('Delete')[0]);
    expect(result.getAllByRole('textbox')).toHaveLength(1);
    result.rerender(tree(false));
    result.rerender(tree(true));
    expect(result.getAllByRole('textbox')).toHaveLength(1);
    expect((result.getByRole('textbox') as HTMLInputElement).name).toBe(addedName);
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('new row draft');
    expect(ref.current!.getFormData().has('form[rows][old][title]')).toBe(false);
    act(() => ref.current!.reset());
    expect(result.getAllByRole('textbox')).toHaveLength(1);
    expect((result.getByRole('textbox') as HTMLInputElement).name).toBe('form[rows][old][title]');
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('old');
});

it.each([false, true])(
    'removing a collection row immediately excludes its constraints and submitted values (required=%s)',
    (required) => {
        const ref = createRef<FormRef>();
        const submit = vi.fn();
        const rules = [constraint(() => false)];

        function Rows() {
            const rows = useFormCollection('rows', ['old']);

            return (
                <>
                    {rows.items.map((name) => {
                        return (
                            <Input
                                key={name}
                                view={{
                                    type: "text",
                                    full_name: `rows[${name}][title]`,
                                    data: "",
                                    required
                                }}
                                constraints={rules}
                            />
                        );
                    })}
                    <button
                        type="button"
                        onClick={() => {
                            rows.remove("old");
                            ref.current!.submit();
                        }}>
                        Remove and submit
                    </button>
                </>
            );
        }
        const result = render(
            <Form ref={ref} onSubmit={submit}>
                <Rows />
            </Form>
        );
        fireEvent.click(result.getByText('Remove and submit'));
        expect(submit).toHaveBeenCalledOnce();
        expect(submit.mock.calls[0][0].has('rows[old][title]')).toBe(false);
    }
);

it('prototypes preserve callbacks and nested collection placeholders without mutating the schema', () => {
    const callback = vi.fn();
    const view = collectionView().children!.rows;
    view.prototype!.children!.title.attr = { onChange: callback };
    view.prototype!.children!.nested = {
        type: 'collection',
        full_name: 'form[rows][__name__][nested]',
        prototype: { type: 'text', full_name: 'form[rows][__name__][nested][__name__]' }
    };
    const instance = instantiateView(view.prototype!, view, 'new', 0);
    expect(instance.children!.title.attr).toEqual({ onChange: callback });
    expect(instance.children!.nested.prototype!.full_name).toBe(
        'form[rows][new][nested][__name__]'
    );
    expect(view.prototype!.children!.title.full_name).toBe('form[rows][__name__][title]');
});

it('schema rendering accepts frozen views and applies the same overrides to standard fields', () => {
    const view = rootView();
    Object.freeze(view.children!.title);
    Object.freeze(view);
    const result = render(
        <Form>
            <FormViewProvider view={view}>
                <FormField
                    name="title"
                    options={{ label: "Override", placeholder: "Override placeholder" }}
                />
            </FormViewProvider>
        </Form>
    );
    expect(result.getByPlaceholderText('Override placeholder')).toBeTruthy();
});

describe('backend reconciliation', () => {
    it('keeps later edits on save, adopts normalized values for unchanged fields, and resets to persisted values', () => {
        const store = new FormStore();
        store.reconcile({ values: { a: 'initial', b: 'initial' }, collections: {} });
        store.setValue('a', 'submitted');
        store.setValue('b', 'submitted');
        const submission = store.snapshot();
        store.setValue('a', 'newer');
        store.reconcile(
            { values: { a: 'normalized', b: 'normalized' }, collections: {} },
            'saved',
            submission
        );
        expect(store.getValue('a')).toBe('newer');
        expect(store.getValue('b')).toBe('normalized');
        store.reset();
        expect(store.getValue('a')).toBe('normalized');
    });
    it('invalid response preserves the original reset baseline and rejects stale field errors', () => {
        const store = new FormStore();
        store.reconcile({ values: { a: 'initial' }, collections: {} });
        store.setValue('a', 'invalid');
        const submission = store.snapshot();
        store.setValue('a', 'fixed');
        store.reconcile({ values: { a: 'invalid' }, collections: {} }, 'invalid', submission);
        store.setErrors({ a: [{ message: 'stale' }], global: [{ message: 'global' }] }, submission);
        expect(store.getState().errors).toEqual({ global: [{ message: 'global' }] });
        expect(store.getValue('a')).toBe('fixed');
        store.reset();
        expect(store.getValue('a')).toBe('initial');
    });
    it('collects all errors with the same origin', () => {
        const view = rootView();
        view.errors = [{ message: 'root', origin: 'form[title]' }];
        view.children!.title.errors = [{ message: 'child' }];
        expect(formErrors(view)['form[title]'].map((error) => error.message)).toEqual([
            'root',
            'child'
        ]);
    });
    it('does not resurrect locally deleted collection rows during refresh', () => {
        const store = new FormStore();
        const defaults = formDefaults(collectionView());
        store.reconcile(defaults);
        store.removeItem('form[rows]', 'old');
        store.reconcile(defaults);
        expect(store.getCollection('form[rows]')).toEqual([]);
        expect(store.getValue('form[rows][old][title]')).toBeUndefined();
    });
});

it('CRUD handles invalid submit, retry, normalization and newer edits while the request is pending', async () => {
    const success = vi.fn();
    request.provider = { status: 200, results: { form: { modify: { view: rootView() } } } };
    const result = render(<CrudForm embedded onSuccess={success} />);
    const input = await result.findByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.submit(result.container.querySelector('form')!);
    expect(request.set.mock.calls[0][0].body.get('form[title]')).toBe('invalid');
    const invalid = rootView('invalid');
    invalid.submitted = true;
    invalid.children!.title.errors = [{ message: 'Server error' }];
    request.provider = { status: 422, results: { form: { modify: { view: invalid } } } };
    result.rerender(<CrudForm embedded onSuccess={success} />);
    await result.findByText('Server error');
    expect(success).not.toHaveBeenCalled();
    fireEvent.change(result.getByRole('textbox'), { target: { value: 'submitted' } });
    fireEvent.submit(result.container.querySelector('form')!);
    fireEvent.change(result.getByRole('textbox'), { target: { value: 'newer edit' } });
    const saved = rootView('normalized');
    saved.submitted = true;
    request.provider = { status: 200, results: { form: { modify: { view: saved } } } };
    result.rerender(<CrudForm embedded onSuccess={success} />);
    await waitFor(() => expect(success).toHaveBeenCalledOnce());
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('newer edit');
    result.rerender(<CrudForm embedded onSuccess={success} />);
    expect(success).toHaveBeenCalledOnce();
});

it('switching records with the same form id creates a new form session', async () => {
    request.provider = {
        status: 200,
        results: { form: { modify: { view: rootView('record one') } } }
    };
    const result = render(<CrudForm embedded />);
    fireEvent.change(await result.findByRole('textbox'), { target: { value: 'record one draft' } });
    request.actionRequest = { ...request.actionRequest, parameters: { id: 2 } };
    result.rerender(<CrudForm embedded />);
    expect(result.queryByRole('textbox')).toBeNull();
    request.provider = {
        status: 200,
        results: { form: { modify: { view: rootView('record two') } } }
    };
    result.rerender(<CrudForm embedded />);
    expect(((await result.findByRole('textbox')) as HTMLInputElement).value).toBe('record two');
});

it('local initial-value overrides survive root initialization, StrictMode and remount', () => {
    const view = rootView();
    const ref = createRef<FormRef>();

    const tree = (shown: boolean) => {
        return (
            <StrictMode>
                <Form ref={ref}>
                    <FormViewProvider view={view}>
                        {shown && <FormField name="title" options={{ data: "local default" }} />}
                    </FormViewProvider>
                </Form>
            </StrictMode>
        );
    };

    const result = render(tree(true));
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('local default');
    fireEvent.change(result.getByRole('textbox'), { target: { value: 'local draft' } });
    result.rerender(tree(false));
    result.rerender(tree(true));
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('local draft');
    act(() => ref.current!.reset());
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('local default');
    expect(view.children!.title.data).toBe('backend');
});

it('standalone radios with a shared name initialize and change as one group', () => {
    const ref = createRef<FormRef>();
    const result = render(
        <Form ref={ref}>
            <Input
                view={{ type: "radio", full_name: "radio", id: "a", value: "a", checked: false }}
            />
            <Input
                view={{ type: "radio", full_name: "radio", id: "b", value: "b", checked: true }}
            />
        </Form>
    );
    expect(ref.current!.getFormData().get('radio')).toBe('b');
    fireEvent.click(result.getAllByRole('radio')[0]);
    expect(ref.current!.getFormData().get('radio')).toBe('a');
});

it('standalone multiple checkboxes share array state', () => {
    const ref = createRef<FormRef>();
    const result = render(
        <Form ref={ref}>
            <Input
                view={{
                    type: "checkbox",
                    full_name: "boxes[]",
                    multiple: true,
                    value: "a",
                    checked: true
                }}
            />
            <Input
                view={{
                    type: "checkbox",
                    full_name: "boxes[]",
                    multiple: true,
                    value: "b",
                    checked: true
                }}
            />
        </Form>
    );
    expect(ref.current!.getFormData().getAll('boxes[]')).toEqual(['a', 'b']);
    fireEvent.click(result.getAllByRole('checkbox')[0]);
    expect(ref.current!.getFormData().getAll('boxes[]')).toEqual(['b']);
});

it('expanded checked predicates initialize multiple selection but do not control later edits', () => {
    const view = {
        ...choiceView(true, true),
        data: undefined,
        checked: (value: string) => value === 'b'
    };
    const result = render(
        <Form>
            <Choice view={view} />
        </Form>
    );
    expect((result.getByLabelText('B') as HTMLInputElement).checked).toBe(true);
    fireEvent.click(result.getByLabelText('B'));
    expect((result.getByLabelText('B') as HTMLInputElement).checked).toBe(false);
});

it('expanded field callbacks run once and may cancel a change', () => {
    const callback = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => event.preventDefault());
    const result = render(
        <Form>
            <Choice view={{ ...choiceView(false, true), attr: { onChange: callback } }} />
        </Form>
    );
    fireEvent.click(result.getByLabelText('B'));
    expect(callback).toHaveBeenCalledOnce();
    expect((result.getByLabelText('A') as HTMLInputElement).checked).toBe(true);
});

it('changing a select from multiple to single preserves a valid scalar value', () => {
    const ref = createRef<FormRef>();
    const result = render(
        <Form ref={ref}>
            <Choice view={choiceView(true)} />
        </Form>
    );
    act(() => ref.current!.setValue('form[choice]', ['b', '0']));
    result.rerender(
        <Form ref={ref}>
            <Choice view={choiceView(false)} />
        </Form>
    );
    expect(ref.current!.getFormData().get('form[choice]')).toBe('b');
});

it('custom bindings validate bracket-suffixed native names', () => {
    const submit = vi.fn();
    const rules = [constraint((value) => Array.isArray(value) && value.includes('a'))];

    function Native() {
        const field = useFormField(
            {
                type: 'choice',
                full_name: 'tags[]',
                multiple: true,
                data: ['a']
            },
            rules
        );

        return (
            <select
                name={field.name}
                multiple
                value={field.value as string[]}
                onChange={(event) => {
                    field.change(
                        Array.from(event.target.selectedOptions).map((option) => option.value)
                    );
                }}>
                <option value="a">A</option>
            </select>
        );
    }

    const result = render(
        <Form onSubmit={submit}>
            <Native />
        </Form>
    );
    fireEvent.submit(result.container.querySelector('form')!);
    expect(submit).toHaveBeenCalledOnce();
    expect(submit.mock.calls[0][0].getAll('tags[]')).toEqual(['a']);
});

it('native file inputs preserve selection through store updates and clear on reset', async () => {
    const ref = createRef<FormRef>();
    const user = userEvent.setup();
    const result = render(
        <Form ref={ref}>
            <Input
                view={{
                    type: "input",
                    full_name: "file",
                    attr: { type: "file", "aria-label": "Upload" }
                }}
            />
            <Input view={textView()} />
        </Form>
    );
    const file = new File(['content'], 'example.txt', { type: 'text/plain' });
    await user.upload(result.getByLabelText('Upload'), file);
    expect((result.getByLabelText('Upload') as HTMLInputElement).files![0]).toBe(file);
    act(() => ref.current!.setValue('form[title]', 'changed'));
    expect((result.getByLabelText('Upload') as HTMLInputElement).files![0]).toBe(file);
    expect(ref.current!.getFormData().get('file')).toBeInstanceOf(File);
    act(() => ref.current!.reset());
    expect((result.getByLabelText('Upload') as HTMLInputElement).files).toHaveLength(0);
});

it('required expanded multiple choice requires one selection and supports immediate setValue then submit', () => {
    const submit = vi.fn();
    const ref = createRef<FormRef>();
    const result = render(
        <Form ref={ref} onSubmit={submit}>
            <Choice view={{ ...choiceView(true, true), data: [], required: true }} />
        </Form>
    );
    expect(result.container.querySelector('form')!.checkValidity()).toBe(false);
    act(() => {
        ref.current!.setValue('form[choice][]', ['b']);
        ref.current!.submit();
    });
    expect(submit).toHaveBeenCalledOnce();
    expect(submit.mock.calls[0][0].getAll('form[choice][]')).toEqual(['b']);
});

it('choice defaults and explicitly cleared or temporarily missing choices match FormData', () => {
    const ref = createRef<FormRef>();
    const view = { ...choiceView(), data: undefined };
    const result = render(
        <Form ref={ref}>
            <Choice view={view} />
        </Form>
    );
    expect(ref.current!.getFormData().get('form[choice]')).toBe('a');
    act(() => ref.current!.setValue('form[choice]', ''));
    expect(result.container.querySelector('select')!.value).toBe('');
    expect(ref.current!.getFormData().get('form[choice]')).toBe('');
    act(() => ref.current!.setValue('form[choice]', 'b'));
    result.rerender(
        <Form ref={ref}>
            <Choice view={{ ...view, choices: [{ value: "a", label: "A" }] }} />
        </Form>
    );
    expect(result.container.querySelector('select')!.value).toBe('b');
    expect(ref.current!.getFormData().get('form[choice]')).toBe('b');
});

it('FormRest takes over an explicitly rendered field without duplicating or resetting it', () => {
    const view = rootView();

    const tree = (explicit: boolean) => {
        return (
            <Form>
                <FormViewProvider view={view}>
                    {explicit && <FormField name="title" />}
                    <FormRest />
                </FormViewProvider>
            </Form>
        );
    };

    const result = render(tree(true));
    expect(result.getAllByRole('textbox')).toHaveLength(1);
    fireEvent.change(result.getByRole('textbox'), { target: { value: 'draft' } });
    result.rerender(tree(false));
    expect(result.getAllByRole('textbox')).toHaveLength(1);
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('draft');
});

it('inline error cleanup moves hidden-field errors into the remaining error summary', () => {
    const view = rootView();
    view.children!.title.errors = [{ message: 'Hidden error' }];

    const tree = (shown: boolean) => {
        return (
            <Form>
                <FormViewProvider view={view}>
                    {shown && <FormRest />}
                    <FormRestError />
                </FormViewProvider>
            </Form>
        );
    };

    const result = render(tree(true));
    expect(result.getAllByText('Hidden error')).toHaveLength(1);
    result.rerender(tree(false));
    expect(result.getAllByText('Hidden error')).toHaveLength(1);
    result.rerender(tree(true));
    expect(result.getAllByText('Hidden error')).toHaveLength(1);
});

it('dynamic field templates receive compiled overrides and use the same binding', async () => {
    function Template() {
        const context = UseDynamicView()!;

        return <Input view={context.data} />;
    }
    const config = {
        templates: {
            '/crud/general/modify/form/TitleField.tsx': async () => {
                return { default: Template };
            }
        }
    };
    const result = render(
        <ConfigProvider config={config}>
            <Form>
                <FormViewProvider view={rootView()}>
                    <FormField name="title" options={{ placeholder: "Compiled override" }} />
                </FormViewProvider>
            </Form>
        </ConfigProvider>
    );
    const input = await result.findByPlaceholderText('Compiled override');
    fireEvent.change(input, { target: { value: 'template draft' } });
    expect((input as HTMLInputElement).value).toBe('template draft');
});

it('template changes ignore a late previous import', async () => {
    let finishA!: (value: any) => void;
    const config = {
        templates: {
            '/crud/general/modify/form/A.tsx': () => {
                return new Promise<any>((resolve) => {
                    finishA = resolve;
                });
            },
            '/crud/general/modify/form/B.tsx': async () => {
                return {
                    default: () => {
                        return <span>Template B</span>;
                    }
                };
            }
        }
    };

    const tree = (view: string) => {
        return (
            <ConfigProvider config={config}>
                <DynamicView prefix="modify/form" view={view} />
            </ConfigProvider>
        );
    };

    const result = render(tree('A'));
    result.rerender(tree('B'));
    await result.findByText('Template B');
    await act(async () => {
        return finishA({
            default: () => {
                return <span>Template A</span>;
            }
        });
    });
    expect(result.queryByText('Template A')).toBeNull();
    expect(result.getByText('Template B')).toBeTruthy();
});

it('filter sessions follow applied queries but ignore refresh timestamps and property ordering', () => {
    const requestA = { ...request.actionRequest, query: { filter: 'a', _ts: 1 } };
    const requestB = { ...request.actionRequest, query: { _ts: 2, filter: 'a' } };
    expect(formSessionKey(requestA, true)).toBe(formSessionKey(requestB, true));
    const queryChanged = { ...request.actionRequest, query: { filter: 'b' } };
    expect(formSessionKey(requestA, true)).not.toBe(formSessionKey(queryChanged, true));

    const tree = (value: any, view: FormViewType) => {
        return (
            <Form key={formSessionKey(value, true)}>
                <FormViewProvider view={view}>
                    <FormRest />
                </FormViewProvider>
            </Form>
        );
    };

    const result = render(tree(requestA, rootView('a')));
    fireEvent.change(result.getByRole('textbox'), { target: { value: 'draft' } });
    result.rerender(tree(requestB, rootView('a')));
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('draft');
    result.rerender(tree(queryChanged, rootView('b')));
    expect((result.getByRole('textbox') as HTMLInputElement).value).toBe('b');
});

it('focus and caret stay on the existing input during value changes and validation', () => {
    const result = render(
        <Form>
            <Input view={textView()} constraints={[constraint((value) => value.length > 2)]} />
        </Form>
    );
    const input = result.getByRole('textbox') as HTMLInputElement;
    input.focus();
    fireEvent.change(input, { target: { value: 'edited' } });
    input.setSelectionRange(2, 2);
    fireEvent.input(input, { target: { value: 'edited' } });
    expect(document.activeElement).toBe(input);
    expect(input.selectionStart).toBe(2);
});

it('a late backend response does not erase a newer client validation error', () => {
    const store = new FormStore();
    const rules = [constraint((value) => !!value, 'Required')];
    store.registerField('a', 'initial', 'scalar', rules, Symbol());
    store.change('a', 'submitted');
    const submission = store.snapshot();
    store.change('a', '');
    store.reconcile({ values: { a: 'submitted' }, collections: {} }, 'saved', submission);
    store.setErrors({}, submission, true);
    expect(store.getValue('a')).toBe('');
    expect(store.getState().errors.a).toEqual([{ message: 'Required' }]);
});

it('CRUD transports binary FormData directly without object conversion', async () => {
    const file = new File(['content'], 'example.txt', { type: 'text/plain' });

    function UploadTemplate() {
        return (
            <>
                <Input view={textView()} />
                <input type="file" name="file" aria-label="Upload" />
            </>
        );
    }
    const config = {
        templates: {
            '/crud/general/modify/form/FormField.tsx': async () => {
                return { default: UploadTemplate };
            }
        }
    };
    request.provider = { status: 200, results: { form: { modify: { view: rootView() } } } };
    const result = render(
        <ConfigProvider config={config}>
            <CrudForm embedded />
        </ConfigProvider>
    );
    const input = await result.findByLabelText('Upload');
    // jsdom does not put user-event's synthetic FileList into native FormData.
    // Supply the browser-produced binary FormData at that boundary.
    const NativeFormData = globalThis.FormData;
    vi.stubGlobal(
        'FormData',
        class extends NativeFormData {
            constructor(form?: HTMLFormElement, submitter?: HTMLElement | null) {
                super(form, submitter);

                if (form) {
                    this.set('file', file);
                }
            }
        }
    );
    fireEvent.submit(result.container.querySelector('form')!);
    const data: FormData = request.set.mock.calls[0][0].body;
    expect(data).toBeInstanceOf(FormData);
    expect(data.get('file')).toBe(file);
    expect((data.get('file') as File).name).toBe('example.txt');
    expect(input).toBeTruthy();
});

it('file constraints validate selected files without putting them into controlled values', async () => {
    const submit = vi.fn();
    const user = userEvent.setup();
    const rule = constraint(
        (value) => value instanceof File && value.name.endsWith('.txt'),
        'Text file required'
    );
    const result = render(
        <Form onSubmit={submit}>
            <Input
                view={{
                    type: "input",
                    full_name: "file",
                    attr: { type: "file", "aria-label": "Upload" }
                }}
                constraints={[rule]}
            />
        </Form>
    );
    fireEvent.submit(result.container.querySelector('form')!);
    expect(submit).not.toHaveBeenCalled();
    await user.upload(
        result.getByLabelText('Upload'),
        new File(['content'], 'example.txt', { type: 'text/plain' })
    );
    expect(result.getByLabelText('Upload').getAttribute('aria-invalid')).toBe('false');
    fireEvent.submit(result.container.querySelector('form')!);
    expect(submit).toHaveBeenCalledOnce();
});

it.each(['tags', 'tags[]'])('setFormData preserves every native checkbox token for %s', (name) => {
    const ref = createRef<FormRef>();
    const screen = render(
        <Form ref={ref}>
            <input type="checkbox" name={name} value="a" />
            <input type="checkbox" name={name} value="b" />
            <input type="checkbox" name={name} value="c" />
        </Form>
    );
    const data = new FormData();
    data.append(name, 'a');
    data.append(name, 'b');

    act(() => {
        ref.current!.setFormData(data);
    });
    expect(ref.current!.getFormData().getAll(name)).toEqual(['a', 'b']);
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    expect(checkboxes.map((checkbox) => checkbox.checked)).toEqual([true, true, false]);

    act(() => {
        ref.current!.setFormData(new FormData());
    });
    expect(ref.current!.getFormData().getAll(name)).toEqual([]);
});

it.each([false, true])(
    'expanded choice initialization uses transformed tokens (multiple=%s)',
    (multiple) => {
        const ref = createRef<FormRef>();
        const onSubmit = vi.fn();
        const view = {
            ...choiceView(multiple, true),
            checked: (token: string) => token === 'token-a'
        };
        const root: FormViewType = { type: 'form', full_name: 'form', children: { choice: view } };
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
        const name = multiple ? 'form[choice][]' : 'form[choice]';
        expect(ref.current!.getFormData().getAll(name)).toEqual(['token-a']);
        fireEvent.click(screen.getByLabelText('B'));
        const edited = multiple ? ['token-a', 'token-b'] : ['token-b'];
        expect(ref.current!.getFormData().getAll(name)).toEqual(edited);
        screen.rerender(tree(false));
        screen.rerender(tree(true));
        expect(ref.current!.getFormData().getAll(name)).toEqual(edited);

        act(() => {
            ref.current!.reset();
            ref.current!.submit();
        });
        expect(onSubmit.mock.calls[0][0].getAll(name)).toEqual(['token-a']);
    }
);

it('expanded empty placeholder stays selected through imperative reads and submission', () => {
    const ref = createRef<FormRef>();
    const onSubmit = vi.fn();
    const view = {
        ...choiceView(false, true),
        placeholder: 'Choose an option',
        checked: () => false
    };
    const screen = render(
        <Form ref={ref} onSubmit={onSubmit}>
            <Choice view={view} />
        </Form>
    );
    const placeholder = screen.getByLabelText('Choose an option') as HTMLInputElement;
    expect(placeholder.checked).toBe(true);
    expect(ref.current!.getFormData().get('form[choice]')).toBe('');
    expect(placeholder.checked).toBe(true);

    act(() => {
        ref.current!.submit();
    });
    expect(onSubmit.mock.calls[0][0].get('form[choice]')).toBe('');
    fireEvent.click(screen.getByLabelText('A'));
    expect(ref.current!.getFormData().get('form[choice]')).toBe('a');

    act(() => {
        ref.current!.setValue('form[choice]', null);
    });
    expect(ref.current!.getFormData().get('form[choice]')).toBe('');
    expect(placeholder.checked).toBe(true);
});

it('stable UseForm access is separate from reactive useFormState', () => {
    let runtime: ReturnType<typeof UseForm>;
    let renders = 0;
    const ref = createRef<FormRef>();
    function Access() {
        runtime = UseForm();
        renders++;

        return null;
    }
    function State() {
        const state = useFormState();

        return <output>{state.submitting ? 'submitting' : String(state.success)}</output>;
    }
    const onSubmit = vi.fn();
    const screen = render(
        <Form ref={ref} onSubmit={onSubmit}>
            <Access />
            <State />
            <Input view={textView()} />
        </Form>
    );
    const initialRenders = renders;
    const originalRuntime = runtime!;
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'draft' } });
    expect(renders).toBe(initialRenders);

    act(() => {
        runtime!.apiRef.current!.submit();
    });
    expect(screen.getByRole('status').textContent).toBe('submitting');
    expect(runtime!).toBe(originalRuntime);
    expect(runtime!.elementRef.current).toBe(screen.container.querySelector('form'));
    expect(renders).toBe(initialRenders);

    act(() => {
        ref.current!.success();
    });
    expect(screen.getByRole('status').textContent).toBe('true');
    expect(runtime!.store.getValue('form[title]')).toBe('draft');
});

it('custom checkbox groups validate their bracket-suffixed binding after edits', () => {
    const onSubmit = vi.fn();
    const rules = [constraint((value) => Array.isArray(value) && value.length > 0, 'Choose a tag')];
    const view: FormViewType = {
        type: 'checkbox',
        full_name: 'tags[]',
        multiple: true,
        value: 'a',
        checked: false
    };
    function NativeCheckbox() {
        const field = useFormField(view, rules);

        return (
            <input
                type="checkbox"
                name={field.name}
                value="a"
                checked={Array.isArray(field.value) && field.value.includes("a")}
                onChange={(event) => {
                    field.change(event.target.checked ? ["a"] : []);
                }}
            />
        );
    }
    const screen = render(
        <Form onSubmit={onSubmit}>
            <NativeCheckbox />
        </Form>
    );
    fireEvent.submit(screen.container.querySelector('form')!);
    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.submit(screen.container.querySelector('form')!);
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit.mock.calls[0][0].getAll('tags[]')).toEqual(['a']);
});

it.each(['refresh', 'saved'] as const)(
    'transformed choice defaults follow a %s response',
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
            submission?: ReturnType<FormStore['snapshot']>,
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
        const screen = render(tree(viewFor('token-a')));
        expect(ref.current!.getFormData().get('form[choice]')).toBe('token-a');
        const submission = store!.snapshot();
        screen.rerender(tree(viewFor('token-b'), submission, false));
        expect(store!.getValue('form[choice]')).toBe('token-b');
        screen.rerender(tree(viewFor('token-b'), submission));
        expect(ref.current!.getFormData().get('form[choice]')).toBe('token-b');

        act(() => {
            ref.current!.setValue('form[choice]', 'token-a');
            ref.current!.reset();
        });
        expect(ref.current!.getFormData().get('form[choice]')).toBe('token-b');

        const latestSubmission = store!.snapshot();
        act(() => {
            ref.current!.setValue('form[choice]', 'token-a');
        });
        screen.rerender(tree(viewFor('token-0'), latestSubmission));
        expect(ref.current!.getFormData().get('form[choice]')).toBe('token-a');

        act(() => {
            ref.current!.reset();
        });
        expect(ref.current!.getFormData().get('form[choice]')).toBe('token-0');
    }
);

it('successful partial submissions preserve disabled and unmounted drafts, including late edits', () => {
    const ref = createRef<FormRef>();
    let store: FormStore;
    let submission: ReturnType<FormStore['snapshot']>;
    const initial = {
        type: 'form',
        full_name: 'form',
        children: {
            title: textView('initial'),
            future: { ...textView('future'), full_name: 'form[future]' },
            cached: { ...textView('cached'), full_name: 'form[cached]' },
            check: { type: 'checkbox', full_name: 'form[check]', checked: true, value: 'yes' }
        }
    } satisfies FormViewType;

    function Runtime() {
        store = UseForm().store;

        return null;
    }

    function Content({ cached }: { cached: boolean }) {
        return (
            <>
                <Runtime />
                <Input view={initial.children.title} />
                <fieldset disabled>
                    <Input view={initial.children.future} />
                </fieldset>
                {cached && <Input view={initial.children.cached} />}
                <Input view={initial.children.check} />
            </>
        );
    }

    const result = render(
        <Form
            ref={ref}
            onSubmit={(_, snapshot) => {
                submission = snapshot;
            }}>
            <FormViewProvider view={initial}>
                <Content cached />
            </FormViewProvider>
        </Form>
    );
    act(() => {
        ref.current!.setValues({
            'form[title]': 'sent',
            'form[future]': 'future draft',
            'form[cached]': 'cached draft',
            'form[check]': null
        });
    });
    result.rerender(
        <Form
            ref={ref}
            onSubmit={(_, snapshot) => {
                submission = snapshot;
            }}>
            <FormViewProvider view={initial}>
                <Content cached={false} />
            </FormViewProvider>
        </Form>
    );
    fireEvent.submit(result.container.querySelector('form')!);
    expect(submission!.fields).toEqual(['form[title]', 'form[check]']);
    act(() => {
        store!.setValue('form[title]', 'late draft');
        store!.reconcile(
            {
                values: {
                    'form[title]': 'normalized',
                    'form[future]': '',
                    'form[cached]': '',
                    'form[check]': null
                },
                collections: {}
            },
            'saved',
            submission
        );
    });
    expect(store!.getValue('form[title]')).toBe('late draft');
    expect(store!.getValue('form[future]')).toBe('future draft');
    expect(store!.getValue('form[cached]')).toBe('cached draft');
    expect(store!.getValue('form[check]')).toBeNull();
});

it('acknowledges submitted empty collections while retaining disabled collection drafts', () => {
    const store = new FormStore();
    store.reconcile({ values: {}, collections: { active: ['old'], future: ['old'] } });
    store.removeItem('active', 'old');
    store.addItem('future', 'draft');
    const submission = store.snapshot([], ['active']);
    store.reconcile(
        { values: {}, collections: { active: [], future: ['old'] } },
        'saved',
        submission
    );
    expect(store.getCollection('active')).toEqual([]);
    expect(store.getCollection('future')).toEqual(['old', 'draft']);
});

it.each([false, true])(
    'submission captures empty collection participation (disabled=%s)',
    (disabled) => {
        const submit = vi.fn();
        const view = collectionView();
        const result = render(
            <Form onSubmit={submit}>
                <FormViewProvider view={view}>
                    <fieldset disabled={disabled}>
                        <FormGroupViewLoader />
                    </fieldset>
                </FormViewProvider>
            </Form>
        );
        // React's event helper allows deleting the row even while the test fieldset is disabled.
        fireEvent.click(result.getByText('Delete'));
        fireEvent.submit(result.container.querySelector('form')!);
        expect(submit).toHaveBeenCalledOnce();
        expect(submit.mock.calls[0][1].collectionNames).toEqual(disabled ? [] : ['form[rows]']);
        expect([...submit.mock.calls[0][0].keys()]).toEqual([]);
    }
);
