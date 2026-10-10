import type { Constraint } from "./constraint/Contraint";
import type { FormErrors, FormState, FormValue } from "./Form.tsx";
import type { FormDefaults } from "./formView.ts";
import { equalFormValue, fieldName, initialFieldValue } from "./formView.ts";
import type { FormViewType } from "@crud-react/type/FormViewType.tsx";

type Listener = () => void;
export type FormSubmission = {
    revision: number;
    values: Record<string, FormValue>;
    collections: Record<string, string[]>;
    fields: string[];
    collectionNames: string[];
};
export type FormSyncMode = "refresh" | "invalid" | "saved";
export type FieldSnapshot = {
    value: FormValue | undefined;
    errors: FormErrors[string];
    dirty: boolean;
};
export type FieldKind = "scalar" | "selection" | "multiple";

type FieldRegistration = {
    constraints: Constraint[];
};

const EMPTY_ERRORS: FormErrors[string] = [];
const EMPTY_ITEMS: string[] = [];

const copy = (value: FormValue): FormValue => (Array.isArray(value) ? [...value] : value);

function convertFieldValue(value: FormValue, kind: FieldKind): FormValue {
    if (kind === "multiple") {
        if (Array.isArray(value)) {
            return value;
        }

        if (value == null || value === "") {
            return [];
        }

        return [value];
    }

    if (Array.isArray(value)) {
        const emptyValue = kind === "scalar" ? "" : null;

        return value[0] ?? emptyValue;
    }

    return value;
}

/** One synchronous source of form state; DOM controls and React are projections of it. */
export class FormStore {
    private nativeDirty = new Set<string>();
    private values = new Map<string, FormValue>();
    private kinds = new Map<string, FieldKind>();
    private initializers = new Map<string, (view: FormViewType) => FormValue>();
    private localDefaults = new Map<string, FormValue>();
    private overriddenDefaults = new Set<string>();
    private defaults = new Map<string, FormValue>();
    private collections = new Map<string, string[]>();
    private collectionDefaults = new Map<string, string[]>();
    private versions = new Map<string, number>();
    private collectionVersions = new Map<string, number>();
    private deletedPrefixes = new Set<string>();
    private registrations = new Map<string, Map<symbol, FieldRegistration>>();
    private snapshots = new Map<string, FieldSnapshot>();
    private listeners = new Map<string, Set<Listener>>();
    private errorSnapshots = new Map<string, FormErrors[string]>();
    private stateListeners = new Set<Listener>();
    private collectionListeners = new Map<string, Set<Listener>>();
    private serverErrors: FormErrors = {};
    private clientErrors: FormErrors = {};
    private revision = 0;
    private state: FormState = {
        constraints: {},
        errors: {},
        success: false,
        submitting: false
    };
    private views = new Map<string, Set<string>>();
    private errorViews = new Map<string, Set<symbol | string>>();
    private renderListeners = new Set<Listener>();
    private renderSnapshot = { elements: {} as Record<string, string>, errors: [] as string[] };

    subscribeState = (listener: Listener) => {
        this.stateListeners.add(listener);

        return () => {
            this.stateListeners.delete(listener);
        };
    };

    getState = () => this.state;

    subscribeField = (name: string, listener: Listener) =>
        this.subscribe(this.listeners, fieldName(name), listener);

    subscribeCollection = (name: string, listener: Listener) =>
        this.subscribe(this.collectionListeners, fieldName(name), listener);

    private subscribe(map: Map<string, Set<Listener>>, name: string, listener: Listener) {
        const listeners = map.get(name) || new Set<Listener>();
        map.set(name, listeners);
        listeners.add(listener);

        return () => {
            listeners.delete(listener);

            if (!listeners.size) {
                map.delete(name);
            }
        };
    }

    private notifyField(name: string) {
        this.snapshots.delete(name);
        this.listeners.get(name)?.forEach((listener) => listener());
    }

    getField = (name: string): FieldSnapshot => {
        name = fieldName(name);

        if (!this.snapshots.has(name)) {
            this.snapshots.set(name, {
                value: this.values.get(name),
                errors: this.state.errors[name] || EMPTY_ERRORS,
                dirty:
                    this.nativeDirty.has(name) ||
                    !equalFormValue(this.values.get(name), this.defaults.get(name))
            });
        }

        return this.snapshots.get(name)!;
    };

    getErrors(names: string[]) {
        const key = JSON.stringify(names);
        const errors = names.flatMap((name) => this.state.errors[fieldName(name)] || []);
        const previous = this.errorSnapshots.get(key);

        if (previous && JSON.stringify(previous) === JSON.stringify(errors)) {
            return previous;
        }

        this.errorSnapshots.set(key, errors);

        return errors;
    }

    getValue = (name: string) => this.values.get(fieldName(name));

    getNames = () => [...this.values.keys()];

    getInitialValue = (view: FormViewType): FormValue => {
        const initialize = this.initializers.get(fieldName(view.full_name || ""));

        return initialize ? initialize(view) : initialFieldValue(view);
    };

    getKind = (name: string): FieldKind | undefined => this.kinds.get(fieldName(name));

    isRegistered = (name: string) => !!this.registrations.get(fieldName(name))?.size;

    private initialize(name: string, value: FormValue) {
        if (!this.defaults.has(name)) {
            this.defaults.set(name, copy(value));
        }

        if (!this.values.has(name) && !this.isDeleted(name)) {
            this.values.set(name, copy(value));
            this.notifyField(name);
        }
    }

    isActiveValue(name: string) {
        name = fieldName(name);

        if (
            [...this.deletedPrefixes].some(
                (prefix) => name === prefix || name.startsWith(prefix + "[")
            )
        ) {
            return false;
        }

        return [...this.collections].every(([collection, items]) => {
            if (!name.startsWith(collection + "[")) {
                return true;
            }

            const item = name.slice(collection.length + 1).split("]")[0];

            return items.includes(item);
        });
    }

    private isDeleted(name: string) {
        return !this.isActiveValue(name);
    }

    registerField(
        name: string,
        value: FormValue,
        kind: FieldKind,
        constraints: Constraint[],
        owner: symbol,
        override = false,
        grouped = false,
        initialize?: (view: FormViewType) => FormValue
    ) {
        name = fieldName(name);
        const previousKind = this.kinds.get(name);

        if (previousKind && previousKind !== kind) {
            if (this.values.has(name)) {
                this.values.set(name, convertFieldValue(this.values.get(name)!, kind));
            }

            if (this.defaults.has(name)) {
                this.defaults.set(name, convertFieldValue(this.defaults.get(name)!, kind));
            }

            this.notifyField(name);
        }

        this.kinds.set(name, kind);

        // Keep field normalization available for backend refreshes while the control is hidden.
        // Changing the initializer updates the baseline without replacing a user's draft.
        if (this.initializers.get(name) !== initialize) {
            if (initialize) {
                this.initializers.set(name, initialize);
            } else {
                this.initializers.delete(name);
            }

            if (this.defaults.has(name) && !this.localDefaults.has(name)) {
                const untouched = equalFormValue(this.values.get(name), this.defaults.get(name));
                this.defaults.set(name, copy(value));

                if (untouched) {
                    this.values.set(name, copy(value));
                }

                this.notifyField(name);
            }
        }

        if (override && !this.overriddenDefaults.has(name)) {
            this.overriddenDefaults.add(name);
            this.localDefaults.set(name, copy(value));
            const untouched = equalFormValue(this.values.get(name), this.defaults.get(name));
            this.defaults.set(name, copy(value));

            if (untouched) {
                this.values.set(name, copy(value));
            }

            this.notifyField(name);
        }

        this.initialize(name, value);
        // Separate radio/checkbox components can register the same logical group.
        if (grouped && !this.versions.has(name)) {
            const current = this.defaults.get(name);
            let merged = value ?? current;

            if (kind === "multiple") {
                const currentValues = Array.isArray(current) ? current : [];
                const initialValues = Array.isArray(value) ? value : [];

                merged = [...new Set([...currentValues, ...initialValues])];
            }

            if (merged !== undefined && !equalFormValue(current, merged)) {
                this.defaults.set(name, copy(merged));
                this.values.set(name, copy(merged));
                this.notifyField(name);
            }
        }

        const registrations = this.registrations.get(name) || new Map();
        registrations.set(owner, { constraints });
        this.registrations.set(name, registrations);
        this.refreshConstraints(name);

        return () => {
            registrations.delete(owner);

            if (!registrations.size) {
                this.registrations.delete(name);
            }

            this.refreshConstraints(name);
        };
    }

    private refreshConstraints(name: string) {
        const registrations = [...(this.registrations.get(name)?.values() || [])];
        const constraints = registrations.flatMap((item) => item.constraints);
        const unique = [...new Set(constraints)];
        const existing = this.state.constraints[name];
        const unchanged =
            existing &&
            existing.length === unique.length &&
            existing.every((item, i) => item === unique[i]);
        const hasNoConstraints = !existing && !unique.length;

        if (unchanged || hasNoConstraints) {
            return;
        }

        const next = { ...this.state.constraints };

        if (unique.length) {
            next[name] = unique;
        } else {
            delete next[name];
        }

        this.updateState({ ...this.state, constraints: next });
    }

    setValue = (name: string, value: FormValue) => {
        name = fieldName(name);

        if (Array.isArray(value) && this.getKind(name) === "scalar") {
            throw new Error("Cannot assign multiple values to a single-value form element.");
        }

        if (equalFormValue(this.values.get(name), value)) {
            return;
        }

        this.values.set(name, copy(value));
        this.versions.set(name, ++this.revision);
        this.notifyField(name);

        if (this.state.success) {
            this.updateState({ ...this.state, success: false });
        }
    };

    change = (name: string, value: FormValue) => {
        this.setValue(name, value);
        name = fieldName(name);

        if (this.serverErrors[name]) {
            delete this.serverErrors[name];
            this.refreshErrors();
        }

        this.validate(name);
    };

    changeNative = (name: string, value: unknown) => {
        name = fieldName(name);
        this.nativeDirty.add(name);
        this.versions.set(name, ++this.revision);
        this.notifyField(name);

        if (this.serverErrors[name]) {
            delete this.serverErrors[name];
            this.refreshErrors();
        }

        if (this.state.success) {
            this.updateState({ ...this.state, success: false });
        }

        this.validate(name, value);
    };

    validate = (name: string, value: unknown = this.values.get(fieldName(name)) ?? null) => {
        name = fieldName(name);
        const constraint = this.state.constraints[name]?.find(
            (constraint) => !constraint.isValid(value)
        );

        if (constraint) {
            this.clientErrors[name] = [{ message: constraint.getMessage() }];
        } else {
            delete this.clientErrors[name];
        }

        this.refreshErrors();

        return !constraint;
    };

    validateAll = (isActive: (name: string) => boolean, readValue?: (name: string) => unknown) => {
        const names = Object.keys(this.state.constraints).filter(isActive);

        return names
            .map((name) => (readValue ? this.validate(name, readValue(name)) : this.validate(name)))
            .every(Boolean);
    };

    setErrors = (errors: FormErrors, submission?: FormSubmission, preserveDirty = false) => {
        this.serverErrors = {};
        Object.entries(errors).forEach(([name, errors]) => {
            name = fieldName(name);

            if (submission && (this.versions.get(name) || 0) > submission.revision) {
                return;
            }

            this.serverErrors[name] = [...(this.serverErrors[name] || []), ...errors];
        });
        this.clientErrors = Object.fromEntries(
            Object.entries(this.clientErrors).filter(([name]) => {
                const changedAfterSubmission =
                    submission && (this.versions.get(name) || 0) > submission.revision;
                const keepDirtyError = preserveDirty && this.getField(name).dirty;

                return changedAfterSubmission || keepDirtyError;
            })
        );
        this.refreshErrors();
    };

    private refreshErrors() {
        const errors: FormErrors = { ...this.serverErrors };
        Object.entries(this.clientErrors).forEach(([name, items]) => {
            errors[name] = [...(errors[name] || []), ...items];
        });
        const names = new Set([...Object.keys(this.state.errors), ...Object.keys(errors)]);
        const changed = [...names].filter(
            (name) => JSON.stringify(this.state.errors[name]) !== JSON.stringify(errors[name])
        );

        if (!changed.length) {
            return;
        }

        this.state = { ...this.state, errors };
        changed.forEach((name) => this.notifyField(name));
        this.stateListeners.forEach((listener) => listener());
    }

    private updateState(state: FormState) {
        this.state = state;
        this.stateListeners.forEach((listener) => listener());
    }

    setSuccess = (success: boolean) => {
        this.updateState({ ...this.state, success, submitting: false });
    };

    setSubmitting = (submitting: boolean) => {
        if (this.state.submitting === submitting) {
            return;
        }

        this.updateState({ ...this.state, submitting });
    };

    getCollection = (name: string) => this.collections.get(fieldName(name)) || EMPTY_ITEMS;

    initializeCollection(name: string, items: string[]) {
        name = fieldName(name);

        if (!this.collectionDefaults.has(name)) {
            this.collectionDefaults.set(name, [...items]);
        }

        if (!this.collections.has(name)) {
            this.collections.set(name, [...items]);
            this.collectionListeners.get(name)?.forEach((listener) => listener());
        }
    }

    addItem(name: string, item: string) {
        name = fieldName(name);
        this.collections.set(name, [...this.getCollection(name), item]);
        this.collectionVersions.set(name, ++this.revision);
        this.collectionListeners.get(name)?.forEach((listener) => listener());
    }

    removeItem(name: string, item: string) {
        name = fieldName(name);
        const prefix = `${name}[${item}]`;
        this.deletedPrefixes.add(prefix);
        this.collections.set(
            name,
            this.getCollection(name).filter((value) => value !== item)
        );
        this.collectionVersions.set(name, ++this.revision);
        [...this.values.keys()]
            .filter((key) => key === prefix || key.startsWith(prefix + "["))
            .forEach((key) => {
                this.values.delete(key);
                this.versions.set(key, this.revision);
                delete this.serverErrors[key];
                delete this.clientErrors[key];
                this.notifyField(key);
            });
        [...this.collections.keys()]
            .filter((key) => key.startsWith(prefix + "["))
            .forEach((key) => {
                this.collections.delete(key);
                this.collectionListeners.get(key)?.forEach((listener) => listener());
            });
        this.refreshErrors();
        this.collectionListeners.get(name)?.forEach((listener) => listener());
    }

    snapshot = (
        fields = this.getNames(),
        collectionNames = [...this.collections.keys()]
    ): FormSubmission => {
        const values = Object.fromEntries(
            [...this.values].map(([name, value]) => [name, copy(value)])
        );
        const collections = Object.fromEntries(
            [...this.collections].map(([name, items]) => [name, [...items]])
        );

        return {
            revision: this.revision,
            values,
            collections,
            fields: [...new Set(fields.map(fieldName))],
            collectionNames: [...new Set(collectionNames.map(fieldName))]
        };
    };

    private shouldAcceptIncoming(
        mode: FormSyncMode,
        untouched: boolean,
        version: number,
        participated: boolean,
        submission?: FormSubmission
    ) {
        if (mode === "saved" && submission) {
            return participated && version <= submission.revision;
        }

        return mode === "refresh" && untouched;
    }

    reconcile(defaults: FormDefaults, mode: FormSyncMode = "refresh", submission?: FormSubmission) {
        Object.entries(defaults.collections).forEach(([name, items]) => {
            const previous = this.collectionDefaults.get(name);
            const current = this.collections.get(name);
            const untouched = equalFormValue(current, previous);
            const version = this.collectionVersions.get(name) || 0;
            const participated = submission?.collectionNames.includes(name) ?? true;
            const accept = this.shouldAcceptIncoming(
                mode,
                untouched,
                version,
                participated,
                submission
            );

            if (!previous || mode !== "invalid") {
                this.collectionDefaults.set(name, [...items]);
            }

            if (!current || accept) {
                if (!equalFormValue(current, items)) {
                    this.collections.set(name, [...items]);
                    this.collectionListeners.get(name)?.forEach((listener) => listener());
                }

                if (accept) {
                    [...this.deletedPrefixes]
                        .filter((prefix) => prefix.startsWith(name + "["))
                        .forEach((prefix) => this.deletedPrefixes.delete(prefix));
                }
            }
        });
        Object.entries(defaults.values).forEach(([name, incoming]) => {
            const participated = submission?.fields.includes(name) ?? true;

            if (mode === "saved" && participated) {
                this.localDefaults.delete(name);
            }

            const value = this.localDefaults.has(name) ? this.localDefaults.get(name)! : incoming;
            const current = this.values.get(name);
            const untouched = equalFormValue(current, this.defaults.get(name));
            const version = this.versions.get(name) || 0;
            const accept = this.shouldAcceptIncoming(
                mode,
                untouched,
                version,
                participated,
                submission
            );

            if (!this.defaults.has(name) || mode !== "invalid") {
                this.defaults.set(name, copy(value));
            }

            if ((!this.values.has(name) || accept) && !this.isDeleted(name)) {
                this.values.set(name, copy(value));

                if (mode === "saved" && accept) {
                    this.nativeDirty.delete(name);
                }
            }

            this.notifyField(name);
        });
    }

    reset = () => {
        const names = new Set([...this.values.keys(), ...this.defaults.keys()]);
        const collections = new Set([
            ...this.collections.keys(),
            ...this.collectionDefaults.keys()
        ]);
        this.deletedPrefixes.clear();
        this.nativeDirty.clear();
        ++this.revision;
        this.collections = new Map(
            [...this.collectionDefaults].map(([name, items]) => [name, [...items]])
        );
        [...this.collections.keys()]
            .filter((name) => !this.isActiveValue(name))
            .forEach((name) => this.collections.delete(name));
        this.values = new Map(
            [...this.defaults]
                .filter(([name]) => this.isActiveValue(name))
                .map(([name, value]) => [name, copy(value)])
        );
        names.forEach((name) => {
            this.versions.set(name, this.revision);
            this.notifyField(name);
        });
        collections.forEach((name) => {
            this.collectionVersions.set(name, this.revision);
            this.collectionListeners.get(name)?.forEach((listener) => listener());
        });
        this.serverErrors = {};
        this.clientErrors = {};
        this.refreshErrors();
        this.updateState({ ...this.state, success: false, submitting: false });
    };

    subscribeRendering = (listener: Listener) => {
        this.renderListeners.add(listener);

        return () => {
            this.renderListeners.delete(listener);
        };
    };

    getRendering = () => this.renderSnapshot;

    private notifyRendering() {
        const snapshot = {
            elements: Object.fromEntries(
                [...this.views].map(([name, owners]) => [name, owners.values().next().value!])
            ),
            errors: [...this.errorViews.keys()]
        };

        if (JSON.stringify(snapshot) === JSON.stringify(this.renderSnapshot)) {
            return;
        }

        this.renderSnapshot = snapshot;
        this.renderListeners.forEach((listener) => listener());
    }

    registerView(name: string, id: string) {
        const owners = this.views.get(name) || new Set<string>();
        owners.add(id);
        this.views.set(name, owners);
        this.notifyRendering();

        return () => {
            owners.delete(id);

            if (!owners.size) {
                this.views.delete(name);
            }

            this.notifyRendering();
        };
    }

    registerError(name: string, id: symbol | string) {
        name = fieldName(name);
        const owners = this.errorViews.get(name) || new Set();
        owners.add(id);
        this.errorViews.set(name, owners);
        this.notifyRendering();

        return () => {
            owners.delete(id);

            if (!owners.size) {
                this.errorViews.delete(name);
            }

            this.notifyRendering();
        };
    }
}
