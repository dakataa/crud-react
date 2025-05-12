import * as React from 'react';
import {PropsWithChildren, useState} from 'react';
import Exception from "@src/component/error/Exception.tsx";
import HttpException from "@src/component/error/HttpException.tsx";

type ErrorBoundaryProps = {
    fallback?: React.ReactElement | ((error: Exception | null) => void);
    parentErrorBoundaryContext?: ErrorBoundaryContextType | undefined;
    preventDefault?: boolean;
    children?: any;
}

type ErrorBoundaryState = {
    hasError: boolean;
    error: Exception | null
}

type ErrorBoundaryContextType = {
    defaultPrevented: boolean;
    setPreventDefault: (v: boolean) => void;
}

const ErrorBoundaryContext = React.createContext<ErrorBoundaryContextType | undefined>(undefined);

export function UseErrorBoundary() {
    return React.useContext<ErrorBoundaryContextType | undefined>(ErrorBoundaryContext);
}

export function ErrorBoundaryContextProvider({...props}: PropsWithChildren) {
    const [defaultPrevented, setPreventDefault] = useState(false);

    return (
        <ErrorBoundaryContext.Provider value={{defaultPrevented, setPreventDefault}}>
            {props.children}
        </ErrorBoundaryContext.Provider>
    );
}

class ErrorBoundaryHandler extends React.Component<ErrorBoundaryProps & { defaultPrevented?: boolean}, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    private promiseRejectionHandler = (e: PromiseRejectionEvent) => {
        if (!(e.reason instanceof Exception)) {
            return;
        }

        if (this.props.preventDefault || this.props.defaultPrevented) {
            this.props.parentErrorBoundaryContext?.setPreventDefault(true);
        }

        if(this.props.defaultPrevented) {
            return;
        }

        this.setState({
            ...this.state,
            hasError: true,
            error: e.reason
        })
    };

    componentDidMount() {
        window.addEventListener('unhandledrejection', this.promiseRejectionHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.promiseRejectionHandler);
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        if (error instanceof Error) {
            error = new HttpException(0, error.message)
        }

        return {
            hasError: true,
            error: error
        };
    }

    componentDidCatch(error: any, info: any) {
        // Todo: Log error
        console.log('error', error);
    }

    componentDidUpdate(prevProps: Readonly<ErrorBoundaryProps & {
        defaultPrevented?: boolean
    }>, prevState: Readonly<ErrorBoundaryState>, snapshot?: any) {

        if(this.state.error?.detail !== prevState.error?.detail) {
            if (this.state.hasError && !this.props.defaultPrevented) {
                if (this.props.fallback instanceof Function) {
                    this.props.fallback(this.state.error);
                }
            }
        }
    }

    render() {
        if (this.state.hasError && !this.props.defaultPrevented) {
            if(this.props.fallback) {
                if (React.isValidElement(this.props.fallback)) {
                    // You can render any custom fallback UI
                    return React.cloneElement<any>(
                        this.props.fallback, {
                            error: this.state.error,
                            children: this.props.children
                        }
                    );
                }

            }
        }

        return this.props.children;
    }
}

const ErrorBoundaryInner = ({children, ...props}: ErrorBoundaryProps) => {
    const errorBoundaryContext = UseErrorBoundary();

    return (
        <ErrorBoundaryHandler {...props} defaultPrevented={errorBoundaryContext?.defaultPrevented || false}>
            {children}
        </ErrorBoundaryHandler>
    )
}

const ErrorBoundary = ({children, ...props}: ErrorBoundaryProps) => {
    const parentErrorBoundaryContext = UseErrorBoundary();

    return (
        <ErrorBoundaryContextProvider>
            <ErrorBoundaryInner {...props} parentErrorBoundaryContext={parentErrorBoundaryContext}>
                {children}
            </ErrorBoundaryInner>
        </ErrorBoundaryContextProvider>
    )
}


export default ErrorBoundary;
