import React, {HTMLAttributes, PropsWithChildren} from "react";

export enum Environment {
    PROD = 'prod',
    DEV = 'dev',
    TEST = 'test',
}

export type ConfigLink = {
    path?: string,
    prefix?: string,
    includePrefix?: boolean,
}

export type Templates = { [path:string]: () => Promise<any> };

export type Config = {
    env: Environment | string,
    link?: ConfigLink,
    templates?: { [path:string]: () => Promise<any> },
    locale?: string,
    currency?: string,
    options?:  {
        // Standard HTML Elements
        HTMLTableElement: HTMLAttributes<HTMLTableElement>,
        // Crud Components
        GridView: HTMLAttributes<HTMLDivElement>,
    },
}

const ConfigContext = React.createContext<Config>({
    env: Environment.PROD,
});

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
