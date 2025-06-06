import Choice from "@src/component/form/Choice";
import {FormGroupProps} from "@src/component/form/FormGroup";
import React from "react";
import {FormViewType} from "@src/type/FormViewType";
import Input from "@src/component/form/Input.tsx";
import Collection from "@src/component/form/Collection.tsx";

const FormWidget = ({
                        view,
                        prototype
                    }: {
    view: FormViewType,
    prototype?: string
} & FormGroupProps):
    React.JSX.Element => {

    switch (view.type) {
        case 'entity':
        case 'choice':
        case 'enum': {
            return <Choice view={view} prototype={prototype}/>
        }
        case 'collection': {
            return <Collection view={view} prototype={prototype}/>
        }
        default:
            return <Input view={view} prototype={prototype}/>
    }
}

export default FormWidget;
