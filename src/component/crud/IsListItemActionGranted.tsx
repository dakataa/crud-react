import {PropsWithChildren} from "react";
import {UseDataProvider} from "@crud-react/context/GetData.tsx";
import {UseListItem} from "@crud-react/context/ListItemContext.tsx";
import {ViewType} from "@crud-react/type/ViewType.tsx";
import {ListType} from "@crud-react/type/ListType.tsx";

const IsListItemActionGranted = ({permission, children, id: itemId}: {
    permission?: string | null,
    id?: number | string
} & PropsWithChildren) => {

    const {results: data}: { results?: ViewType | ListType} = UseDataProvider() || {};
    const {id} = itemId ? {id: itemId} : UseListItem();

    if (permission && !Object.values(data?.entity.acl[permission] || []).map(a => a.toString()).includes(id.toString())) {
        return;
    }

    return <>{children}</>;
}


export default IsListItemActionGranted;
