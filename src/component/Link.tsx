import React from "react";
import {Link, LinkProps} from "react-router-dom";
import BaseButton, {Link as LinkType} from "./BaseButton";

export default ({to, children, ...props}: LinkProps & React.RefAttributes<HTMLAnchorElement> & LinkType) => {
    return (
        <Link to={to} {...props}>
            <BaseButton {...props}>{children && children}</BaseButton>
        </Link>
    );
}
