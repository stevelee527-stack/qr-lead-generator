import Link from 'next/link';
import { QrCode, Layout, Mail, ArrowRight, BarChart3, Search, User } from 'lucide-react';

export default function Home() {
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
            <span className="px-4 py-2 bg-sand-900 text-white rounded-xl text-sm font-medium">Home</span>
            <Link href="/dashboard" className="px-4 py-2 text-sand-500 hover:text-sand-700 text-sm font-medium rounded-xl transition-colors">Dashboard</Link>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft border border-sand-100 hover:shadow-soft-md transition-all">
              <Search className="w-4 h-4 text-sand-600" />
            </button>
            <div className="w-10 h-10 bg-sand-900 rounded-xl flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 lg:px-10 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            {/* Title + Progress */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-6">
              <div>
                <h1 className="text-5xl lg:text-6xl font-extrabold text-sand-900 leading-[1.05] tracking-tight mb-4">
                  Lead<br />Generation
                </h1>
                <p className="text-sand-500 text-base leading-relaxed">
                  Create dynamic QR codes, build landing pages, and capture leads with real-time notifications.
                </p>
              </div>

              {/* Progress Ring Card */}
              <div className="card flex flex-col items-center py-8">
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e8e4dd" strokeWidth="10" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#8b7355" strokeWidth="10"
                      strokeDasharray="314" strokeDashoffset="314" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <QrCode className="w-5 h-5 text-sand-500 mb-1" />
                    <span className="text-3xl font-bold text-sand-900">0</span>
                    <span className="text-xs text-sand-500">Goal: 100</span>
                  </div>
                </div>
                <p className="text-xs text-sand-400 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Getting started
                </p>
              </div>
            </div>

            {/* Central Stats Card */}
            <div className="lg:col-span-5">
              <div className="card h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-sand-800">Campaign Overview</h2>
                  <span className="text-sm text-sand-400">This Week</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="stat-value">0</div>
                    <div className="stat-label mt-1">Scans</div>
                  </div>
                  <div className="text-center border-x border-sand-100">
                    <div className="stat-value">0</div>
                    <div className="stat-label mt-1">Leads</div>
                  </div>
                  <div className="text-center">
                    <div className="stat-value">0%</div>
                    <div className="stat-label mt-1">Conv. Rate</div>
                  </div>
                </div>

                {/* Chart */}
                <div className="relative h-44 bg-sand-50 rounded-2xl overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b7355" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#8b7355" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 140 Q50 130 100 120 T200 80 T300 100 T400 60 L400 160 L0 160Z" fill="url(#chartGrad)" />
                    <path d="M0 140 Q50 130 100 120 T200 80 T300 100 T400 60" fill="none" stroke="#8b7355" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="200" cy="80" r="5" fill="#8b7355" />
                    <circle cx="200" cy="80" r="8" fill="#8b7355" fillOpacity="0.2" />
                  </svg>
                  <div className="absolute right-3 top-0 h-full flex flex-col justify-between py-3 text-[10px] text-sand-400 font-medium">
                    <span>100</span>
                    <span>50</span>
                    <span>0</span>
                  </div>
                </div>
                <div className="flex justify-between mt-3 px-2 text-[10px] text-sand-400 font-medium">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>

            {/* QR Preview Card */}
            <div className="lg:col-span-4">
              <div className="card h-full bg-gradient-to-br from-white to-sand-50 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-sand-800 mb-2">QR Code Preview</h3>
                  <p className="text-sm text-sand-400 mb-6">Generate your first code to see it here</p>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <div className="w-48 h-48 bg-sand-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-sand-300">
                    <QrCode className="w-16 h-16 text-sand-300" />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <div className="flex items-center gap-2 bg-sand-100 rounded-full px-4 py-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-xs font-semibold text-sand-700">Active</span>
                  </div>
                  <div className="flex items-center gap-2 bg-sand-100 rounded-full px-4 py-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-sand-700">0 scans</span>
                  </div>
                  <div className="flex items-center gap-2 bg-sand-100 rounded-full px-4 py-2">
                    <div className="w-2 h-2 rounded-full bg-sky-500" />
                    <span className="text-xs font-semibold text-sand-700">0 leads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-8">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-sand-800">Quick Actions</h2>
                  <div className="hidden md:flex items-center bg-sand-50 rounded-xl p-1">
                    <span className="px-3 py-1.5 bg-sand-900 text-white rounded-lg text-xs font-medium">All</span>
                    <span className="px-3 py-1.5 text-sand-500 text-xs font-medium">Recent</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/dashboard" className="flex items-center justify-between p-4 bg-sand-50 hover:bg-warm-100 rounded-2xl transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sand-800 group-hover:text-sand-900">Create New Campaign</div>
                        <div className="text-sm text-sand-500">Start a new lead generation campaign</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-sand-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link href="/dashboard" className="flex items-center justify-between p-4 bg-sand-50 hover:bg-warm-100 rounded-2xl transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-sand-900 rounded-xl flex items-center justify-center">
                        <QrCode className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sand-800 group-hover:text-sand-900">Generate QR Code</div>
                        <div className="text-sm text-sand-500">Create a trackable QR code with custom styling</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-sand-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link href="/dashboard" className="flex items-center justify-between p-4 bg-sand-50 hover:bg-warm-100 rounded-2xl transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-warm-600 rounded-xl flex items-center justify-center">
                        <Layout className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sand-800 group-hover:text-sand-900">Build Landing Page</div>
                        <div className="text-sm text-sand-500">Design a custom lead capture page</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-sand-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="lg:col-span-4">
              <div className="card h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-sand-800">Recent Leads</h2>
                  <Link href="/dashboard" className="text-sm text-accent font-medium hover:text-accent-dark transition-colors">
                    View all
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-sand-50 rounded-2xl flex items-center justify-center mb-4">
                    <Mail className="w-7 h-7 text-sand-300" />
                  </div>
                  <p className="text-sm font-medium text-sand-500 mb-1">No leads yet</p>
                  <p className="text-xs text-sand-400">Leads will appear here once<br />people scan your QR codes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
