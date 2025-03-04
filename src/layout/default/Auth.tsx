import React, {memo} from "react";
import {Outlet} from "react-router-dom";
import Base from "@src/layout/default/Base.tsx";

const Auth = memo(({children}: {
    children?: any
}) => {

    return (
        <Base>
            <main>
                <Outlet/>
            </main>
        </Base>
    );
});

export default Auth;
