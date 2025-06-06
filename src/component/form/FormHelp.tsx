import {FormViewType} from "@src/type/FormViewType";
import React from "react";

export const FormHelp = ({
                              view,
                              className
                          }: {
    view: FormViewType
    className?: string
}): React.JSX.Element => {

    return (
        <>
            {view.help && (
                <div
                    className={'form-help'}
                    {...(view.help_attr && (view.help_attr instanceof Function ? view.help_attr() : view.help_attr))}
                >
                    {view.help}
                </div>
            )}
        </>
    );
}

export default FormHelp;
