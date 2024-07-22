import {ActionType} from "@src/type/ActionType";
import Modify from "@src/page/Modify";
import EmptyView from "@src/component/EmptyView";
import List from "@src/page/List";

export default ({action, ...props}: { action: ActionType}): any => {

    console.log("action", action);
    switch (action.name) {
        case 'add':
        case 'edit': {
            return <Modify/>
        }
        case 'list': {
            return <List/>
        }
        default:
            return <EmptyView/>;
    }
}
