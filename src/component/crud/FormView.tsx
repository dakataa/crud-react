import {FormViewType} from "@src/type/FormViewType";
import {FormWidget} from "@src/component/form/FormWidget";
import {titlize} from "@src/helper/StingUtils";
import React from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";

const FormView = ({view}: { view: FormViewType }) => {
    return (
        <>
            {Object.values(view.children || []).map((child, index) => (
                <DynamicView key={index} data={child} prefix={"modify/form"} view={child.name}>
                    {Object.keys(child.children || []).length ? (
                            <div className={"mb-3"}>
                                <label>{child.label || titlize(child.name)}</label>
                                <FormView key={index} view={child}/>
                            </div>
                        ) :
                        <FormWidget
                            view={child}
                        />}
                </DynamicView>
                )
            )}

        </>
    );
}

export default FormView;
