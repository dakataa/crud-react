import { UseFormView } from "@crud-react/component/crud/form/Form.tsx";
import FormFieldError from "@crud-react/component/form/FormFieldError.tsx";
import { UseForm } from "@crud-react/component/form/Form.tsx";
import { useEffect, useRef } from "react";

const FormError = ({
    name,
    className
}: {
    name?: string | (string | null)[];
    className?: string;
}) => {
    const { form } = UseFormView();
    const { store } = UseForm();
    const id = useRef(Symbol("error"));

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
        const cleanup = names.map((name) => store.registerError(name, id.current));

        return () => {
            return cleanup.forEach((unregister) => unregister());
        };
    }, [store, namesKey]);

    return (
        <FormFieldError name={views.map((view) => view.full_name || "")} className={className} />
    );
};

export default FormError;
