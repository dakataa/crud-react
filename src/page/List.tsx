import React from "react";
import ListView from "@src/component/ListView";
import {ActionType} from "@src/type/ActionType.tsx";

const List = ({action, routeParams}: {
    action?: ActionType,
    routeParams?: { [key: string]: any };
}) => {
    return (
        <ListView action={action} routeParams={routeParams}/>
    );
}

export default List;
