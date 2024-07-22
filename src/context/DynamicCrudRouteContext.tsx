import React, {Dispatch, PropsWithChildren} from "react";
import {RouteType} from "@src/type/RouteType";

const STORAGE_KEY = 'routes';
const DynamicCrudRouteContext = React.createContext<any>(null);

function reducer(currentState: RouteType[]|null, newState: RouteType[]) {
    const state = {
        ...newState
    };

    sessionStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(state)));

    return state;
}

export function useDynamicCrudRoutes() {
    const context = React.useContext<RouteType[] | null>(DynamicCrudRouteContext);
    if (!context) {
        throw new Error("context must be used in DynamicCrudRouteProvider");
    }

    const [routes, dispatch] = context;

    // const getUserByAccessToken = (accessToken: AccessToken) => Fetch({
    //     url: buildEndpointURL('/internal-api/profile/me'),
    //     accessToken: accessToken,
    //     showErrors: false
    // });

    return {
        routes,
    };
}

export function DynamicCrudRouteProvider(props: PropsWithChildren) {
    let state: RouteType[] | null = [];
    try {
        const data = sessionStorage.getItem(STORAGE_KEY);
        state = JSON.parse(atob(data || '')) as RouteType[];
    } catch (e) {
        reducer(null, state);
    }

    return (
        <DynamicCrudRouteContext.Provider value={React.useReducer(reducer, state)}>
            {props.children}
        </DynamicCrudRouteContext.Provider>
    );
}
