import {UseCrudForm} from "@src/component/crud/form/Form.tsx";
import FormFieldViewLoader from "@src/component/crud/form/FormFieldViewLoader.tsx";

const FormRest = () => {
    const crudFormContext = UseCrudForm();
    const formView = crudFormContext?.form;
    if(!formView) {
        return;
    }

    return <FormFieldViewLoader view={formView}/>
}


export default FormRest;
