import {UseCrudForm} from "@src/component/crud/form/Form.tsx";
import {default as BaseFormWidget} from "@src/component/form/FormWidget.tsx";
import {useId} from "react";

const FormField = ({name}: { name: string }) => {
    const {form} = UseCrudForm();
    const formView = form?.children?.[name] ?? null;

    if(!formView) {
        return;
    }

    return <BaseFormWidget view={formView}/>
}


export default FormField;
