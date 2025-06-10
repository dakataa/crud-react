import {UseCrudForm} from "@src/component/crud/form/Form.tsx";
import {default as BaseFormWidget} from "@src/component/form/FormWidget.tsx";
import {useId} from "react";

const FormField = ({name}: { name: string }) => {
    const crudFormContext = UseCrudForm();
    const formView = crudFormContext?.form?.children?.[name];

    if(!formView) {
        return;
    }

    return <BaseFormWidget view={formView}/>
}


export default FormField;
