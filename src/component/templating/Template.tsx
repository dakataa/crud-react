import React, {ComponentType, FC, PropsWithChildren, ReactNode, useEffect, useReducer} from "react";

type TemplateBlocksType = { [key: string]: (ReactNode | null)[] }

type TemplateBlockDispatchType = {
    action: 'set' | 'unset',
    block: string,
    element?: ReactNode
}

type TemplateContextType = {
    name: string,
    blocks: TemplateBlocksType,
    getBlock: (name: string) => ReactNode | null | undefined,
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

        const currentBlock = state[command.block] || [];

        if (command.action === 'set') {
            currentBlock.push(command.element || null);
        } else {
            currentBlock.pop();
        }

        console.log('block', command.action, name, currentBlock);

        return {
            ...state,
            [command.block]: currentBlock
        };
    }, {});

    return (
        <TemplateContext.Provider value={{
            name,
            blocks,
            getBlock: (blockName: string) => [...(blocks[blockName] || [])].pop(),
            getParent: (blockName: string) => [...(blocks[blockName] || [])].slice(-2).shift(),
            dispatch
        }}>
            {children}
        </TemplateContext.Provider>
    )
}


const BlockContext = React.createContext<{name: string, children: ReactNode | undefined} | undefined>(undefined);

const Block = ({name, children}: PropsWithChildren & { name: string, template?: string }) => {
    const {dispatch, getBlock} = UseTemplate();
    const block = getBlock(name);

    return (
        <BlockContext.Provider value={{name, children}}>
            {block === undefined ? children : block}
        </BlockContext.Provider>
    )
}


const Extend = ({name, children}: PropsWithChildren & { name: string }) => {
    const {dispatch} = UseTemplate();

    useEffect(() => {
        dispatch({
            action: 'set',
            block: name,
            element: children
        })

        return () => {
            dispatch({
                action: 'unset',
                block: name,
            })
        }
    }, [children])

    return null;
}

const Parent = () => {
    const {name, children} = React.useContext(BlockContext) || {};
    const {getParent} = UseTemplate();

    return (name ? getParent(name) : null) || children || null;
};

function AsTemplate<P extends { children?: ReactNode }>(Component: ComponentType, options: { name: string }): FC<P> {

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
