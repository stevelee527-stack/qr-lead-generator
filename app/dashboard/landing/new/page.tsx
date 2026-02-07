'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Save, Layout } from 'lucide-react';
import Link from 'next/link';

interface Campaign {
    id: string;
    name: string;
}

export default function NewLandingPage() {
    const router = useRouter();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        campaignId: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/campaigns');
                if (res.ok) {
                    const data = await res.json();
                    setCampaigns(data);
                }
            } catch (err) {
                console.error('Failed to fetch data', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/landing-pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create landing page');
            }

            const data = await res.json();
            // Publish it automatically for now to make it "work" immediately
            await fetch(`/api/landing-pages/${data.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isPublished: true }),
            });

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNameChange = (name: string) => {
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        setFormData({ ...formData, name, slug });
    };

    return (
        <div className="min-h-screen bg-sand-100">
            <nav className="px-6 lg:px-10 py-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-sand-900">QR Lead Gen</span>
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-sand-500 hover:text-sand-900">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                </div>
            </nav>

            <main className="px-6 lg:px-10 pb-12">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-sand-900 tracking-tight">Build Landing Page</h1>
                        <p className="text-sand-500 mt-1">Create a new landing page for your campaign</p>
                    </div>

                    <div className="card">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-sand-700 mb-2">Page Name</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={formData.name}
                                    onChange={e => handleNameChange(e.target.value)}
                                    placeholder="e.g. Summer Consultation Page"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-sand-700 mb-2">URL Slug</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-sand-400 text-sm">/landing/</span>
                                    <input
                                        type="text"
                                        required
                                        className="input-field"
                                        value={formData.slug}
                                        onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-') })}
                                        placeholder="summer-consultation"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-sand-700 mb-2">Select Campaign</label>
                                {isLoading ? (
                                    <div className="flex items-center gap-2 text-sand-400 text-sm p-2">
                                        <Loader2 className="w-4 h-4 animate-spin" /> Loading campaigns...
                                    </div>
                                ) : (
                                    <select
                                        required
                                        className="input-field"
                                        value={formData.campaignId}
                                        onChange={e => setFormData({ ...formData, campaignId: e.target.value })}
                                    >
                                        <option value="">-- Select a Campaign --</option>
                                        {campaigns.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isLoading}
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" /> Building...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Layout className="w-4 h-4" /> Create Landing Page
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
