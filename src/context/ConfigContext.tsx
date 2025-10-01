import React, {PropsWithChildren} from "react";

export type ConfigLink = {
    path?: string,
    prefix?: string,
    includePrefix?: boolean,
}

export type Templates = { [path:string]: () => Promise<any> };

export type Config = {
    link?: ConfigLink,
    templates?: { [path:string]: () => Promise<any> },
    locale?: string,
    currency?: string,
}

const ConfigContext = React.createContext<Config>({});

export function UseConfig(): Config {
    return React.useContext<Config>(ConfigContext);
}

export function ConfigProvider({config, ...props}: { config: Config } & PropsWithChildren) {
    return (
        <ConfigContext.Provider value={config}>
            {props.children}
        </ConfigContext.Provider>
    );
}
