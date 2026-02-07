'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-sand-100">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center border border-red-100">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
                <p className="text-sand-600 mb-6">{error.message || 'An unexpected error occurred.'}</p>
                <button
                    onClick={() => reset()}
                    className="btn-primary"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
