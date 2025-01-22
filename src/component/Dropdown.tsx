import React, {PropsWithChildren, useEffect, useRef} from "react";
import {Link as LinkType} from "./BaseButton";
import Button from "./Button";
import Link from "./Link";
import {default as BootstrapDropdown} from "bootstrap/js/src/dropdown"
import {LinkProps} from "react-router-dom";
import {IconName, IconPrefix} from "@fortawesome/fontawesome-common-types";

const DropdownButton = ({children, disabled, className}: PropsWithChildren<{className?: string, disabled?: boolean}>) => {
    return <>
        {children}
    </>
};

const DropdownContent = ({children, ...props}: { children: any }) => {
    return <div className={"dropdown-menu"}>
        {children}
    </div>
}

const Dropdown = ({items, className, children, icon}: PropsWithChildren<{
    className?: string,
    items?: (LinkProps & LinkType)[],
    icon?: [IconPrefix, IconName] | false
}>) => {
    const ref = useRef<HTMLButtonElement>();
    useEffect(() => {
        const dropdown = new BootstrapDropdown(ref.current);
        return () => {
            dropdown.dispose();
        };
    }, []);

    const contentElement = React.Children.toArray(children).find(x => React.isValidElement(x) && x.type === DropdownContent);
    const linkElements = React.Children.toArray(children).filter(x => React.isValidElement(x) && x.type === Link);
    const buttonElement = React.Children.toArray(children).find(x => React.isValidElement(x) && x.type === DropdownButton);
    const buttonElements = React.Children.toArray(children).filter(x => !React.isValidElement(x) || (x.type !== Link && x.type !== DropdownContent && x.type !== DropdownButton));
    const buttonProps = React.isValidElement(buttonElement) ? buttonElement.props : {};

    return (
        <div className={[...(className || '').split(' '), 'dropdown'].filter((v, i, self) => self.indexOf(v) === i).join(' ')}>
            <Button ref={ref} data-bs-toggle={"dropdown"} {...buttonProps} className={[...(buttonProps.className || '').split(' '), 'btn', 'dropdown-toggle'].filter((v, i, self) => self.indexOf(v) === i).join(' ')}>
                {buttonProps.children ? buttonProps.children : buttonElements}
            </Button>
            {contentElement || (
                <DropdownContent>
                    {linkElements}
                </DropdownContent>
            )}
        </div>
    );
}

export {DropdownContent, DropdownButton};
export default Dropdown;
