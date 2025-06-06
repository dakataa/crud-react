import {UseCrudForm} from "@src/component/crud/form/Form.tsx";
import {default as BaseFormLabel} from "@src/component/form/FormLabel.tsx";
import {FormFieldError} from "@src/component/form/FormFieldError.tsx";

const FormError = ({name}: { name: string }) => {
    const {form} = UseCrudForm();
    const formView = form?.children?.[name] ?? null;

    if(!formView) {
        return;
    }

    return <FormFieldError name={formView.full_name}/>
}


export default FormError;
