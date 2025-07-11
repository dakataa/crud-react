import {UseFormView} from "@src/component/crud/form/Form.tsx";
import {default as BaseFormLabel} from "@src/component/form/FormLabel.tsx";

const FormLabel = ({name}: { name: string }) => {
    const {form} = UseFormView();
    const formView = form?.children?.[name] ?? null;

    if(!formView) {
        return;
    }

    return <BaseFormLabel view={formView}/>
}


export default FormLabel;
