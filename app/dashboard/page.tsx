'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { QrCode, Car, Users, Mail, Plus, Trash2, Search, X, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

interface Consultant {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  vehicles: { id: string; _count: { leads: number } }[];
}

interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  vehicleNumber: string | null;
  qrCodeUrl: string | null;
  consultantId: string;
  consultant: { id: string; name: string; email: string };
  _count: { leads: number };
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  windowCount: string;
  message: string | null;
  createdAt: string;
  vehicle: {
    year: number;
    make: string;
    model: string;
    consultant: { name: string };
  };
}

export default function Dashboard() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showAddDC, setShowAddDC] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [dcForm, setDcForm] = useState({ name: '', email: '', phone: '' });
  const [vehicleForm, setVehicleForm] = useState({ year: '', make: '', model: '', vehicleNumber: '', consultantId: '' });
  const [submitting, setSubmitting] = useState(false);

  // Section collapse states
  const [showDCs, setShowDCs] = useState(true);
  const [showVehicles, setShowVehicles] = useState(true);
  const [showLeads, setShowLeads] = useState(true);

  // QR modal
  const [qrModal, setQrModal] = useState<{ url: string; label: string } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [dcRes, vRes, lRes] = await Promise.all([
        fetch('/api/consultants'),
        fetch('/api/vehicles'),
        fetch('/api/leads'),
      ]);
      const [dcData, vData, lData] = await Promise.all([dcRes.json(), vRes.json(), lRes.json()]);
      setConsultants(dcData);
      setVehicles(vData);
      setLeads(lData);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const addConsultant = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/consultants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: dcForm.name, email: dcForm.email, phone: dcForm.phone || undefined }),
      });
      if (res.ok) {
        setDcForm({ name: '', email: '', phone: '' });
        setShowAddDC(false);
        fetchData();
      }
    } finally { setSubmitting(false); }
  };

  const deleteConsultant = async (id: string) => {
    if (!confirm('Delete this consultant and all their vehicles/leads?')) return;
    await fetch(`/api/consultants/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const addVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: parseInt(vehicleForm.year),
          make: vehicleForm.make,
          model: vehicleForm.model,
          vehicleNumber: vehicleForm.vehicleNumber || undefined,
          consultantId: vehicleForm.consultantId,
        }),
      });
      if (res.ok) {
        setVehicleForm({ year: '', make: '', model: '', vehicleNumber: '', consultantId: '' });
        setShowAddVehicle(false);
        fetchData();
      }
    } finally { setSubmitting(false); }
  };

  const deleteVehicle = async (id: string) => {
    if (!confirm('Delete this vehicle and all its leads?')) return;
    await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sand-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-100">
      {/* Navigation */}
      <nav className="px-6 lg:px-10 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sand-900 rounded-xl flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-sand-900">QR Lead Gen</span>
          </div>

          <div className="hidden md:flex items-center bg-white rounded-2xl p-1.5 shadow-soft border border-sand-100">
            <Link href="/" className="px-4 py-2 text-sand-500 hover:text-sand-700 text-sm font-medium rounded-xl transition-colors">Home</Link>
            <span className="px-4 py-2 bg-sand-900 text-white rounded-xl text-sm font-medium">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft border border-sand-100 hover:shadow-soft-md transition-all">
              <Search className="w-4 h-4 text-sand-600" />
            </button>
            <LogoutButton />
          </div>
        </div>
      </nav>

      <main className="px-6 lg:px-10 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-sand-900 tracking-tight">Dashboard</h1>
            <p className="text-sand-500 mt-1">Manage consultants, vehicles, and leads</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
              </div>
              <div className="text-3xl font-bold text-sand-900 mb-1">{consultants.length}</div>
              <div className="text-sm text-sand-500 font-medium">Consultants</div>
            </div>

            <div className="card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Car className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-sand-900 mb-1">{vehicles.length}</div>
              <div className="text-sm text-sand-500 font-medium">Vehicles</div>
            </div>

            <div className="card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-sand-900 mb-1">{leads.length}</div>
              <div className="text-sm text-sand-500 font-medium">Leads</div>
            </div>
          </div>

          {/* Design Consultants Section */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setShowDCs(!showDCs)} className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-sand-800">Design Consultants</h2>
                {showDCs ? <ChevronUp className="w-4 h-4 text-sand-400" /> : <ChevronDown className="w-4 h-4 text-sand-400" />}
              </button>
              <button onClick={() => setShowAddDC(!showAddDC)} className="btn-primary flex items-center gap-1.5 text-sm py-2 px-3">
                <Plus className="w-4 h-4" /> Add DC
              </button>
            </div>

            {showAddDC && (
              <form onSubmit={addConsultant} className="bg-sand-50 rounded-2xl p-4 mb-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input type="text" placeholder="Name" required value={dcForm.name} onChange={e => setDcForm({ ...dcForm, name: e.target.value })} className="input-field" />
                  <input type="email" placeholder="Email" required value={dcForm.email} onChange={e => setDcForm({ ...dcForm, email: e.target.value })} className="input-field" />
                  <input type="tel" placeholder="Phone (optional)" value={dcForm.phone} onChange={e => setDcForm({ ...dcForm, phone: e.target.value })} className="input-field" />
                </div>
                <div className="flex gap-2">
                  <button type="submit" disabled={submitting} className="btn-primary text-sm py-2 px-4 disabled:opacity-60">
                    {submitting ? 'Adding...' : 'Add Consultant'}
                  </button>
                  <button type="button" onClick={() => setShowAddDC(false)} className="btn-secondary text-sm py-2 px-4">Cancel</button>
                </div>
              </form>
            )}

            {showDCs && (
              <div className="space-y-2">
                {consultants.length === 0 ? (
                  <p className="text-sm text-sand-400 text-center py-6">No consultants yet. Add one to get started.</p>
                ) : (
                  consultants.map(dc => (
                    <div key={dc.id} className="flex items-center justify-between p-3 bg-sand-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-sand-800">{dc.name}</div>
                        <div className="text-sm text-sand-500">{dc.email}{dc.phone ? ` | ${dc.phone}` : ''}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-sand-400">{dc.vehicles.length} vehicles</span>
                        <button onClick={() => deleteConsultant(dc.id)} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Vehicles Section */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setShowVehicles(!showVehicles)} className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-sand-800">Vehicles</h2>
                {showVehicles ? <ChevronUp className="w-4 h-4 text-sand-400" /> : <ChevronDown className="w-4 h-4 text-sand-400" />}
              </button>
              <button onClick={() => { if (consultants.length === 0) { alert('Add a consultant first'); return; } setShowAddVehicle(!showAddVehicle); }} className="btn-primary flex items-center gap-1.5 text-sm py-2 px-3">
                <Plus className="w-4 h-4" /> Add Vehicle
              </button>
            </div>

            {showAddVehicle && (
              <form onSubmit={addVehicle} className="bg-sand-50 rounded-2xl p-4 mb-4 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <input type="number" placeholder="Year" required value={vehicleForm.year} onChange={e => setVehicleForm({ ...vehicleForm, year: e.target.value })} className="input-field" />
                  <input type="text" placeholder="Make" required value={vehicleForm.make} onChange={e => setVehicleForm({ ...vehicleForm, make: e.target.value })} className="input-field" />
                  <input type="text" placeholder="Model" required value={vehicleForm.model} onChange={e => setVehicleForm({ ...vehicleForm, model: e.target.value })} className="input-field" />
                  <input type="text" placeholder="Vehicle # (optional)" value={vehicleForm.vehicleNumber} onChange={e => setVehicleForm({ ...vehicleForm, vehicleNumber: e.target.value })} className="input-field" />
                  <select required value={vehicleForm.consultantId} onChange={e => setVehicleForm({ ...vehicleForm, consultantId: e.target.value })} className="input-field">
                    <option value="">Assign DC...</option>
                    {consultants.map(dc => (
                      <option key={dc.id} value={dc.id}>{dc.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button type="submit" disabled={submitting} className="btn-primary text-sm py-2 px-4 disabled:opacity-60">
                    {submitting ? 'Creating...' : 'Add Vehicle + Generate QR'}
                  </button>
                  <button type="button" onClick={() => setShowAddVehicle(false)} className="btn-secondary text-sm py-2 px-4">Cancel</button>
                </div>
              </form>
            )}

            {showVehicles && (
              <div className="space-y-2">
                {vehicles.length === 0 ? (
                  <p className="text-sm text-sand-400 text-center py-6">No vehicles yet. Add one to generate a QR code.</p>
                ) : (
                  vehicles.map(v => (
                    <div key={v.id} className="flex items-center justify-between p-3 bg-sand-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        {v.qrCodeUrl && (
                          <button
                            onClick={() => setQrModal({ url: v.qrCodeUrl!, label: `${v.year} ${v.make} ${v.model}` })}
                            className="w-12 h-12 rounded-lg overflow-hidden border border-sand-200 hover:border-accent transition-colors flex-shrink-0"
                          >
                            <img src={v.qrCodeUrl} alt="QR" width={48} height={48} className="w-full h-full object-cover" />
                          </button>
                        )}
                        <div>
                          <div className="font-semibold text-sand-800">{v.year} {v.make} {v.model}</div>
                          <div className="text-sm text-sand-500">
                            DC: {v.consultant.name}
                            {v.vehicleNumber ? ` | Vehicle #: ${v.vehicleNumber}` : ''}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-sand-400">{v._count.leads} leads</span>
                        <button onClick={() => deleteVehicle(v.id)} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Leads Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setShowLeads(!showLeads)} className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-sand-800">Recent Leads</h2>
                {showLeads ? <ChevronUp className="w-4 h-4 text-sand-400" /> : <ChevronDown className="w-4 h-4 text-sand-400" />}
              </button>
              <span className="text-sm text-sand-400">{leads.length} total</span>
            </div>

            {showLeads && (
              <div className="space-y-2">
                {leads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-14 h-14 bg-sand-50 rounded-2xl flex items-center justify-center mb-4">
                      <Mail className="w-6 h-6 text-sand-300" />
                    </div>
                    <p className="text-sm font-medium text-sand-500 mb-1">No leads yet</p>
                    <p className="text-xs text-sand-400">Leads will appear here once people scan your QR codes</p>
                  </div>
                ) : (
                  leads.map(lead => (
                    <div key={lead.id} className="p-3 bg-sand-50 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-sand-800">{lead.name}</div>
                        <span className="text-xs text-sand-400">{new Date(lead.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm text-sand-500">
                        {lead.email} | {lead.phone}
                      </div>
                      <div className="text-sm text-sand-500 mt-0.5">
                        {lead.address}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                          {lead.windowCount} windows
                        </span>
                        <span className="text-xs text-sand-400">
                          {lead.vehicle.year} {lead.vehicle.make} {lead.vehicle.model} — DC: {lead.vehicle.consultant.name}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* QR Code Modal */}
      {qrModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setQrModal(null)}>
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sand-800">{qrModal.label}</h3>
              <button onClick={() => setQrModal(null)} className="text-sand-400 hover:text-sand-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={qrModal.url} alt="QR Code" width={250} height={250} className="mx-auto rounded-xl" />
            <p className="text-xs text-sand-400 mt-4">Scan this QR code to open the lead form for this vehicle</p>
          </div>
        </div>
      )}
    </div>
  );
}
