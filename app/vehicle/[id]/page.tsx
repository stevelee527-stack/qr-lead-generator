'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Sun, EyeOff, PanelTop, Grip,
  User, Mail, Phone, MapPin, LayoutGrid,
  CheckCircle, Loader2, Shield, Star, Wrench,
  ArrowDown, Sparkles
} from 'lucide-react';

interface VehicleInfo {
  id: string;
  year: number;
  make: string;
  model: string;
  consultant: { name: string };
}

const SERVICES = [
  {
    icon: Grip,
    title: 'Blinds',
    description: 'Custom blinds in wood, faux wood, and aluminum. Perfect light control for any room.',
  },
  {
    icon: Sun,
    title: 'Shades',
    description: 'Roller, cellular, and Roman shades. Elegant style with energy-efficient designs.',
  },
  {
    icon: PanelTop,
    title: 'Shutters',
    description: 'Plantation and traditional shutters. Timeless elegance and lasting durability.',
  },
  {
    icon: EyeOff,
    title: 'Drapes',
    description: 'Custom drapery panels and curtains. Luxurious fabrics tailored to your style.',
  },
];

const TRUST_ITEMS = [
  { icon: Star, title: 'Free Consultation', description: 'No-obligation in-home consultation' },
  { icon: Wrench, title: 'Professional Install', description: 'Expert installation included' },
  { icon: Shield, title: 'Satisfaction Guaranteed', description: 'We stand behind our work' },
];

export default function VehicleLandingPage() {
  const params = useParams();
  const vehicleId = params.id as string;

  const [vehicle, setVehicle] = useState<VehicleInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [windowCount, setWindowCount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    fetch(`/api/vehicles/${vehicleId}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => { setVehicle(data); setLoading(false); })
      .catch(() => { setError('Not found'); setLoading(false); });
  }, [vehicleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId, name, email, phone, address, windowCount }),
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

  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sand-400" />
      </div>
    );
  }

  // Error
  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4">
        <div className="card text-center max-w-md w-full">
          <Sun className="w-12 h-12 text-sand-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-sand-900 mb-2">Page Not Found</h1>
          <p className="text-sand-500">This page is no longer available.</p>
        </div>
      </div>
    );
  }

  // Success
  if (submitted) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4">
        <div className="card text-center max-w-md w-full py-10">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-sand-900 mb-2">Thank You!</h1>
          <p className="text-sand-500 mb-1">
            Your request for a free quote has been submitted.
          </p>
          <p className="text-sand-500">
            <span className="font-semibold text-sand-700">{vehicle.consultant.name}</span> will be in touch with you shortly to schedule your free consultation.
          </p>
        </div>
      </div>
    );
  }

  // Main Landing Page
  return (
    <div className="min-h-screen bg-sand-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-sand-900 via-sand-800 to-warm-900 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent-light blur-3xl" />
        </div>

        <div className="relative px-6 py-16 sm:py-20 max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-medium text-sand-100">Free In-Home Consultation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Transform Your<br />
            <span className="text-accent-light">Windows</span>
          </h1>
          <p className="text-sand-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-md mx-auto">
            Beautiful blinds, shades, shutters, and drapes — professionally measured and installed.
          </p>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-white text-sand-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Get Your Free Quote
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="px-6 py-14 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sand-900 tracking-tight">Our Services</h2>
          <p className="text-sand-500 mt-2">Custom window treatments for every style and budget</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SERVICES.map(service => (
            <div key={service.title} className="card-hover group cursor-default">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-sand-900 mb-1">{service.title}</h3>
                  <p className="text-sm text-sand-500 leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="px-6 pb-14 max-w-4xl mx-auto">
        <div className="bg-sand-200/50 rounded-3xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-sand-900 text-center mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {TRUST_ITEMS.map(item => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-soft">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-sand-800 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-sand-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Form Section */}
      <div id="quote-form" className="px-6 pb-16 max-w-lg mx-auto scroll-mt-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sand-900 tracking-tight">Get Your Free Quote</h2>
          <p className="text-sand-500 mt-2">
            Fill out the form below and <span className="font-semibold text-sand-700">{vehicle.consultant.name}</span> will reach out to schedule your consultation.
          </p>
        </div>

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
                Phone
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
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-field pl-11"
                  placeholder="123 Main St, City, State"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="windowCount" className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">
                Number of Windows
              </label>
              <div className="relative">
                <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <select
                  id="windowCount"
                  value={windowCount}
                  onChange={(e) => setWindowCount(e.target.value)}
                  className="input-field pl-11 appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select number of windows</option>
                  <option value="1-5">1 - 5</option>
                  <option value="5-10">5 - 10</option>
                  <option value="10+">10+</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-lg py-4"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Get My Free Quote'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sand-200 px-6 py-6 text-center">
        <p className="text-xs text-sand-400">
          Window Treatment Professionals
        </p>
      </div>
    </div>
  );
}
