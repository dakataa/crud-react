import React from "react";
import TemplateBlock from "@src/component/TemplateBlock.tsx";

const TemplateExtend = ({name, children}: { name: string, children: any }) => {

    return <>{children}</>
}

export default TemplateExtend;
