import {UseFormView} from "@src/component/crud/form/Form.tsx";
import {default as BaseFormLabel} from "@src/component/form/FormLabel.tsx";

const FormLabel = ({name}: { name?: string }) => {
    const {form} = UseFormView();
    const view = name ? form.children?.[name] : form;

    if (!view) {
        throw new Error('Missing Form View for FormLabel'+ (name ? ': ' + name : ''));
    }

    return <BaseFormLabel view={view}/>
}


export default FormLabel;
