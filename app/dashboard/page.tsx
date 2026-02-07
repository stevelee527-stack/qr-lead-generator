import Link from 'next/link';
import { QrCode, Layout, BarChart3, Users, ArrowRight, Plus, Activity, Search } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

export default function Dashboard() {
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-sand-900 tracking-tight">Dashboard</h1>
              <p className="text-sand-500 mt-1">Manage your campaigns, QR codes, and leads</p>
            </div>
            <Link href="/dashboard/campaigns/new" className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Campaign</span>
            </Link>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card-hover group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-accent" />
                </div>
                <span className="badge-info">0%</span>
              </div>
              <div className="text-3xl font-bold text-sand-900 mb-1">0</div>
              <div className="text-sm text-sand-500 font-medium">Total Campaigns</div>
            </div>

            <div className="card-hover group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="badge-success">Active</span>
              </div>
              <div className="text-3xl font-bold text-sand-900 mb-1">0</div>
              <div className="text-sm text-sand-500 font-medium">Active QR Codes</div>
            </div>

            <div className="card-hover group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                  <Layout className="w-5 h-5 text-violet-600" />
                </div>
                <span className="badge-warning">Draft</span>
              </div>
              <div className="text-3xl font-bold text-sand-900 mb-1">0</div>
              <div className="text-sm text-sand-500 font-medium">Landing Pages</div>
            </div>

            <div className="card-hover group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <span className="badge-warning">New</span>
              </div>
              <div className="text-3xl font-bold text-sand-900 mb-1">0</div>
              <div className="text-sm text-sand-500 font-medium">Total Leads</div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-7">
              <div className="card">
                <h2 className="text-lg font-semibold text-sand-800 mb-5">Quick Actions</h2>
                <div className="space-y-3">
                  <Link href="/dashboard/campaigns/new" className="flex items-center justify-between p-4 bg-sand-50 hover:bg-warm-100 rounded-2xl transition-all duration-200 group">
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

                  <Link href="/dashboard/consultants" className="flex items-center justify-between p-4 bg-sand-50 hover:bg-warm-100 rounded-2xl transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sand-800 group-hover:text-sand-900">Manage Consultants</div>
                        <div className="text-sm text-sand-500">Add or edit design consultants</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-sand-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link href="/dashboard/vehicles" className="flex items-center justify-between p-4 bg-sand-50 hover:bg-warm-100 rounded-2xl transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sand-800 group-hover:text-sand-900">Manage Vehicles</div>
                        <div className="text-sm text-sand-500">Track vehicles and assignments</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-sand-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link href="/dashboard/qr/new" className="flex items-center justify-between p-4 bg-sand-50 hover:bg-warm-100 rounded-2xl transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-sand-900 rounded-xl flex items-center justify-center">
                        <QrCode className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sand-800 group-hover:text-sand-900">Generate QR Code</div>
                        <div className="text-sm text-sand-500">Create a trackable QR code</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-sand-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link href="/dashboard/landing/new" className="flex items-center justify-between p-4 bg-sand-50 hover:bg-warm-100 rounded-2xl transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-warm-600 rounded-xl flex items-center justify-center">
                        <Layout className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sand-800 group-hover:text-sand-900">Build Landing Page</div>
                        <div className="text-sm text-sand-500">Design a custom landing page</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-sand-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-5">
              <div className="card h-full">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-sand-800">Recent Activity</h2>
                  <Activity className="w-4 h-4 text-sand-400" />
                </div>

                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-14 h-14 bg-sand-50 rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6 text-sand-300" />
                  </div>
                  <p className="text-sm font-medium text-sand-500 mb-1">No recent activity</p>
                  <p className="text-xs text-sand-400">Activity will appear here as you<br />create campaigns and capture leads</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
