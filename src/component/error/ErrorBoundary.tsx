import * as React from 'react';
import {PropsWithChildren} from 'react';
import Exception from "@crud-react/component/error/Exception.tsx";
import HttpException from "@crud-react/component/error/HttpException.tsx";
import DefaultError from "@crud-react/layout/default/Error.tsx";

type ErrorFallback = React.ReactElement | ((error: Exception | null) => void);

type ErrorBoundaryProps = {
    fallback?: ErrorFallback;
    resetKeys?: readonly unknown[];
    children?: any;
}

type ErrorBoundaryHandlerProps = Omit<ErrorBoundaryProps, 'fallback'> & {
    fallback: ErrorFallback;
    handleUnhandledRejections: boolean;
}

type ErrorBoundaryState = {
    hasError: boolean;
    error: Exception | null
}

const initialState: ErrorBoundaryState = {
    hasError: false,
    error: null
};

const resetKeysChanged = (previous?: readonly unknown[], current?: readonly unknown[]) => {
    if (!previous || !current) {
        return false;
    }

    return previous.length !== current.length || previous.some((value, index) => !Object.is(value, current[index]));
};

const normalizeError = (error: unknown): Exception => {
    if (error instanceof Exception) {
        return error;
    }

    if (error instanceof Error) {
        return new Exception(0, error.message || 'Unknown Error', undefined, error.name);
    }

    if (typeof error === 'object' && error !== null) {
        const candidate = error as Partial<Exception> & {status?: unknown};
        const detail = typeof candidate.detail === 'string' ? candidate.detail : 'Unknown Error';
        const name = typeof candidate.name === 'string' ? candidate.name : undefined;

        if (typeof candidate.status === 'number') {
            return new HttpException(candidate.status, detail, candidate.trace, name);
        }

        return new Exception(candidate.code, detail, candidate.trace, name);
    }

    return new Exception(0, 'Unknown Error');
};

const ErrorBoundaryContext = React.createContext(false);

export function UseErrorBoundary() {
    return React.useContext(ErrorBoundaryContext);
}

export function ErrorBoundaryContextProvider({...props}: PropsWithChildren) {
    return (
        <ErrorBoundaryContext.Provider value={true}>
            {props.children}
        </ErrorBoundaryContext.Provider>
    );
}

class ErrorBoundaryHandler extends React.Component<ErrorBoundaryHandlerProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryHandlerProps) {
        super(props);
        this.state = initialState;
    }

    private resetErrorBoundary = () => {
        this.setState(initialState);
    };

    private promiseRejectionHandler = (e: PromiseRejectionEvent) => {
        if(e.type === 'unhandledrejection' && (e.reason === undefined || typeof e.reason === 'string')) {
            return;
        }

        this.setState({
            hasError: true,
            error: normalizeError(e.reason)
        })
    };

    componentDidMount() {
        if (this.props.handleUnhandledRejections) {
            window.addEventListener('unhandledrejection', this.promiseRejectionHandler);
        }
    }

    componentWillUnmount() {
        if (this.props.handleUnhandledRejections) {
            window.removeEventListener('unhandledrejection', this.promiseRejectionHandler);
        }
    }

    static getDerivedStateFromError(error: unknown) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
            error: normalizeError(error)
        };
    }

    componentDidCatch(error: unknown, info: unknown) {
        // Todo: Log error
        console.log('error', error);
    }

    componentDidUpdate(prevProps: Readonly<ErrorBoundaryHandlerProps>, prevState: Readonly<ErrorBoundaryState>, snapshot?: unknown) {

        if (this.state.hasError && resetKeysChanged(prevProps.resetKeys, this.props.resetKeys)) {
            this.resetErrorBoundary();
            return;
        }

        if(this.state.error?.detail !== prevState.error?.detail) {
            if (this.state.hasError) {
                if (this.props.fallback instanceof Function) {
                    this.props.fallback(this.state.error);
                }
            }
        }
    }

    render() {
        if (this.state.hasError) {
            if (React.isValidElement(this.props.fallback)) {
                // You can render any custom fallback UI
                return React.cloneElement<any>(
                    this.props.fallback, {
                        error: this.state.error,
                        resetErrorBoundary: this.resetErrorBoundary
                    }
                );
            }

            return null;
        }

        return this.props.children;
    }
}

const ErrorBoundary = ({children, fallback = <DefaultError/>, ...props}: ErrorBoundaryProps) => {
    const hasParentErrorBoundary = UseErrorBoundary();

    return (
        <ErrorBoundaryContextProvider>
            <ErrorBoundaryHandler
                {...props}
                fallback={fallback}
                handleUnhandledRejections={!hasParentErrorBoundary}
            >
                {children}
            </ErrorBoundaryHandler>
        </ErrorBoundaryContextProvider>
    )
}


export default ErrorBoundary;
