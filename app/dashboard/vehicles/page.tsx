'use client';

import { Suspense, useState, useEffect } from 'react';
import { Truck, Plus, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Vehicle {
    id: string;
    tagNumber: string;
    vehicleNumber: string;
    consultant: {
        id: string;
        name: string;
    };
}

interface Consultant {
    id: string;
    name: string;
}

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [consultants, setConsultants] = useState<Consultant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ tagNumber: '', vehicleNumber: '', consultantId: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchVehicles();
        fetchConsultants();
    }, []);

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

    const fetchConsultants = async () => {
        try {
            const res = await fetch('/api/consultants');
            if (res.ok) {
                const data = await res.json();
                setConsultants(data);
            }
        } catch (err) {
            console.error('Failed to fetch consultants', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/vehicles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create vehicle');
            }

            setShowModal(false);
            setFormData({ tagNumber: '', vehicleNumber: '', consultantId: '' });
            fetchVehicles();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vehicle?')) return;

        try {
            const res = await fetch(`/api/vehicles/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete');

            fetchVehicles();
        } catch (err) {
            console.error(err);
            alert('Failed to delete vehicle');
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
                            <h1 className="text-3xl font-extrabold text-sand-900 tracking-tight">Vehicles</h1>
                            <p className="text-sand-500 mt-1">Manage fleet vehicles and assignments</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Add Vehicle</span>
                        </button>
                    </div>

                    {/* List */}
                    <div className="card">
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-sand-400" />
                            </div>
                        ) : vehicles.length === 0 ? (
                            <div className="text-center py-12 text-sand-500">
                                No vehicles found. Add one to get started.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-sand-100 text-xs font-semibold text-sand-500 uppercase tracking-wider">
                                            <th className="pb-3 pl-4">Tag Number</th>
                                            <th className="pb-3">Vehicle Number</th>
                                            <th className="pb-3">Assigned Consultant</th>
                                            <th className="pb-3 text-right pr-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-sand-100">
                                        {vehicles.map((v) => (
                                            <tr key={v.id} className="group hover:bg-sand-50 transition-colors">
                                                <td className="py-4 pl-4">
                                                    <div className="font-medium text-sand-900">{v.tagNumber}</div>
                                                </td>
                                                <td className="py-4">
                                                    <div className="text-sm text-sand-700">{v.vehicleNumber}</div>
                                                </td>
                                                <td className="py-4">
                                                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sand-100 text-sand-800">
                                                        {v.consultant.name}
                                                    </div>
                                                </td>
                                                <td className="py-4 pr-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(v.id)}
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
                            <h3 className="font-semibold text-sand-900">Add New Vehicle</h3>
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
                                <label className="block text-xs font-semibold text-sand-500 uppercase mb-1">Tag Number</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={formData.tagNumber}
                                    onChange={e => setFormData({ ...formData, tagNumber: e.target.value })}
                                    placeholder="TAG-123"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-sand-500 uppercase mb-1">Vehicle Number</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={formData.vehicleNumber}
                                    onChange={e => setFormData({ ...formData, vehicleNumber: e.target.value })}
                                    placeholder="V-456"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-sand-500 uppercase mb-1">Assign Consultant</label>
                                <select
                                    required
                                    className="input-field"
                                    value={formData.consultantId}
                                    onChange={e => setFormData({ ...formData, consultantId: e.target.value })}
                                >
                                    <option value="">Select a consultant...</option>
                                    {consultants.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
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
                                    {isSubmitting ? 'Creating...' : 'Create Vehicle'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
