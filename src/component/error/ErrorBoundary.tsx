import * as React from 'react';
import Exception from "@src/component/error/Exception.tsx";
import HttpException from "@src/component/error/HttpException.tsx";

type ErrorBoundaryProps = {
    fallback: React.ReactElement;
    children: any
}

type ErrorBoundaryState = {
    hasError: boolean;
    error: Error | Exception | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    private promiseRejectionHandler = (e: PromiseRejectionEvent) => {
        if(!(e.reason instanceof Exception)) {
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
        if(error instanceof Error) {
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

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return React.cloneElement<any>(
                this.props.fallback, {
                    error: this.state.error,
                    children: this.props.children
                }
            );
        }

        return this.props.children;
    }
}


export default ErrorBoundary;
