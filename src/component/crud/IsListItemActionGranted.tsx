import {PropsWithChildren, useCallback} from "react";
import {UseDataProvider} from "@crud-react/context/GetData.tsx";
import {UseListItem} from "@crud-react/context/ListItemContext.tsx";
import {ViewType} from "@crud-react/type/ViewType.tsx";
import {ListType} from "@crud-react/type/ListType.tsx";

type IsGrantedProps = {
    permission?: string | null,
    id?: number | string
};

const useListItemActionGranted = () => {
    const {results: data}: { results?: ViewType | ListType } = UseDataProvider() || {};

    const isListItemGranted = useCallback(({permission, id}: IsGrantedProps): boolean => {
        return typeof(permission) === "string" && Object.values(data?.entity.acl[permission] || []).map(a => a.toString()).includes(id?.toString() || '');
    }, [data]);

    return {
        isListItemGranted
    }
}

const IsListItemActionGranted = ({permission, children, id: itemId}: IsGrantedProps & PropsWithChildren) => {

    const {isListItemGranted} = useListItemActionGranted();
    const {id} = itemId ? {id: itemId} : UseListItem();

    if (!isListItemGranted({permission, id})) {
        return;
    }

    return <>{children}</>;
}


export {IsListItemActionGranted as default, useListItemActionGranted};
