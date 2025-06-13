import {FormFieldError} from "@src/component/form/FormFieldError";
import React, {useId} from "react";
import FormLabel from "@src/component/form/FormLabel.tsx";
import FormHelp from "@src/component/form/FormHelp.tsx";
import FormWidget from "@src/component/form/FormWidget.tsx";
import {FormViewType} from "@src/type/FormViewType.tsx";
import {UseCrudForm} from "@src/component/crud/form/Form.tsx";

type FormGroupContextType = {
    id: string;
}

const FormGroupContext = React.createContext<FormGroupContextType | undefined>(undefined);

export function UseFormGroup(): FormGroupContextType | undefined {
    return React.useContext<FormGroupContextType | undefined>(FormGroupContext);
}

export const FormGroup = ({
                              view,
                              prototype,
                              className,
                          }: {
    view: FormViewType
    className?: string;
    prototype?: string;
})=> {
    const id = useId();
    const isCheckbox = ['checkbox', 'radio'].includes(view.type || 'input');
    const crudFormContext = UseCrudForm();
    if(crudFormContext) {
        const {canRender, setRendered} = crudFormContext;
        setRendered?.(view, id);
        if (!canRender?.(view, id)) {
            return;
        }
    }

    if(view.name === view.type) {
        return null;
    }

    return (
        <FormGroupContext.Provider value={{id: id}}>
            <div
                className={[...(className?.split(' ') || []), 'mb-3', (isCheckbox && 'form-check')].filter(v => v).join(' ')}
                {...(view.attr && (view.attr instanceof Function ? view.attr() : view.attr))}
            >
                {!isCheckbox && (<FormLabel view={view}/>)}
                <FormWidget view={view} prototype={prototype}/>
                {isCheckbox && (<FormLabel view={view}/>)}
                <FormFieldError name={view.full_name} className={"invalid-feedback"}/>
                <FormHelp view={view}/>
            </div>
        </FormGroupContext.Provider>
    );
}

export default FormGroup;
