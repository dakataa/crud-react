import {UseCrudForm} from "@src/component/crud/form/Form.tsx";
import FormFieldViewLoader from "@src/component/crud/form/FormFieldViewLoader.tsx";

const FormRest = ({name}: { name: string }) => {
    const {form} = UseCrudForm();

    if(!form) {
        return;
    }

    return <FormFieldViewLoader view={form}/>
}


export default FormRest;
