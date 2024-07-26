import {Input} from "@src/component/form/Input";
import {Choice} from "@src/component/form/Choice";
import {FormGroup, FormGroupProps} from "@src/component/form/FormGroup";
import React from "react";
import {FormViewType} from "@src/type/FormViewType";

export const FormWidget = ({
                               view
                           }: {
    view: FormViewType,
} & FormGroupProps):
    React.JSX.Element => {

    const elements = () => {
        switch (view.type) {
            case 'entity':
            case 'choice':
            case 'enum': {
                return <Choice view={view}/>
            }
            default:
                return <Input view={view}/>
        }
    }

    return (
        <FormGroup className={"mb-3"} view={view}>
            {elements()}
        </FormGroup>
    )
}
