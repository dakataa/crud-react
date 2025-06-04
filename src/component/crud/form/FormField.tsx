import {FormViewType} from "@src/type/FormViewType.tsx";
import FormWidget from "@src/component/form/FormWidget.tsx";
import React, {memo} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";

const FormField = memo(({view, namespace, name, prototype}: {
    view: FormViewType;
    namespace?: string;
    name?: string;
    prototype?: string;
}) => {
    return (
        <>
            {view && (
                <DynamicView
                    namespace={namespace}
                    key={view.id}
                    view={name || view.name || 'form'}
                    prefix={"modify/form"}
                    data={view}
                >
                    {
                        Object.keys(view.children || []).length && !view.prototype ?
                            Object.values(view.children || []).map((child) => {
                                return (
                                    <FormField namespace={namespace} key={child.id} view={child} prototype={prototype}/>
                                )
                            })
                            :
                            <FormWidget key={view.id} view={view} prototype={prototype}/>
                    }
                </DynamicView>
            )}
        </>
    );
});

export default FormField;
