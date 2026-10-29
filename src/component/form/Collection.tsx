import React, { useMemo } from 'react';
import { FormViewType } from '@crud-react/type/FormViewType';
import Link from '@crud-react/component/Link.tsx';
import T from '@crud-react/component/Translation.tsx';
import DynamicView from '@crud-react/component/crud/DynamicView.tsx';
import {
    FormViewProvider,
    UseFormView,
    UseParentFormView
} from '@crud-react/component/crud/form/Form.tsx';
import { useFormCollection } from './Form.tsx';
import { instantiateView } from './formView.ts';
import FormGroup from '@crud-react/component/form/FormGroup.tsx';

export type FormFieldProps = {
    view: FormViewType;
};

export type InputProps = {} & FormFieldProps;

export type CollectionContextType = {
    addItem: () => void;
    removeItem: (name: string) => void;
    items: string[];
    isPrototype: boolean;
};

let nextItemId = 0;
const CollectionContext = React.createContext<CollectionContextType | undefined>(undefined);

const UseCollection = () => {
    const context = React.useContext(CollectionContext);

    if (!context) {
        throw new Error('UseCollection must be used within a Collection');
    }

    return context;
};

const Collection = ({ view }: InputProps): React.JSX.Element => {
    const collection = useFormCollection(view.full_name || '', Object.keys(view.children || {}));
    const items = collection.items;
    const isPrototype = !!view.prototype;

    const addItem = () => {
        return collection.add(globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${nextItemId++}`);
    };

    const removeItem = (name: string) => collection.remove(name);

    return (
        <CollectionContext.Provider
            value={{
                addItem,
                removeItem,
                items,
                isPrototype
            }}>
            <input type="hidden" data-form-collection={view.full_name} />
            <DynamicView
                key={view.full_name}
                prefix={"modify/form"}
                view={[...(view.block_prefixes || []), view.name + ".collection"]}>
                <CollectionList />
                {isPrototype && (
                    <Link onClick={() => addItem()} className={"btn btn-outline-primary btn-sm"}>
                        + Add
                    </Link>
                )}
            </DynamicView>
        </CollectionContext.Provider>
    );
};

const CollectionList = () => {
    const { items } = UseCollection();
    const { form: view } = UseFormView();
    const isPrototype = !!view.prototype;

    const views = useMemo(() => {
        return items.map((name, index) => {
            const source = view.children?.[name];

            if (source) {
                return source;
            }

            if (!view.prototype) {
                return null;
            }

            return instantiateView(view.prototype, view, name, index);
        });
    }, [view, items]);

    return (
        <>
            {items.map((name, index) => {
                const itemView = views[index];

                return itemView ? (
                    <CollectionItem
                        key={name}
                        name={name}
                        index={index}
                        view={itemView}
                        isPrototype={isPrototype}
                    />
                ) : null;
            })}
        </>
    );
};

export type CollectionItemContextType = {
    index: number;
    removeItem: () => void;
};
const CollectionItemContext = React.createContext<CollectionItemContextType | undefined>(undefined);

const UseCollectionItem = () => {
    const context = React.useContext(CollectionItemContext);

    if (!context) {
        throw new Error('UseCollectionItem must be used within a CollectionItem');
    }

    return context;
};

const CollectionItem = ({
    view,
    name: itemName,
    index,
    isPrototype
}: {
    view: FormViewType;
    name?: string;
    index: number;
    isPrototype: boolean;
}) => {
    const { removeItem } = UseCollection();
    const { form: parentView } = UseParentFormView() || { form: view };
    const name = itemName || view.prototype_name || view.name || '';

    return (
        <FormViewProvider view={view} allowDuplicates={isPrototype}>
            <CollectionItemContext.Provider
                value={{
                    index,
                    removeItem: () => removeItem(name)
                }}>
                <DynamicView
                    prefix={"modify/form"}
                    view={[...(view.block_prefixes || []), parentView.name + ".item"]}>
                    <div className={"mb-3"}>
                        <FormGroup view={view} />
                        {isPrototype && (
                            <Link
                                to={"#"}
                                onClick={() => removeItem(name)}
                                className={"btn btn-outline-danger btn-sm"}>
                                <T>Delete</T>
                            </Link>
                        )}
                    </div>
                </DynamicView>
            </CollectionItemContext.Provider>
        </FormViewProvider>
    );
};

export { Collection as default, CollectionList, CollectionItem, UseCollection, UseCollectionItem };
