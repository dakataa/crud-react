import React, {forwardRef, ReactElement, useRef, useState} from "react";
import {UseActions} from "@src/context/ActionContext.tsx";
import {GridViewType} from "@src/component/crud/GridView.tsx";
import {default as T} from "@src/component/Translation.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import ListItem from "@src/component/crud/ListItem.tsx";


type ListViewType = GridViewType & {
    item?: ReactElement
};

const ListView = forwardRef(({item, data, columns, onClick, routeParams, namespace}: ListViewType, ref) => {

    const primaryColumn = data?.entity?.primaryColumn;
    const items = data?.entity.data.items ?? [];

    return !!data && (
        <>
            {items.length ? items.map((row, rowIndex) => (
                <DynamicView key={data?.entity.data.items[rowIndex][primaryColumn?.field ?? '']} namespace={data?.entity.name || 'unknown'} data={row} prefix={"list"} view={"listItem"}>
                    <ListItem row={rowIndex} data={data} onClick={onClick} namespace={namespace}/>
                </DynamicView>
            )) : (
                <T>No results found.</T>
            )}
        </>
    );
});

export default ListView;
