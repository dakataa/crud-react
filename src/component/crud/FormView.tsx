import {FormViewType} from "@src/type/FormViewType";
import {FormWidget} from "@src/component/form/FormWidget";
import {titlize} from "@src/helper/StingUtils";
import React from "react";

const FormView = ({view, ...props}: { view: FormViewType }) => {
    return (
        <>
            {Object.values(view.children || []).map((child, index) => (
                    Object.keys(child.children || []).length ? (
                            <div key={index} className={"mb-3"}>
                                <label>{child.label || titlize(child.name)}</label>
                                <FormView key={index} view={child}/>
                            </div>
                        ) :
                        <FormWidget
                            view={child}
                            key={index}
                        />
                )
            )}

        </>
    );
}

export default FormView;
