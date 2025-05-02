import {FormViewType} from "@src/type/FormViewType.tsx";
import FormWidget from "@src/component/form/FormWidget.tsx";
import React, {memo} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";

const FormField = memo(({view, namespace, name}: { view: FormViewType, namespace?: string, name?: string }) => {
    return (
        view && <DynamicView
            namespace={namespace}
            key={view.id}
            view={name || view.name || 'form'}
            prefix={"modify/form"}
            data={view}
        >
            {
                Object.keys(view.children || []).length ?
                    Object.values(view.children || []).map((child) => {
                        return (
                            <FormField namespace={namespace} key={child.id} view={child}/>
                        )
                    })
                    :
                    <FormWidget key={view.id} view={view}/>
            }
        </DynamicView>
    );
});

export default FormField;
