import {PropsWithChildren} from "react";
import {UseDataProvider} from "@src/context/GetData.tsx";
import {UseListItem} from "@src/context/ListItemContext.tsx";
import {ViewType} from "@src/type/ViewType.tsx";
import {ListType} from "@src/type/ListType.tsx";

const IsListItemActionGranted = ({action, children, id: itemId}: {
    action: string,
    id?: number | string
} & PropsWithChildren) => {

    const {results: data}: { results?: ViewType | ListType} = UseDataProvider() || {};
    const {id} = itemId ? {id: itemId} : UseListItem();

    if (!Object.values(data?.entity.acl[action] || []).map(a => a.toString()).includes(id.toString())) {
        return null;
    }

    return children;
}


export default IsListItemActionGranted;
