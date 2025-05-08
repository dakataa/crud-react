import React, {forwardRef, ReactElement} from "react";
import {GridViewType} from "@src/component/crud/GridView.tsx";
import {default as T} from "@src/component/Translation.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import ListItem from "@src/component/crud/ListItem.tsx";
import {UseList} from "@src/context/ListContext.tsx";
import {ListItemProvider} from "@src/context/ListItemContext.tsx";


type ListViewType = GridViewType & {
    item?: ReactElement
};

const ListView = forwardRef(({item, routeParams, namespace}: ListViewType, ref) => {
    const {items, primaryColumn, data} = UseList();

    return !!data && (
        items.length ? items.map((row, index) => (
            <ListItemProvider key={index} index={index}>
                <DynamicView
                    key={data?.entity.data.items[index][primaryColumn?.field ?? '']}
                    namespace={data?.entity.name || 'unknown'} data={row} prefix={"list"}
                    view={"listItem"}>
                    {item ? item : <ListItem namespace={namespace}/>}

                </DynamicView>
            </ListItemProvider>
        )) : (
            <T>No results found.</T>
        )
    );
});

export default ListView;
