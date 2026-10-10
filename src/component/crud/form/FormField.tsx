import Choice from '@crud-react/component/form/Choice.tsx';
import React from 'react';
import { FormViewType, FormViewTypeEnum } from '@crud-react/type/FormViewType.tsx';
import Input from '@crud-react/component/form/Input.tsx';
import Collection from '@crud-react/component/form/Collection.tsx';
import { FormViewProvider, UseFormView } from '@crud-react/component/crud/form/Form.tsx';
import FormGroupViewLoader from '@crud-react/component/crud/form/FormGroupViewLoader.tsx';
import DynamicView from '@crud-react/component/crud/DynamicView.tsx';
import { hasInitialOverride, markInitialOverride } from '@crud-react/component/form/formView.ts';
import Textarea from '@crud-react/component/form/Textarea.tsx';

const FormFieldSelector = ({
    view,
    ref
}: {
    view: FormViewType;
    ref?: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
}) => {
    switch (view.type) {
        case FormViewTypeEnum.Entity:
        case FormViewTypeEnum.Choice:
        case FormViewTypeEnum.Currency:
        case FormViewTypeEnum.Language:
        case FormViewTypeEnum.Enum: {
            return <Choice view={view} ref={ref as React.RefObject<HTMLSelectElement>} />;
        }
        case FormViewTypeEnum.Collection: {
            return <Collection view={view} />;
        }
        case FormViewTypeEnum.Textarea: {
            return <Textarea view={view} ref={ref as React.RefObject<HTMLTextAreaElement>} />;
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
            return <Input view={view} ref={ref as React.RefObject<HTMLInputElement>} />;
        }
        case FormViewTypeEnum.Repeated:
        case FormViewTypeEnum.Form: {
            return <FormGroupViewLoader />;
        }
        default: {
            throw new Error('Invalid view type: ' + view.type);
        }
    }
};

const FormField = ({
    name,
    options,
    ref
}: {
    name?: string;
    options?: Partial<FormViewType>;
    size?: 'lg' | 'sm';
    ref?: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
}) => {
    const { form } = UseFormView();
    const view = name ? form.children?.[name] : form;

    if (!view) {
        throw new Error('Missing Form View for FormField' + (name ? ': ' + name : ''));
    }

    const compiledView = { ...view, ...(options || {}) };

    if (
        hasInitialOverride(view) ||
        (options && ['data', 'value', 'checked'].some((key) => key in options))
    ) {
        markInitialOverride(compiledView);
    }

    const blockPrefixes = [
        (compiledView.name || 'form') + 'Field',
        ...(compiledView.block_prefixes || [])
    ];

    return (
        <>
            <FormViewProvider view={compiledView}>
                <DynamicView view={blockPrefixes} prefix={"modify/form"} data={compiledView}>
                    <FormFieldSelector view={compiledView} ref={ref} />
                </DynamicView>
            </FormViewProvider>
        </>
    );
};

export default FormField;
