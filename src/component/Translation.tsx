import {memo} from "react";

const Translation = memo(({children}: {children?: string}) => {
    return <>{children}</>
})

export default Translation;
