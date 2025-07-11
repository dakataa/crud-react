import React, {useEffect, useReducer} from "react";
import {FormViewType} from "@src/type/FormViewType";
import Link from "@src/component/Link.tsx";
import T from "@src/component/Translation.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {FormViewProvider} from "@src/component/crud/form/Form.tsx";
import FormFieldViewLoader from "@src/component/crud/form/FormFieldViewLoader.tsx";

export type FormFieldProps = {
    view: FormViewType;
}

export type InputProps = {} & FormFieldProps;

const Collection = ({
                        view,
                    }: InputProps):
    React.JSX.Element => {

    const initItems = Object.keys(view.children || []);

    const [items, dispatchItem] = useReducer((state: string[], command: {
        action: 'add' | 'delete' | 'set',
        value?: string | string[]
    }) => {
        const {action, value} = command;
        switch (action) {
            case 'delete': {
                if(value && typeof value !== 'string') {
                    throw new Error('Invalid value. Should be a string.');
                }

                state = [...state.filter(v => v !== value)]
                break;
            }
            case 'set': {
                if(!(value instanceof Array)) {
                    throw new Error('Invalid value. Should be a array.');
                }

                state = value;
                break;
            }
            default: {
                if(value && typeof value !== 'string') {
                    throw new Error('Invalid value. Should be a string.');
                }

                const name = Math.floor(Math.random() * Date.now())
                state = [...state, name.toString()];
            }
        }

        return state;
    }, initItems);

    const isPrototype = !!view.prototype;

    const removeItem = (name: string) => {
        dispatchItem({action: 'delete', value: name});
    }

    useEffect(() => {
        dispatchItem({action: 'set', value: initItems});
    }, [JSON.stringify(initItems)]);

    return (
        <>
            {items.map((name) => {
                const itemFormView = view.children?.[name] ?? (view.prototype as FormViewType);

                if(!itemFormView) {
                    return <></>;
                }

                return (
                    <FormViewProvider view={itemFormView}>
                        <DynamicView key={itemFormView.full_name} data={{
                            view: itemFormView,
                            prototype: name,
                            delete: () => removeItem(name)
                        }} prefix={"modify/form"} view={view.name + ".item"}>
                            <div className={"mb-3"}>
                                <FormFieldViewLoader />
                                {isPrototype && (
                                    <Link
                                        to={"#"}
                                        onClick={() => removeItem(name)}
                                        className={"btn btn-outline-danger  btn-sm"}><T>Delete</T></Link>
                                )}
                            </div>
                        </DynamicView>
                    </FormViewProvider>
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
