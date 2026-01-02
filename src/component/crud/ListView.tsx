import React, {ReactElement} from "react";
import {GridViewType} from "@src/component/crud/GridView.tsx";
import {default as T} from "@src/component/Translation.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import ListItem from "@src/component/crud/ListItem.tsx";
import {UseList} from "@src/context/ListContext.tsx";
import {ListItemProvider} from "@src/context/ListItemContext.tsx";


type ListViewType = GridViewType & {
    itemView?: ReactElement,
    emptyView?: ReactElement | null
};

const ListView = ({itemView, emptyView, namespace}: ListViewType) => {
    const {items, primaryColumn, data} = UseList();

    return !!data && (
        items.length ? items.map((row, index) => (
            <ListItemProvider key={index} index={index}>
                <DynamicView
                    key={data?.entity?.data.items[index][primaryColumn?.field ?? '']}
                    namespace={namespace}
                    prefix={"list"}
                    view={"listItem"}
                >
                    {itemView ? itemView : <ListItem namespace={namespace}/>}

                </DynamicView>
            </ListItemProvider>
        )) : (
            emptyView === undefined ? <T>No results found.</T> : emptyView
        )
    );
}

export default ListView;
