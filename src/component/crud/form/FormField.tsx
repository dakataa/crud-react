import Choice from "@src/component/form/Choice.tsx";
import React from "react";
import {FormViewType, FormViewTypeEnum} from "@src/type/FormViewType.tsx";
import Input from "@src/component/form/Input.tsx";
import Collection from "@src/component/form/Collection.tsx";
import {FormViewProvider, UseFormView} from "@src/component/crud/form/Form.tsx";
import FormFieldViewLoader from "@src/component/crud/form/FormFieldViewLoader.tsx";

const FormFieldSelector = ({view}: { view: FormViewType }) => {
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
        case FormViewTypeEnum.Money:
        case FormViewTypeEnum.Text:
        case FormViewTypeEnum.Tel:
        case FormViewTypeEnum.Checkbox:
        case FormViewTypeEnum.Radio:
        case FormViewTypeEnum.Integer:
        case FormViewTypeEnum.Number:
        case FormViewTypeEnum.Password:
        case FormViewTypeEnum.Datetime:
        case FormViewTypeEnum.Date:
        case FormViewTypeEnum.Birthday:
        case FormViewTypeEnum.Time:
        case FormViewTypeEnum.Email: {
            return <Input view={view}/>
        }
        case FormViewTypeEnum.Repeated:
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

const FormField = ({name, options}: {
    name?: string;
    options?: FormViewType;
    size?: 'lg' | 'sm'
}) => {
    const {form} = UseFormView();
    const view = name ? form.children?.[name] : form;

    if (!view) {
        throw new Error('Missing Form View for FormField' + (name ? ': ' + name : ''));
    }

    const compiledView = {...view, ...options || {}};

    if (name !== undefined) {
        return (
            <FormViewProvider view={compiledView}>
                <FormFieldSelector view={compiledView}/>
            </FormViewProvider>
        );
    }

    return (
        <>
            <FormFieldSelector view={compiledView}/>
        </>
    )
}

export default FormField;
