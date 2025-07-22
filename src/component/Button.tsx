import React, {ForwardedRef, forwardRef, PropsWithChildren} from "react";
import BaseButtonContent, {ButtonContentProps} from "./BaseButtonContent.tsx";

export default forwardRef((
    {
        children,
        preload,
        ...props
    }: ButtonContentProps & PropsWithChildren & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ref: ForwardedRef<HTMLButtonElement>) => {

    return (
        <button {...{disabled: preload}} {...props} ref={ref}>
            <BaseButtonContent preload={preload} {...props}>{children}</BaseButtonContent>
        </button>
    );
})
