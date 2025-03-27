import React, {PropsWithChildren} from "react";

type ConfigLink = {
    prefix?: string,
    includePrefix?: boolean,
}

type Config = {
    link?: ConfigLink,
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
