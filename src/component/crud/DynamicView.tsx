import React, { memo, ReactElement, ReactNode, useEffect, useState } from 'react';
import { capitalize } from '@crud-react/helper/StringUtils.tsx';
import { UseConfig } from '@crud-react/context/ConfigContext.tsx';
import Empty from '@crud-react/component/Empty.tsx';
import { UseNamespace } from '@crud-react/context/NamespaceContext.tsx';

type DynamicViewContextType = {
    parent?: ReactElement | ReactNode;
    template: string | string[];
    data?: any;
    view?: string | string[];
    namespace?: string;
    isImported: boolean;
};

const DynamicViewContext = React.createContext<DynamicViewContextType | undefined>(undefined);

export function UseDynamicView() {
    return React.useContext<DynamicViewContextType | undefined>(DynamicViewContext);
}

const DynamicView = memo(
    ({
        view,
        prefix,
        namespace,
        children,
        props,
        data
    }: {
        view: string | string[];
        namespace?: string;
        prefix?: string;
        children?: ReactNode;
        data?: any;
        props?: any;
    }) => {
        const { templates: files } = UseConfig();
        const parentDynamicView = UseDynamicView();
        const [loaded, setLoaded] = useState<
            | { path: string; component: React.ComponentType<any> }
            | { path: string; error: unknown }
            | null
        >(null);

        const inheritedNamespace = UseNamespace();
        namespace ??= inheritedNamespace;

        if (!(view instanceof Array)) {
            view = [view];
        }

        view = view.map((v) => {
            return v
                .split(/[._]/)
                .filter((v) => v)
                .map((v) => capitalize(v))
                .join('');
        });

        const possibleTemplateFilePath = [
            ...view.map((v) => {
                return ['crud', namespace, prefix, v].filter((v) => v).join('/') + '.tsx';
            }),
            ...view.map((v) => {
                return ['crud', 'general', prefix, v].filter((v) => v).join('/') + '.tsx';
            })
        ];

        const [templateFilePath, isDuplicated, importMethod] = possibleTemplateFilePath.reduce<any>(
            (result, templateFilePath) => {
                if (result) {
                    return result;
                }

                const [, importMethod] =
                    Object.entries(files ?? {})
                        .filter(([path]) => path.endsWith(templateFilePath))
                        .shift() || [];
                const isDuplicated =
                    parentDynamicView?.template === templateFilePath &&
                    parentDynamicView?.isImported;

                return importMethod !== undefined
                    ? [templateFilePath, isDuplicated, importMethod]
                    : null;
            },
            null
        ) || [false, undefined];

        useEffect(() => {
            if (isDuplicated || !templateFilePath || importMethod === undefined) {
                return;
            }

            let active = true;
            importMethod().then(
                (module: any) => {
                    if (active) {
                        setLoaded({ path: templateFilePath, component: module.default });
                    }
                },
                (error: unknown) => {
                    if (active) {
                        setLoaded({ path: templateFilePath, error });
                    }
                }
            );

            return () => {
                active = false;
            };
        }, [templateFilePath, importMethod, isDuplicated]);

        // Prevent recursion
        if (isDuplicated || !templateFilePath) {
            return children;
        }

        if (loaded && loaded.path === templateFilePath && 'error' in loaded) {
            throw loaded.error;
        }

        const LoadedView =
            loaded && loaded.path === templateFilePath && 'component' in loaded
                ? loaded.component
                : Empty;

        return (
            <DynamicViewContext.Provider
                value={{
                    template: templateFilePath,
                    parent: children,
                    data,
                    view,
                    namespace,
                    isImported: !!importMethod
                }}>
                <LoadedView {...props} />
            </DynamicViewContext.Provider>
        );
    }
);

export default DynamicView;
