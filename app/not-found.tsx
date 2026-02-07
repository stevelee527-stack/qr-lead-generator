import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-sand-100">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center border border-sand-100">
                <div className="w-16 h-16 bg-sand-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FileQuestion className="w-8 h-8 text-sand-400" />
                </div>
                <h2 className="text-2xl font-bold text-sand-900 mb-2">Page Not Found</h2>
                <p className="text-sand-500 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/dashboard" className="btn-primary inline-block">
                    Return Dashboard
                </Link>
            </div>
        </div>
    );
}
