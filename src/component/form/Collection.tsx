import React, {useEffect, useReducer} from "react";
import {FormViewType} from "@src/type/FormViewType";
import Link from "@src/component/Link.tsx";
import T from "@src/component/Translation.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {FormViewProvider, UseFormView, UseParentFormView} from "@src/component/crud/form/Form.tsx";
import FormFieldViewLoader from "@src/component/crud/form/FormFieldViewLoader.tsx";

export type FormFieldProps = {
    view: FormViewType;
}

export type InputProps = {} & FormFieldProps;

export type CollectionContextType = {
    addItem: () => void;
    removeItem: (name: string) => void;
    items: string[];
    isPrototype: boolean;
};

const CollectionContext = React.createContext<CollectionContextType | undefined>(undefined);

const UseCollection = () => {
    const context = React.useContext(CollectionContext);
    if (!context) {
        throw new Error('UseCollection must be used within a Collection');
    }

    return context;
}

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
                if (value && typeof value !== 'string') {
                    throw new Error('Invalid value. Should be a string.');
                }

                state = [...state.filter(v => v !== value)]
                break;
            }
            case 'set': {
                if (!(value instanceof Array)) {
                    throw new Error('Invalid value. Should be a array.');
                }

                state = value;
                break;
            }
            default: {
                if (value && typeof value !== 'string') {
                    throw new Error('Invalid value. Should be a string.');
                }

                const name = Math.floor(Math.random() * Date.now())
                state = [...state, name.toString()];
            }
        }

        return state;
    }, initItems);

    const isPrototype = !!view.prototype;

    const addItem = () => dispatchItem({action: 'add'});

    const removeItem = (name: string) => {
        dispatchItem({action: 'delete', value: name});
    }

    useEffect(() => {
        dispatchItem({action: 'set', value: initItems});
    }, [JSON.stringify(initItems)]);

    return (
        <CollectionContext.Provider value={{
            addItem,
            removeItem,
            items,
            isPrototype
        }}>
            <DynamicView
                key={view.full_name}
                prefix={"modify/form"}
                view={[...view.block_prefixes || [], view.name + ".collection"]}
            >
                <CollectionList/>
                {isPrototype && (
                    <Link
                        onClick={() => addItem()}
                        className={"btn btn-outline-primary btn-sm"}>+ Add</Link>
                )}
            </DynamicView>
        </CollectionContext.Provider>
    )
}

const CollectionList = () => {
    const {items} = UseCollection();
    const {form: view} = UseFormView();
    const isPrototype = !!view.prototype;

    return (
        <>
            {items.map((name) => {
                const itemFormView = view.children?.[name] ?? {...(view.prototype || view)} as FormViewType;

                if (!itemFormView) {
                    return null;
                }

                if (view.children?.[name] === undefined) {
                    itemFormView.prototype_name = name;
                }

                return <>
                    <CollectionItem key={name} view={itemFormView} isPrototype={isPrototype}/>
                </>
            })}
        </>
    )
}

export type CollectionItemContextType = {
    removeItem: () => void;
}
const CollectionItemContext = React.createContext<CollectionItemContextType | undefined>(undefined);

const UseCollectionItem = () => {
    const context = React.useContext(CollectionItemContext);
    if (!context) {
        throw new Error('UseCollectionItem must be used within a CollectionItem');
    }

    return context;
}

const CollectionItem = ({view, isPrototype}: { view: FormViewType, isPrototype: boolean }) => {
    const {removeItem} = UseCollection();
    const {form: parentView} = UseParentFormView() || {form: view};
    const name = view.prototype_name || view.name || '';

    return (
        <CollectionItemContext.Provider value={{removeItem: () => removeItem(name)}}>
            <FormViewProvider view={view} allowDuplicates={isPrototype}>
                <DynamicView
                    key={parentView?.full_name + '.item'}
                    data={{
                        view: view,
                        name
                    }}
                    prefix={"modify/form"}
                    view={[...view.block_prefixes || [], parentView.name + ".item"]}
                >
                    <div className={"mb-3"}>
                        <FormFieldViewLoader/>
                        {isPrototype && (
                            <Link
                                to={"#"}
                                onClick={() => removeItem(name)}
                                className={"btn btn-outline-danger btn-sm"}
                            >
                                <T>Delete</T>
                            </Link>
                        )}
                    </div>
                </DynamicView>
            </FormViewProvider>
        </CollectionItemContext.Provider>
    )
}

export {Collection as default, CollectionList, CollectionItem, UseCollection, UseCollectionItem};
