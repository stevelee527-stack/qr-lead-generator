'use client';

import { Suspense, useState, useEffect } from 'react';
import { Users, Plus, Pencil, Trash2, Loader2, Search } from 'lucide-react';
import Link from 'next/link';

interface Consultant {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    _count: {
        vehicles: number;
    };
}

export default function ConsultantsPage() {
    const [consultants, setConsultants] = useState<Consultant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchConsultants();
    }, []);

    const fetchConsultants = async () => {
        try {
            const res = await fetch('/api/consultants');
            if (res.ok) {
                const data = await res.json();
                setConsultants(data);
            }
        } catch (err) {
            console.error('Failed to fetch consultants', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/consultants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create consultant');
            }

            setShowModal(false);
            setFormData({ name: '', email: '', phone: '' });
            fetchConsultants();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this consultant?')) return;

        try {
            const res = await fetch(`/api/consultants/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete');

            fetchConsultants();
        } catch (err) {
            console.error(err);
            alert('Failed to delete consultant');
        }
    };

    return (
        <div className="min-h-screen bg-sand-100">
            <nav className="px-6 lg:px-10 py-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-sand-900">QR Lead Gen</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-sm font-medium text-sand-500 hover:text-sand-900">Back to Dashboard</Link>
                    </div>
                </div>
            </nav>

            <main className="px-6 lg:px-10 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-sand-900 tracking-tight">Design Consultants</h1>
                            <p className="text-sand-500 mt-1">Manage your team of design consultants</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Add Consultant</span>
                        </button>
                    </div>

                    {/* List */}
                    <div className="card">
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-sand-400" />
                            </div>
                        ) : consultants.length === 0 ? (
                            <div className="text-center py-12 text-sand-500">
                                No consultants found. Add one to get started.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-sand-100 text-xs font-semibold text-sand-500 uppercase tracking-wider">
                                            <th className="pb-3 pl-4">Name</th>
                                            <th className="pb-3">Contact</th>
                                            <th className="pb-3 text-center">Vehicles</th>
                                            <th className="pb-3 text-right pr-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-sand-100">
                                        {consultants.map((c) => (
                                            <tr key={c.id} className="group hover:bg-sand-50 transition-colors">
                                                <td className="py-4 pl-4">
                                                    <div className="font-medium text-sand-900">{c.name}</div>
                                                </td>
                                                <td className="py-4">
                                                    <div className="text-sm text-sand-900">{c.email}</div>
                                                    <div className="text-xs text-sand-500">{c.phone}</div>
                                                </td>
                                                <td className="py-4 text-center">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sand-100 text-sand-800">
                                                        {c._count.vehicles}
                                                    </span>
                                                </td>
                                                <td className="py-4 pr-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(c.id)}
                                                        className="text-sand-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-sand-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-sand-100 flex items-center justify-between">
                            <h3 className="font-semibold text-sand-900">Add New Consultant</h3>
                            <button onClick={() => setShowModal(false)} className="text-sand-400 hover:text-sand-600">
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-xs font-semibold text-sand-500 uppercase mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-sand-500 uppercase mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="input-field"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-sand-500 uppercase mb-1">Phone (Optional)</label>
                                <input
                                    type="tel"
                                    className="input-field"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div className="pt-2 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-sand-600 hover:text-sand-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Creating...' : 'Create Consultant'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
