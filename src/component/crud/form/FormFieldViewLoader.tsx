import {FormViewType} from "@src/type/FormViewType.tsx";
import FormGroup from "@src/component/form/FormGroup.tsx";
import React, {memo, useEffect, useId} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {UseCrudForm} from "@src/component/crud/form/Form.tsx";

const FormFieldViewLoader = memo(({view, prototype}: {
    view: FormViewType;
    prototype?: string;
}) => {
    const id = useId()
    const {isRendered, setRendered} = UseCrudForm();
    setRendered?.(view, id);

    if (isRendered?.(id)) {
        return;
    }

    return (
        <>
            {view && (
                <>
                    {view && (
                        Object.keys(view.children || []).length && !view.prototype ?
                            Object.values(view.children || []).map((child) => {
                                return (
                                    <FormFieldViewLoader key={child.id} view={child} prototype={prototype}/>
                                )
                            })
                            :
                            <>
                                <DynamicView
                                    key={view.id}
                                    view={view.name || 'form'}
                                    prefix={"modify/form"}
                                    data={view}
                                >
                                    <FormGroup key={view.id} view={view} prototype={prototype}/>
                                </DynamicView>
                            </>
                    )}
                </>
            )}
        </>
    );
});

export default FormFieldViewLoader;
