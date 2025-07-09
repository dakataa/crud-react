import Choice from "@src/component/form/Choice";
import React, {useEffect, useId} from "react";
import {FormViewType, FormViewTypeEnum} from "@src/type/FormViewType";
import Input from "@src/component/form/Input.tsx";
import Collection from "@src/component/form/Collection.tsx";
import {UseCrudForm} from "@src/component/crud/form/Form.tsx";
import {UseFormGroup} from "@src/component/form/FormGroup.tsx";

const FormWidget = ({
                        view,
                        prototype
                    }: {
    view: FormViewType,
    prototype?: string
}) => {
    const id = useId()
    const crudFormContext = UseCrudForm();
    const group = UseFormGroup()
    const hasGroup = group !== undefined;

    useEffect(() => {
        return () => {
            if (crudFormContext && !hasGroup) {
                const {unsetRendered} = crudFormContext;
                unsetRendered?.(view, id);
            }
        }
    }, []);

    if (crudFormContext && !hasGroup) {
        const {canRender, setRendered} = crudFormContext;

        setRendered?.(view, id);
        if (canRender && !canRender?.(view, id)) {
            return null;
        }
    }

    switch (view.type) {
        case FormViewTypeEnum.Entity:
        case FormViewTypeEnum.Choice:
        case FormViewTypeEnum.Enum: {
            return <Choice view={view} prototype={prototype}/>
        }
        case FormViewTypeEnum.Collection: {
            return <Collection view={view} prototype={prototype}/>
        }
        case FormViewTypeEnum.Input:
        case FormViewTypeEnum.Text:
        case FormViewTypeEnum.Checkbox:
        case FormViewTypeEnum.Radio:
        case FormViewTypeEnum.Integer:
        case FormViewTypeEnum.Password:
        case FormViewTypeEnum.Email:
        default:
            return <Input view={view} prototype={prototype}/>
    }
}

export default FormWidget;
