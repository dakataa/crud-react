import React, {memo} from "react";
import TemplateExtend from "@src/component/TemplateExtend.tsx";

const TemplateBlock = memo(({name, content, children, data}: { name: string, content: any, children?: any, data: any }) => {
    const templateElement = React.Children.toArray(content).find(x => React.isValidElement(x) && x.type === TemplateExtend && x.props.name === name);

    let contentElement = null;
    if(templateElement && React.isValidElement(templateElement)) {
       contentElement = React.cloneElement(templateElement as any, { parent: children, data: data }) ;
    }

    return <>{contentElement || children }</>
})

export default TemplateBlock;
