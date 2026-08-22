import React, {memo} from "react";
import Base from "@crud-react/layout/default/Base.tsx";

const Error = memo(({error, resetErrorBoundary, homePath = '/'}: {
    error?: {
        name?: string;
        status?: number;
        detail?: string;
    } | null;
    resetErrorBoundary?: () => void;
    homePath?: string;
}) => {

    const backToHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const target = new URL(homePath, window.location.href);

        if (target.pathname === window.location.pathname && target.search === window.location.search) {
            resetErrorBoundary?.();
            return;
        }

        window.history.pushState(null, '', homePath);
    };

    return (
        <Base>
            <main>
                <div className={"content d-flex flex-column"}>
                    <h1 className={"display-1"}>{error?.name || error?.status || 'Error'}</h1>
                    <p className={"text-secondary"}>{error?.detail || 'Unknown Error'}</p>
                    <br/>
                    <div>
                        <a className={"btn btn-primary"} href={homePath} onClick={backToHome}>Back to home</a>
                    </div>
                </div>
            </main>
        </Base>
    );
});

export default Error;
