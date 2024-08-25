import React from "react";

const SESSION_KEY = 'settings';

export type Session = {
    locale?: string,
}

const initialState: Session = {
    locale: import.meta.env.VIEW_LOCALE || 'en',
    // accessToken: null,
    // user: null,
    // branch: null,
    // authChain: []
};

const SessionContext = React.createContext<any>(initialState);

function reducer(currentState: Session, newState: Session) {
    const state = {
        ...currentState,
        ...newState
    };

    sessionStorage.setItem(SESSION_KEY, btoa(JSON.stringify(state)));

    return state;
}

export function UseSession() {
    const context = React.useContext<any>(SessionContext);
    if (!context) {
        throw new Error("useSession must be used in SessionProvider");
    }

    const [state, dispatch] = context;

    // const getUserByAccessToken = (accessToken: AccessToken) => Fetch({
    //     url: buildEndpointURL('/internal-api/profile/me'),
    //     accessToken: accessToken,
    //     showErrors: false
    // });

    return {
        state,
        setParameter: (key: string, value: any) => {
            dispatch({[key]: value})
        },
        setParameters: (parameters: Object) => {
            dispatch(parameters)
        },
        isLoggedIn: (): boolean => {
            return state?.accessToken !== null;
        },
        isLoggedAs: (): boolean => {
            return !!state?.authChain.length;
        },
        // login: (token: AccessToken) => {
        //     dispatch({accessToken: token});
        // },
        logout: () => {
            dispatch({accessToken: null, user: null, authChain: []});
        },
        // setUser: (user: User) => {
        //     dispatch({user: user});
        // },
        // getMe: () => {
        //     getUserByAccessToken(state.accessToken).then((result: Response) => {
        //         switch (result.status) {
        //             case 200: {
        //                 dispatch({user: result.data});
        //                 break;
        //             }
        //         }
        //     }).catch((result: Response) => {
        //         dispatch({accessToken: null, user: null});
        //     });
        // },

    };
}

export function SessionProvider(props: any) {
    let state: any = initialState;
    try {
        const data = sessionStorage.getItem(SESSION_KEY);
        state = JSON.parse(atob(data || ''));
    } catch (e) {
        reducer(initialState, state);
    }

    return (
        <SessionContext.Provider value={React.useReducer(reducer, state)}>
            {props.children}
        </SessionContext.Provider>
    );
}
