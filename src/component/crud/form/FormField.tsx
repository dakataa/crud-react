import Choice from "@src/component/form/Choice.tsx";
import React from "react";
import {FormViewTypeEnum} from "@src/type/FormViewType.tsx";
import Input from "@src/component/form/Input.tsx";
import Collection from "@src/component/form/Collection.tsx";
import {UseFormView} from "@src/component/crud/form/Form.tsx";
import FormFieldViewLoader from "@src/component/crud/form/FormFieldViewLoader.tsx";

const FormField = ({name}: {
    name?: string;
}) => {
    const {form} = UseFormView();
    const view = name ? form.children?.[name] : form;

    if (!view) {
       throw new Error('Missing Form View'+ (name ? ': ' + name : ''));
    }

    switch (view.type) {
        case FormViewTypeEnum.Entity:
        case FormViewTypeEnum.Choice:
        case FormViewTypeEnum.Enum: {
            return <Choice view={view}/>
        }
        case FormViewTypeEnum.Collection: {
            return <Collection view={view}/>
        }
        case FormViewTypeEnum.Hidden:
        case FormViewTypeEnum.Input:
        case FormViewTypeEnum.Text:
        case FormViewTypeEnum.Checkbox:
        case FormViewTypeEnum.Radio:
        case FormViewTypeEnum.Integer:
        case FormViewTypeEnum.Number:
        case FormViewTypeEnum.Password:
        case FormViewTypeEnum.Email: {
            return <Input view={view}/>
        }
        case FormViewTypeEnum.Form: {
            return (
                <FormFieldViewLoader/>
            );
        }
        default: {
            throw new Error('Invalid view type: ' + view.type);
        }
    }
}

export default FormField;
