import React, {ReactElement} from "react";
import {GridViewType} from "@crud-react/component/crud/GridView.tsx";
import {default as T} from "@crud-react/component/Translation.tsx";
import DynamicView from "@crud-react/component/crud/DynamicView.tsx";
import ListItem from "@crud-react/component/crud/ListItem.tsx";
import {UseList} from "@crud-react/context/ListContext.tsx";
import {ListItemProvider} from "@crud-react/context/ListItemContext.tsx";


type ListViewType = GridViewType & {
    itemView?: ReactElement,
    emptyView?: ReactElement | null
};

const ListView = ({itemView, emptyView, namespace}: ListViewType) => {
    const {items, primaryColumn, data} = UseList();

    return !!data && (
        items?.length ? items.map((row, index: number) => (
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
