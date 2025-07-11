import {FormViewTypeEnum} from "@src/type/FormViewType.tsx";
import React, {memo, useEffect, useId} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {FormViewProvider, UseFormView} from "@src/component/crud/form/Form.tsx";
import FormGroup, {FormGroupProvider, UseFormGroup} from "@src/component/crud/form/FormGroup.tsx";

const FormFieldViewLoader = memo(() => {
    const id = useId();
    const {form: view} = UseFormView();

    return (
        <FormGroupProvider id={id} view={view}>
            {view?.type === FormViewTypeEnum.Form ?
                Object.values(view.children || []).map((child) => {
                    return (
                        <FormViewProvider view={child}>
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
