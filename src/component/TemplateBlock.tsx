import React, {memo} from "react";
import TemplateExtend from "@src/component/TemplateExtend.tsx";

const TemplateBlock = memo(({name, content, children}: { name: string, content: any, children?: any }) => {
    const contentElement = React.Children.toArray(content).find(x => React.isValidElement(x) && x.type === TemplateExtend && x.props.name === name);
    console.log('content', name);
    return <>{contentElement || children}</>
})

export default TemplateBlock;
