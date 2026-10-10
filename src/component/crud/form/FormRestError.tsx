import { UseForm, useFormState } from '@crud-react/component/form/Form.tsx';
import FormFieldError from '@crud-react/component/form/FormFieldError.tsx';
import React, { useSyncExternalStore } from 'react';

const FormRestError = ({ className }: { className?: string }) => {
    const form = useFormState();
    const { store } = UseForm();
    const rendering = useSyncExternalStore(
        store.subscribeRendering,
        store.getRendering,
        store.getRendering
    );
    const names = Object.keys(form.errors).filter((name) => !rendering.errors.includes(name));

    return <FormFieldError name={names} className={className} />;
};

export default FormRestError;
