import React, {memo} from "react";
import Base from "@src/layout/default/Base.tsx";

const Error = memo(({error}: {
    error?: any
}) => {

    return (
        <Base>
            <main>
                <div className={"content d-flex flex-column"}>
                    <h1 className={"display-1"}>{error?.status || 'Error'}</h1>
                    <p className={"text-secondary"}>{error?.detail || 'Unknown Error'}</p>
                    <br/>
                    <div>
                        <a className={"btn btn-primary"} href={"#"}>Back to home</a>
                    </div>
                </div>
            </main>
        </Base>
    );
});

export default Error;
