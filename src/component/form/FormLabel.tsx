import {FormViewType} from "@crud-react/type/FormViewType";
import {titlize} from "@crud-react/helper/StringUtils";
import {nameToId} from "@crud-react/component/form/Form.tsx";
import React from "react";
import {UseFormSettings} from "@crud-react/component/form/FormSetting.tsx";
import Translation, {UseTranslate} from "@crud-react/component/Translation.tsx";

const FormLabel = ({
                       view,
                       className
                   }: {
    view: FormViewType
    className?: string
}): React.JSX.Element => {
    const settings = UseFormSettings();
    const translate = UseTranslate();
    const labelAttr = (view.label_attr instanceof Function ? view.label_attr() : view.label_attr) || {};
    const label = settings?.label || view.label || titlize(view.name || '') || '';
    const isCheckbox = ['checkbox', 'radio'].includes(view.type || 'input');

    return (
        <>
            {isCheckbox ? (
                <label
                    className={className ?? "form-check-label"}
                    htmlFor={view.id || nameToId(view.full_name || '')}
                    {...labelAttr}
                    title={typeof labelAttr.title === "string" ? translate(labelAttr.title) : labelAttr.title}
                    aria-label={typeof labelAttr["aria-label"] === "string" ? translate(labelAttr["aria-label"]) : labelAttr["aria-label"]}
                    aria-description={typeof labelAttr["aria-description"] === "string" ? translate(labelAttr["aria-description"]) : labelAttr["aria-description"]}>
                    <Translation>{label}</Translation>
                </label>
            ) : (
                <label
                    className={className ?? "form-label"}
                    {...labelAttr}
                    title={typeof labelAttr.title === "string" ? translate(labelAttr.title) : labelAttr.title}
                    aria-label={typeof labelAttr["aria-label"] === "string" ? translate(labelAttr["aria-label"]) : labelAttr["aria-label"]}
                    aria-description={typeof labelAttr["aria-description"] === "string" ? translate(labelAttr["aria-description"]) : labelAttr["aria-description"]}>
                    <Translation>{label}</Translation>
                </label>
            )}
        </>
    );
}

export default FormLabel;
