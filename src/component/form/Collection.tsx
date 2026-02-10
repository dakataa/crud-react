import React, {useEffect, useReducer} from "react";
import {FormViewType} from "@src/type/FormViewType";
import Link from "@src/component/Link.tsx";
import T from "@src/component/Translation.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {FormViewProvider, UseFormView, UseParentFormView} from "@src/component/crud/form/Form.tsx";
import FormFieldViewLoader from "@src/component/crud/form/FormFieldViewLoader.tsx";
import {nameToId} from "@src/component/form/Form.tsx";
import FormGroup from "@src/component/form/FormGroup.tsx";

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

    const updatePrototype = (view: FormViewType, index: number) => {
        if (view.prototype_name) {
            const elementFullName = view.full_name?.replace('__name__', view.prototype_name || '') || '';
            const elementId = (view.id || nameToId(elementFullName)).replace('__name__', view.prototype_name || '');
            const elementLabel = (view.label?.replace('__name__label__', index.toString())) || ''
            view.full_name = elementFullName;
            view.id = elementId;
            view.label = (view.label?.replace('__name__label__', elementLabel));

            Object.keys(view.children || {}).map((childKey, index) => {
                const childView = view.children?.[childKey];
                if (childView !== undefined) {
                    if (!childView.prototype_name) {
                        childView.prototype_name = view.prototype_name;
                        updatePrototype(childView as FormViewType, index);
                    }
                }
            }, {})
        }
    }

    return (
        <>
            {items.map((name, index) => {
                const itemFormView = JSON.parse(JSON.stringify((view.children?.[name] ?? (view.prototype || view)))) as FormViewType;

                if (!itemFormView) {
                    return null;
                }

                if (view.children?.[name] === undefined) {
                    itemFormView.prototype_name = name;
                }

                updatePrototype(itemFormView, index);

                return <CollectionItem index={index} view={itemFormView} isPrototype={isPrototype}/>
            })}
        </>
    )
}

export type CollectionItemContextType = {
    index: number,
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

const CollectionItem = ({view, index, isPrototype}: { view: FormViewType, index: number, isPrototype: boolean }) => {
    const {removeItem} = UseCollection();
    const {form: parentView} = UseParentFormView() || {form: view};
    const name = view.prototype_name || view.name || '';

    return (
        <FormViewProvider view={view} allowDuplicates={isPrototype}>
            <CollectionItemContext.Provider value={{index, removeItem: () => removeItem(name)}}>
                <DynamicView
                    prefix={"modify/form"}
                    view={[...view.block_prefixes || [], parentView.name + ".item"]}
                >
                    <div className={"mb-3"}>
                        <FormGroup view={view}/>
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
            </CollectionItemContext.Provider>
        </FormViewProvider>
    )
}

export {Collection as default, CollectionList, CollectionItem, UseCollection, UseCollectionItem};
