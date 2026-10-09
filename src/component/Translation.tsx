import React, {PropsWithChildren} from "react";
import {UseConfig} from "@crud-react/context/ConfigContext.tsx";

export type TranslationOptions = {
    domain?: string;
    properties?: { [key: string]: string | number | null };
};

export type TranslationFunction = (key: string, options?: TranslationOptions) => string;

const identityTranslation: TranslationFunction = key => key;

export function UseTranslate(): TranslationFunction {
    return UseConfig().translate ?? identityTranslation;
}

export type TranslationProps = TranslationOptions & {
    translationKey?: string;
};

const Translation = ({children, translationKey, domain, properties = {}}: TranslationProps & PropsWithChildren) => {
    const {translate} = UseConfig();

    if (!translate) {
        return children ?? translationKey;
    }

    const parts = React.Children.toArray(children);
    const key = translationKey ?? (
        parts.length > 0 && parts.every(part => typeof part === "string" || typeof part === "number")
            ? parts.join("")
            : undefined
    );

    if (key !== undefined) {
        const translated = translate(key, {domain, properties});

        return translated === key
            ? (children ?? translated)
            : translated;
    }

    return children;
}

export default Translation;
