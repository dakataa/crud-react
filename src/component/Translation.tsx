import React, {PropsWithChildren} from "react";
import DynamicView from "@src/component/crud/DynamicView.tsx";


export type TranslationProps = {
    domain?: string;
    translationKey?: string;
    properties?: { [key: string]: string | number | null }
};

const Translation = ({children, translationKey, domain, properties, ...props}: TranslationProps & PropsWithChildren) => {

    properties ??= {};

    return (
        <DynamicView
            view={"Translation"}
            props={{...props, domain, translationKey, properties}}
        >
            {children}
        </DynamicView>
    )
}

export default Translation;
