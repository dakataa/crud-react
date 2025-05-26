import React, {useReducer} from "react";
import {FormViewType} from "@src/type/FormViewType";
import {FormField} from "../../../lib/main.ts";
import Link from "@src/component/Link.tsx";
import T from "@src/component/Translation.tsx";

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

    const [newItems, dispatchItem] = useReducer((state: string[], command: {
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

        console.log('state', state);

        return state;
    }, Object.keys(view.children ?? []));

    const isPrototype = !!view.prototype;

    return (
        <>
            {newItems.map((name) => {
                return (
                    <div key={name} className={"mb-3"}>
                        <FormField
                            view={view.children?.[name] ?? (view.prototype as FormViewType)}
                            prototype={name}/>

                        {isPrototype && (
                            <Link
                                to={"#"}
                                onClick={() => dispatchItem({action: 'delete', name})}
                                className={"btn btn-outline-danger  btn-sm"}><T>Delete</T></Link>
                        )}
                    </div>
                )
            })}
            {isPrototype && (
                <Link
                    to={"#"}
                    onClick={() => dispatchItem({action: 'add'})}
                    className={"btn btn-outline-primary btn-sm"}>+ Add</Link>
            )}
        </>
    )
}

export default Collection;
