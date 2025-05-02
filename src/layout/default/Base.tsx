import React, {memo} from "react";
import '@dakataa/crud-theme/scss/theme.scss';

const Base = memo(({children}: {
    children?: any
}) => {

    return (
        <div className={"crud"}>
            {children}
        </div>
    );
});

export default Base;
