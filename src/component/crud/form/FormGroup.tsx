import {FormViewProvider, UseFormView} from "@src/component/crud/form/Form.tsx";
import {default as BaseFormGroup} from "@src/component/form/FormGroup.tsx";
import React, {PropsWithChildren, useId} from "react";
import {FormViewType} from "@src/type/FormViewType.tsx";

type FormGroupContextType = {
    id: string;
    view: FormViewType;
}

const FormGroupContext = React.createContext<FormGroupContextType | undefined>(undefined);

export function UseFormGroup(): FormGroupContextType | undefined {
    return React.useContext<FormGroupContextType | undefined>(FormGroupContext);
}

export function FormGroupProvider({id, view, children}: FormGroupContextType & PropsWithChildren) {
    return (
        <FormGroupContext.Provider value={{id: id, view: view}}>
            {children}
        </FormGroupContext.Provider>
    );
}

const FormGroup = (
    {
        name
    }: {
        name?: string
    }) => {
    const id = useId();
    const {form} = UseFormView();
    const view = name ? form?.children?.[name] : form;

    if (!view) {
        throw new Error('Missing Provided Form View to Form Group' + (name ? ': ' + name : ''));
    }

    return (
        <FormViewProvider view={view}>
            <FormGroupProvider {...{id: id, view: view}}>
                <BaseFormGroup view={view}/>
            </FormGroupProvider>
        </FormViewProvider>
    );
}


export default FormGroup;
