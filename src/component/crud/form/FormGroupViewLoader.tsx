import {FormViewTypeEnum} from "@src/type/FormViewType.tsx";
import React, {Fragment, memo, useId} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {FormViewProvider, UseFormView} from "@src/component/crud/form/Form.tsx";
import {FormGroupProvider} from "@src/component/crud/form/FormGroup.tsx";
import {default as BaseFormGroup} from "@src/component/form/FormGroup.tsx";

const FormGroupViewLoader = () => {
    const id = useId();
    const {form: view} = UseFormView();
    const blockPrefixes = [(view.name || 'form') + 'Group', ...view.block_prefixes || []].map(v => v + '_group');

    return (
        <FormGroupProvider id={id} view={view}>
            <DynamicView
                view={blockPrefixes}
                prefix={"modify/form"}
                data={view}
            >
                {[FormViewTypeEnum.Form, FormViewTypeEnum.Repeated].includes(view?.type as FormViewTypeEnum) ?
                    Object.values(view.children || []).map((child, index) => {
                        return (
                            <Fragment key={index}>
                                <FormViewProvider key={index} view={child}>
                                    <FormGroupViewLoader/>
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
}

export default FormGroupViewLoader;
