import {FormViewTypeEnum} from "@src/type/FormViewType.tsx";
import React, {Fragment, memo, useEffect, useId} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {FormViewProvider, UseFormView} from "@src/component/crud/form/Form.tsx";
import {FormGroupProvider} from "@src/component/crud/form/FormGroup.tsx";
import {default as BaseFormGroup} from "@src/component/form/FormGroup.tsx";

const FormFieldViewLoader = memo(() => {
    const id = useId();
    const {form: view} = UseFormView();

    return (
        <FormGroupProvider id={id} view={view}>
            <DynamicView
                view={[...view.block_prefixes || [], view.name || 'form']}
                prefix={"modify/form"}
                data={view}
            >
                {[FormViewTypeEnum.Form, FormViewTypeEnum.Repeated].includes(view?.type as FormViewTypeEnum) ?
                    Object.values(view.children || []).map((child, index) => {
                        return (
                            <Fragment key={index}>
                                <FormViewProvider key={index} view={child}>
                                    <FormFieldViewLoader/>
                                </FormViewProvider>
                            </Fragment>
                        )
                    })
                    :
                    <>
                        <BaseFormGroup view={view}/>
                    </>
                }
            </DynamicView>
        </FormGroupProvider>
    )
});

export default FormFieldViewLoader;
