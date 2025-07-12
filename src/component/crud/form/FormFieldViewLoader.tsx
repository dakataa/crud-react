import {FormViewType, FormViewTypeEnum} from "@src/type/FormViewType.tsx";
import React, {memo, useId} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {FormViewProvider, UseFormView} from "@src/component/crud/form/Form.tsx";
import FormGroup, {FormGroupProvider} from "@src/component/crud/form/FormGroup.tsx";

const FormFieldViewLoader = memo(({options}: {options?: FormViewType}) => {
    const id = useId();
    const {form: view} = UseFormView();

    return (
        <FormGroupProvider id={id} view={view}>
            {view?.type === FormViewTypeEnum.Form ?
                Object.values(view.children || []).map((child, index) => {
                    return (
                        <FormViewProvider key={index} view={child}>
                            <FormFieldViewLoader/>
                        </FormViewProvider>
                    )
                })
                :
                <DynamicView
                    view={view?.name || 'form'}
                    prefix={"modify/form"}
                    data={view}
                >
                    <FormGroup/>
                </DynamicView>}
        </FormGroupProvider>
    )
});

export default FormFieldViewLoader;
