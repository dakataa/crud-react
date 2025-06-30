import {UseCrudForm} from "@src/component/crud/form/Form.tsx";
import {default as BaseFormGroup} from "@src/component/form/FormGroup.tsx";

const FormGroup = ({name}: { name: string }) => {
    const {form} = UseCrudForm() || {};
    const formView = form?.children?.[name] ?? null;

    if(!formView) {
        return;
    }

    return <BaseFormGroup view={formView}/>
}


export default FormGroup;
