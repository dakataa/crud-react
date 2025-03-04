import React, {memo} from "react";
import '@dakataa/crud-theme/scss/theme.scss';

const Base = memo(({children}: {
    children?: any
}) => {

    return (
        <>
            {children}
        </>
    );
});

export default Base;
