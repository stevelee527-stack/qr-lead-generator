'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { QrCode, Car, User, Mail, Phone, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';

interface VehicleInfo {
  id: string;
  year: number;
  make: string;
  model: string;
  consultant: { name: string };
}

export default function VehicleLeadForm() {
  const params = useParams();
  const vehicleId = params.id as string;

  const [vehicle, setVehicle] = useState<VehicleInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    fetch(`/api/vehicles/${vehicleId}`)
      .then(res => {
        if (!res.ok) throw new Error('Vehicle not found');
        return res.json();
      })
      .then(data => { setVehicle(data); setLoading(false); })
      .catch(() => { setError('Vehicle not found'); setLoading(false); });
  }, [vehicleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId, name, email, phone: phone || undefined, message: message || undefined }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sand-400" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4">
        <div className="card text-center max-w-md w-full">
          <Car className="w-12 h-12 text-sand-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-sand-900 mb-2">Vehicle Not Found</h1>
          <p className="text-sand-500">This vehicle listing is no longer available.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4">
        <div className="card text-center max-w-md w-full">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-sand-900 mb-2">Thank You!</h1>
          <p className="text-sand-500">
            Your inquiry about the {vehicle.year} {vehicle.make} {vehicle.model} has been submitted.
            {vehicle.consultant.name} will be in touch with you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-sand-900 rounded-2xl flex items-center justify-center mb-4">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-2 bg-sand-200 rounded-full px-4 py-2 mb-3">
            <Car className="w-4 h-4 text-sand-600" />
            <span className="text-sm font-semibold text-sand-700">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-sand-900 text-center">Interested in this vehicle?</h1>
          <p className="text-sand-500 mt-1 text-center">Fill out the form below and {vehicle.consultant.name} will reach out to you.</p>
        </div>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {submitError}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field pl-11"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">
                Phone (optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field pl-11"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">
                Message (optional)
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-3 w-4 h-4 text-sand-400" />
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field pl-11 min-h-[80px] resize-none"
                  placeholder="I'd like to know more about this vehicle..."
                  rows={3}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Get in Touch'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-sand-400 mt-6">
          QR Lead Generator
        </p>
      </div>
    </div>
  );
}
