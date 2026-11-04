import { useEffect, RefObject } from 'react';
import { UseDataProvider } from '@crud-react/context/GetData.tsx';
import { UseForm } from '@crud-react/component/form/Form.tsx';
import { FormSubmission } from '@crud-react/component/form/FormStore.ts';
import { UsePreloaderProvider } from '@crud-react/component/Preloader.tsx';
import { ExceptionType } from '@crud-react/type/ExceptionType.tsx';

export type PendingFormSubmission = {
    session: string;
    snapshot: FormSubmission;
};

function requestException(error: unknown): ExceptionType {
    let status = 0;
    let detail = 'Request failed.';
    let trace: ExceptionType['trace'];

    if (error instanceof Error) {
        detail = error.message;
    } else if (typeof error === 'string') {
        detail = error;
    }

    if (error && typeof error === 'object') {
        if ('status' in error && typeof error.status === 'number') {
            status = error.status;
        }

        if ('detail' in error && typeof error.detail === 'string') {
            detail = error.detail;
        }

        if ('trace' in error && Array.isArray(error.trace)) {
            trace = error.trace;
        }
    }

    return { status, detail, trace };
}

/** Handles failures of this form's pending submission, retaining the draft. */
export default function FormRequestError({
    session,
    pending,
    loader,
    onError
}: {
    session: string;
    pending: RefObject<PendingFormSubmission | null>;
    loader: string;
    onError?: (error: ExceptionType) => boolean | void;
}) {
    const { store } = UseForm();
    const registerErrorHandler = UseDataProvider()?.registerErrorHandler;
    const { stopLoading } = UsePreloaderProvider() || {};

    useEffect(() => {
        return registerErrorHandler?.((error) => {
            if (pending.current?.session !== session) {
                return false;
            }

            pending.current = null;
            store.setSubmitting(false);
            stopLoading?.(loader);

            if (onError) {
                return onError(requestException(error)) !== false;
            }

            return false;
        });
    }, [registerErrorHandler, pending, session, store, stopLoading, loader, onError]);

    return null;
}
