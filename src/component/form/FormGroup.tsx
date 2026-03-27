import React from "react";
import FormLabel from "@src/component/form/FormLabel.tsx";
import FormHelp from "@src/component/form/FormHelp.tsx";
import FormField from "@src/component/crud/form/FormField.tsx";
import {FormViewType, FormViewTypeEnum} from "@src/type/FormViewType.tsx";
import FormError from "@src/component/crud/form/FormError.tsx";

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
