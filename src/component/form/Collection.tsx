import React, {useReducer} from "react";
import {FormViewType} from "@src/type/FormViewType";
import {FormField} from "../../../lib/main.ts";
import Link from "@src/component/Link.tsx";
import T from "@src/component/Translation.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";

export type FormFieldProps = {
    view: FormViewType;
    prototype?: string;
}

export type InputProps = {} & FormFieldProps;

const Collection = ({
                        view,
                        prototype,
                    }: InputProps):
    React.JSX.Element => {

    const [items, dispatchItem] = useReducer((state: string[], command: {
        action: 'add' | 'delete',
        name?: string
    }) => {
        const {action, name} = command;
        switch (action) {
            case 'delete': {
                state = [...state.filter(v => v !== name)]
                break;
            }
            default: {
                const name = Math.floor(Math.random() * Date.now())
                state = [...state, name.toString()];
            }
        }

        return state;
    }, Object.keys(view.children ?? []));

    const isPrototype = !!view.prototype;

    return (
        <>
            {items.map((name) => {
                const itemFormView = view.children?.[name] ?? (view.prototype as FormViewType);
                return (
                    <DynamicView key={name} data={{view: itemFormView, prototype: name, delete: () => dispatchItem({action: 'delete', name})}} prefix={"modify/form"} view={view.name + ".item"}>
                        <div className={"mb-3"}>
                            <FormField
                                view={itemFormView}
                                prototype={name}/>

                            {isPrototype && (
                                <Link
                                    to={"#"}
                                    onClick={() => dispatchItem({action: 'delete', name})}
                                    className={"btn btn-outline-danger  btn-sm"}><T>Delete</T></Link>
                            )}
                        </div>
                    </DynamicView>
                )
            })}
            {isPrototype && (
                <Link
                    onClick={() => dispatchItem({action: 'add'})}
                    className={"btn btn-outline-primary btn-sm"}>+ Add</Link>
            )}
        </>
    )
}

export default Collection;
