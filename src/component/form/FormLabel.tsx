import {FormViewType} from "@src/type/FormViewType";
import {titlize} from "@src/helper/StingUtils";
import {nameToId} from "@src/component/form/Form.tsx";
import React from "react";
import {UseFormSettings} from "@src/component/form/FormSetting.tsx";
import Translation from "@src/component/Translation.tsx";

const FormLabel = ({
                       view,
                       className
                   }: {
    view: FormViewType
    className?: string
}): React.JSX.Element => {
    const settings = UseFormSettings();
    const label = settings?.label || view.label || titlize(view.name || '');
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
