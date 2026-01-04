import React, {memo} from "react";
import TemplateParentBlock from "@src/component/templating/TemplateParentBlock.tsx";

type TemplateExtendType = {
    name: string;
    children?: any;
    parent?: any;
    render?: (...args: any) => void
};

const TemplateExtend: React.FC<TemplateExtendType> = memo<TemplateExtendType>(({name, children, parent, render}: TemplateExtendType) => {
    children = React.Children.toArray((render ? render(parent) : children) || []).map(x => {
        if (React.isValidElement(x) && x.type === TemplateParentBlock) {
            x = React.cloneElement(x as any, {children: parent});
        }

        return x;
    });

    return <>{children}</>
});

export default TemplateExtend;
