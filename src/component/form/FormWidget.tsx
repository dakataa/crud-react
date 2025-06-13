import Choice from "@src/component/form/Choice";
import React, {useId} from "react";
import {FormViewType} from "@src/type/FormViewType";
import Input from "@src/component/form/Input.tsx";
import Collection from "@src/component/form/Collection.tsx";
import {UseCrudForm} from "@src/component/crud/form/Form.tsx";
import {UseFormGroup} from "@src/component/form/FormGroup.tsx";

const FormWidget = ({
                        view,
                        prototype
                    }: {
    view: FormViewType,
    prototype?: string
}) => {
    const id = useId()
    const crudFormContext = UseCrudForm();
    if (crudFormContext) {
        const {canRender, setRendered} = crudFormContext;
        const group = UseFormGroup()
        if (!group) {
            setRendered?.(view, id);
            if (canRender && !canRender?.(view, id)) {
                return;
            }
        }
    }

    switch (view.type) {
        case 'entity':
        case 'choice':
        case 'enum': {
            return <Choice view={view} prototype={prototype}/>
        }
        case 'collection': {
            return <Collection view={view} prototype={prototype}/>
        }
        case 'input':
        case 'text':
        case 'checkbox':
        case 'radio':
        case 'integer':
        case 'password':
        case 'email':
        default:
            return <Input view={view} prototype={prototype}/>
    }
}

export default FormWidget;
