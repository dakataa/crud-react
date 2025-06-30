import {UseCrudForm} from "@src/component/crud/form/Form.tsx";
import {default as BaseFormWidget} from "@src/component/form/FormWidget.tsx";
import {FormType} from "@src/type/FormType.tsx";

const FormField = ({name, type}: { name: string, type?: string }) => {
    const crudFormContext = UseCrudForm();
    const formView = crudFormContext?.form?.children?.[name];

    if(!formView) {
        return;
    }

    formView.type = type || formView.type;

    return <BaseFormWidget view={formView}/>
}


export default FormField;
