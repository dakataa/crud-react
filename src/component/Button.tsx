import React, {ForwardedRef, forwardRef} from "react";
import BaseButton, {Link} from "./BaseButton";

export default forwardRef(({
                    children,
                    preload,
                    ...props
                }: Link & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ref:ForwardedRef<HTMLButtonElement>) => {

    return (
        <button {...{disabled: preload}} {...props} ref={ref}>
            <BaseButton preload={preload} {...props}>{children}</BaseButton>
        </button>
    );
})
