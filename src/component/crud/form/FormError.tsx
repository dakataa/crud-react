import { UseFormView } from "@crud-react/component/crud/form/Form.tsx";
import FormFieldError from "@crud-react/component/form/FormFieldError.tsx";
import type { FormFieldErrorProps } from "@crud-react/component/form/FormFieldError.tsx";
import { UseForm } from "@crud-react/component/form/Form.tsx";
import { useEffect, useRef } from "react";

export type FormErrorProps = Omit<FormFieldErrorProps, "name"> & {
    name?: string | (string | null)[];
};

const FormError = ({ name, ...attributes }: FormErrorProps) => {
    const { form } = UseFormView();
    const { store } = UseForm();
    const owner = useRef(Symbol("error"));

    const views = name
        ? (name instanceof Array ? name : [name]).map((name) => {
              const childView = name ? form.children?.[name] : form;

              if (!childView) {
                  throw new Error("Missing Form View for FormError: " + (name || ""));
              }

              return childView;
          })
        : [form];

    const names = views.map((view) => view.full_name || "").filter(Boolean);
    const namesKey = JSON.stringify(names);
    useEffect(() => {
        const cleanup = names.map((name) => store.registerError(name, owner.current));

        return () => {
            return cleanup.forEach((unregister) => unregister());
        };
    }, [store, namesKey]);

    return <FormFieldError name={views.map((view) => view.full_name || "")} {...attributes} />;
};

export default FormError;
