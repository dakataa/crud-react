import React, {memo} from "react";
import TemplateBlock from "@src/component/TemplateBlock.tsx";
import TemplateParentBlock from "@src/component/TemplateParentBlock.tsx";

const TemplateExtend = memo(({name, children, data, parent, render}: { name: string, children?: any, parent?: any, data?: any, render?: Function }) => {
    children = React.Children.toArray((render ? render(data, parent) : children) || []).map(x => {
        if(React.isValidElement(x) && x.type === TemplateParentBlock) {
            x = React.cloneElement<TemplateParentBlock>(x as any, { children: parent }) ;
        }

        return x;
    });

    return <>{children}</>
})

export default TemplateExtend;
