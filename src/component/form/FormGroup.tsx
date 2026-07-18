import React from "react";
import FormLabel from "@crud-react/component/form/FormLabel.tsx";
import FormHelp from "@crud-react/component/form/FormHelp.tsx";
import FormField from "@crud-react/component/crud/form/FormField.tsx";
import {FormViewType, FormViewTypeEnum} from "@crud-react/type/FormViewType.tsx";
import FormError from "@crud-react/component/crud/form/FormError.tsx";

export const FormGroup = ({
                              view,
                              className,
                              size,
                              type,
                          }: {
    view: FormViewType;
    className?: string;
    size?: 'lg' | 'sm'
    type?: string
}) => {
    const isCheckbox = [FormViewTypeEnum.Checkbox, FormViewTypeEnum.Radio].includes(view.type as FormViewTypeEnum);

    view.type = type || view.type;

    return (
        <>
            {view.type === FormViewTypeEnum.Hidden ? (
                <FormField/>
            ) : (
                <div
                    className={[...(className?.split(' ') || [(isCheckbox ? 'form-check' : 'mb-3')])].filter(v => v).join(' ')}
                    {...(view.attr && (view.attr instanceof Function ? view.attr() : view.attr))}
                >
                    {!isCheckbox && (<FormLabel view={view}/>)}
                    <FormField size={size}/>
                    {isCheckbox && (<FormLabel view={view}/>)}
                    <FormError className={"invalid-feedback"}/>
                    <FormHelp/>
                </div>
            )}
        </>
    );
}

export default FormGroup;
