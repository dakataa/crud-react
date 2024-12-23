import React, {cloneElement, memo, ReactElement, ReactNode} from "react";
import TemplateExtend from "@src/component/TemplateExtend.tsx";

const TemplateBlock = memo(({name, content, children, data}: { name: string, content: any, children?: any, data: any }) => {
    // const findElement = (node: ReactNode): ReactNode  =>  React.Children.toArray(node).find(x => (React.isValidElement(x) && x.type === TemplateExtend && x.props.name === name));
    // const findAllElements = (node: ReactNode): ReactNode[] => React.Children.toArray(node).reduce((previousValue: ReactNode[], currentValue: any) => {
    //     // console.log('children', React.Children.toArray(node), currentValue.props.children);
    //     return [
    //         ...previousValue,
    //         // findElement(currentValue),
    //         // ...findAllElements(currentValue)
    //     ].filter(v => v);
    // }, []);
    //
    // // const templateElements = findAllElements(content);
    //
    // // console.log('elements', name, templateElements);
    // const templateElement = findElement(children);

    const templateElement = React.Children.toArray(content).find(x => React.isValidElement(x) && x.type === TemplateExtend && x.props.name === name);
    let contentElement = null;
    if(templateElement && React.isValidElement(templateElement)) {
       contentElement = React.cloneElement(templateElement as any, { parent: children, data: data }) ;
    }

    const restChildren = React.Children.toArray(children).filter(e => React.isValidElement(e) && e.type !== TemplateExtend);

    return <>{contentElement || children }</>
})

export default TemplateBlock;
