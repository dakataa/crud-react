import { FormViewTypeEnum } from '@crud-react/type/FormViewType.tsx';
import React, { Fragment, memo, useId } from 'react';
import DynamicView from '@crud-react/component/crud/DynamicView.tsx';
import { FormViewProvider, UseFormView } from '@crud-react/component/crud/form/Form.tsx';
import { FormGroupProvider } from '@crud-react/component/crud/form/FormGroup.tsx';
import { default as BaseFormGroup } from '@crud-react/component/form/FormGroup.tsx';

const FormGroupViewLoader = () => {
    const id = useId();
    const { form: view } = UseFormView();
    const blockPrefixes = [(view.name || 'form') + 'Group', ...(view.block_prefixes || [])].map(
        (v) => v + '_group'
    );

    return (
        <FormGroupProvider id={id} view={view}>
            <DynamicView view={blockPrefixes} prefix={"modify/form"} data={view}>
                {[FormViewTypeEnum.Form, FormViewTypeEnum.Repeated].includes(
                    view?.type as FormViewTypeEnum
                ) ? (
                    Object.entries(view.children || {}).map(([name, child]) => {
                        return (
                            <Fragment key={child.full_name || name}>
                                <FormViewProvider key={child.full_name || name} view={child}>
                                    <FormGroupViewLoader />
                                </FormViewProvider>
                            </Fragment>
                        );
                    })
                ) : (
                    <>
                        <BaseFormGroup view={view} />
                    </>
                )}
            </DynamicView>
        </FormGroupProvider>
    );
};

export default FormGroupViewLoader;
