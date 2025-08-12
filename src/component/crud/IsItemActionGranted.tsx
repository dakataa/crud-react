import {PropsWithChildren} from "react";
import {UseDataProvider} from "@src/context/GetData.tsx";
import {UseListItem} from "@src/context/ListItemContext.tsx";

const IsItemActionGranted = ({action, children, ...props}:  { action: string } & PropsWithChildren) => {

    const {results: data} = UseDataProvider() || {};
    const {id} = UseListItem();

    if(!Object.values(data.entity.data.acl[action] || []).includes(id)) {
        return null;
    }

    return children;
}


export default IsItemActionGranted;
