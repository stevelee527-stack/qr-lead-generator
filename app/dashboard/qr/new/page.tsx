'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Save } from 'lucide-react'; // Removing QrCode import as it is unused
import Link from 'next/link';

interface Vehicle {
    id: string;
    tagNumber: string;
    vehicleNumber: string;
    consultant: {
        name: string;
    };
}

export default function NewQrCodePage() {
    const router = useRouter();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        url: '',
        vehicleId: '',
        campaignId: '',
    });

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await fetch('/api/vehicles');
                if (res.ok) {
                    const data = await res.json();
                    setVehicles(data);
                }
            } catch (err) {
                console.error('Failed to fetch vehicles', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/qr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create QR code');
            }

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
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
                        <h1 className="text-3xl font-extrabold text-sand-900 tracking-tight">Generate QR Code</h1>
                        <p className="text-sand-500 mt-1">Create a new QR code for a vehicle</p>
                    </div>

                    <div className="card">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-sand-700 mb-2">Internal Name</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Summer Campaign - Truck 1"
                                />
                                <p className="text-xs text-sand-400 mt-1">For your reference only</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-sand-700 mb-2">Destination URL</label>
                                <input
                                    type="url"
                                    required
                                    className="input-field"
                                    value={formData.url}
                                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                                    placeholder="https://example.com/landing-page"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-sand-700 mb-2">Assign to Vehicle</label>
                                {isLoading ? (
                                    <div className="flex items-center gap-2 text-sand-400 text-sm p-2">
                                        <Loader2 className="w-4 h-4 animate-spin" /> Loading vehicles...
                                    </div>
                                ) : (
                                    <select
                                        className="input-field"
                                        value={formData.vehicleId}
                                        onChange={e => setFormData({ ...formData, vehicleId: e.target.value })}
                                    >
                                        <option value="">-- No Vehicle Assigned --</option>
                                        {vehicles.map(v => (
                                            <option key={v.id} value={v.id}>
                                                {v.tagNumber} - {v.vehicleNumber} ({v.consultant.name})
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <p className="text-xs text-sand-400 mt-1">
                                    Linking to a vehicle helps track performance by Consultant.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-sand-700 mb-2">Campaign ID (Temporary)</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={formData.campaignId}
                                    onChange={e => setFormData({ ...formData, campaignId: e.target.value })}
                                    placeholder="Enter existing Campaign ID"
                                />
                                <p className="text-xs text-sand-400 mt-1">Required by database schema</p>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Save className="w-4 h-4" /> Create QR Code
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
