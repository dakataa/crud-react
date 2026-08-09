import {FormViewProvider, UseFormView} from "@crud-react/component/crud/form/Form.tsx";
import React, {PropsWithChildren} from "react";
import {FormViewType} from "@crud-react/type/FormViewType.tsx";
import FormGroupViewLoader from "@crud-react/component/crud/form/FormGroupViewLoader.tsx";

type FormGroupContextType = {
    id: string;
    view: FormViewType;
}

const FormGroupContext = React.createContext<FormGroupContextType | undefined>(undefined);

/**
 * Returns metadata for the form group currently being rendered.
 *
 * @internal This hook supports the schema renderer and is not part of the
 * package's public entry point.
 */
export function UseFormGroup(): FormGroupContextType | undefined {
    return React.useContext<FormGroupContextType | undefined>(FormGroupContext);
}

/**
 * Provides the current group to the nested schema renderer.
 *
 * @internal Consumers should render {@link FormGroup} instead of creating this
 * context directly.
 */
export function FormGroupProvider({id, view, children}: FormGroupContextType & PropsWithChildren) {
    return (
        <FormGroupContext.Provider value={{id: id, view: view}}>
            {children}
        </FormGroupContext.Provider>
    );
}

/** Props accepted by {@link FormGroup}. */
export type FormGroupProps = {
    /**
     * Name of a direct child of the current form view.
     *
     * When omitted, the component renders the current view itself. Nested paths
     * such as `address.street` are not resolved; nest `FormViewProvider`
     * instances or render from the appropriate parent view instead.
     */
    name?: string;

    /**
     * Shallow overrides applied to the selected schema node before rendering.
     *
     * The node's `type` cannot be overridden. Object-valued properties such as
     * `attr` and `children` replace the corresponding property rather than being
     * deep-merged.
     */
    options?: Omit<FormViewType, "type">;

    /**
     * Return `null` when the requested view is missing instead of throwing.
     *
     * @defaultValue false
     */
    optional?: boolean;
};

/**
 * Renders a form schema node from the nearest {@link FormViewProvider}.
 *
 * `FormGroup` selects either the current view or one of its direct children,
 * applies optional shallow overrides, and delegates rendering to the dynamic
 * form view loader. The loader handles containers recursively and renders leaf
 * nodes with the library's standard label, field, error, and help markup.
 *
 * The component must be rendered below `FormViewProvider` (normally provided by
 * `CrudForm`). If no matching view exists, it throws unless `optional` is set.
 *
 * @throws {Error} When no matching form view exists and `optional` is `false`.
 * @throws {Error} When rendered outside a `FormViewProvider`.
 *
 * @example Render a direct child from the current form schema.
 * ```tsx
 * <FormGroup name="title" />
 * ```
 *
 * @example Customize the selected view for this render.
 * ```tsx
 * <FormGroup
 *   name="price"
 *   options={{
 *     label: 'Unit price',
 *     attr: {className: 'form-control text-end'},
 *   }}
 * />
 * ```
 */
const FormGroup = ({name, options, optional = false}: FormGroupProps) => {
    const {form} = UseFormView();
    const view = name ? form?.children?.[name] : form;

    const compiledView = {...view, ...(options || {})} as FormViewType;

    if (!compiledView?.type) {
        if(optional) {
            return null;
        }

        throw new Error('Missing Provided Form View to Form Group' + (name ? ': ' + name : ''));
    }

    return (
        <FormViewProvider view={compiledView}>
            <FormGroupViewLoader/>
        </FormViewProvider>
    );
}


export default FormGroup;
