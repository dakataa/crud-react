import {FormViewType} from "@crud-react/type/FormViewType";
import {titlize} from "@crud-react/helper/StringUtils";
import {nameToId} from "@crud-react/component/form/Form.tsx";
import React from "react";
import {UseFormSettings} from "@crud-react/component/form/FormSetting.tsx";
import Translation from "@crud-react/component/Translation.tsx";

const FormLabel = ({
                       view,
                       className
                   }: {
    view: FormViewType
    className?: string
}): React.JSX.Element => {
    const settings = UseFormSettings();
    const label = settings?.label || view.label || titlize(view.name || '') || '';
    const isCheckbox = ['checkbox', 'radio'].includes(view.type || 'input');

    return (
        <>
            {isCheckbox ? (
                <label
                    className={className ?? "form-check-label"}
                    htmlFor={view.id || nameToId(view.full_name || '')}
                    {...(view.label_attr && (view.label_attr instanceof Function ? view.label_attr() : view.label_attr))}>
                    <Translation>{label}</Translation>
                </label>
            ) : (
                <label
                    className={className ?? "form-label"}
                    {...(view.label_attr && (view.label_attr instanceof Function ? view.label_attr() : view.label_attr))}>
                    <Translation>{label}</Translation>
                </label>
            )}
        </>
    );
}

export default FormLabel;
