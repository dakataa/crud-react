import React, {ComponentType, FC, PropsWithChildren, ReactNode, useEffect, useId, useReducer} from "react";

type TemplateBlocksType = { [key: string]: ({ id: string, element: ReactNode | null })[] };

type TemplateBlockDispatchType = {
    id: string,
    action: 'set' | 'unset',
    block: string,
    template?: string,
    element?: ReactNode
}

type TemplateContextType = {
    name: string,
    blocks: TemplateBlocksType,
    getBlock: (name: string, template?: string) => ReactNode | null | undefined,
    getParent: (name: string) => ReactNode | null | undefined,
    dispatch: React.Dispatch<TemplateBlockDispatchType>
}
const TemplateContext = React.createContext<TemplateContextType | undefined>(undefined);

const UseTemplate = () => {
    const context = React.useContext<TemplateContextType | undefined>(TemplateContext);

    if (!context) {
        throw new Error('UseTemplate must be used inside Template');
    }

    return context;
}

const Template = ({name, children}: { name: string } & PropsWithChildren) => {
    const parentTemplate = React.useContext<TemplateContextType | undefined>(TemplateContext);

    const [blocks, dispatch] = useReducer((state: TemplateBlocksType, command: TemplateBlockDispatchType) => {

        if (command.template && command.template !== name) {
            parentTemplate?.dispatch(command);

            return state;
        }

        const currentBlock = state[command.block] || [];
        const element = command.element || null;

        if (command.action === 'set') {
            const existBlock = currentBlock.find(b => b.id === command.id);
            if(existBlock) {
                existBlock.element = element;
            } else {
                currentBlock.push({
                    id: command.id,
                    element
                })
            }

        } else {
            currentBlock.filter(b => b.id === command.id).forEach(b => {
                b.element = null;
            });
        }

        // console.log(command.action, name, command.block, currentBlock);

        return {
            ...state,
            [command.block]: currentBlock
        };
    }, {});

    return (
        <TemplateContext.Provider value={{
            name,
            blocks,
            getBlock: (blockName: string, template?: string) => {
                if (template && template !== name) {
                    return parentTemplate?.getBlock(blockName, template);
                }

                return [...(blocks[blockName] || [])].pop()?.element;
            },
            getParent: (blockName: string) => [...(blocks[blockName] || [])].slice(-2).shift()?.element,
            dispatch
        }}>
            {children}
        </TemplateContext.Provider>
    )
}


const BlockContext = React.createContext<{ name: string, children: ReactNode | undefined } | undefined>(undefined);

const Block = ({name, template, children}: PropsWithChildren & { name: string, template?: string }) => {
    const {getBlock} = UseTemplate();
    const block = getBlock(name, template);

    return (
        <BlockContext.Provider value={{name, children}}>
            {block === undefined ? children : block}
        </BlockContext.Provider>
    )
}


const Extend = ({name, template, children}: PropsWithChildren & { name: string, template?: string }) => {
    const id = useId();
    const {dispatch} = UseTemplate();

    const unset = () => {
        dispatch({
            id,
            action: 'unset',
            template,
            block: name,
        })
    }

    useEffect(() => {
        dispatch({
            id,
            action: 'set',
            block: name,
            template,
            element: children
        });

        return () => {
            unset();
        }
    }, [children])

    useEffect(() => {
        return () => {
            unset();
        }
    }, []);

    return null;
}

const Parent = () => {
    const {name, children} = React.useContext(BlockContext) || {};
    const {name: templateName, getParent} = UseTemplate();
    const parent = (name ? getParent(name) : null);

    return parent || children || null;
};

function AsTemplate<P extends {}>(Component: ComponentType<P>, options: { name: string }): FC<P> {

    return (props: P & { children?: ReactNode }) => {
        // React.Children.toArray(props.children).map((c) => {
        //     if (!React.isValidElement(c) || c.type !== Extend) {
        //        throw new Error('Template children must contains only elements of type Extend');
        //     }
        // });

        return (
            <Template name={options.name}>
                <Component {...props as P}/>
                {props.children}
            </Template>
        )
    };
}

export {AsTemplate, Template, Block, Extend, Parent};
