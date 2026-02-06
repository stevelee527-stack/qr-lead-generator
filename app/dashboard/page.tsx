import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">QR Lead Generator Dashboard</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-gray-500 text-sm font-medium">Total Campaigns</div>
            <div className="text-3xl font-bold mt-2">0</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-gray-500 text-sm font-medium">Active QR Codes</div>
            <div className="text-3xl font-bold mt-2">0</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="text-gray-500 text-sm font-medium">Landing Pages</div>
            <div className="text-3xl font-bold mt-2">0</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="text-gray-500 text-sm font-medium">Total Leads</div>
            <div className="text-3xl font-bold mt-2">0</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/dashboard/campaigns/new"
                className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-blue-900">Create New Campaign</div>
                <div className="text-sm text-blue-700">Start a new lead generation campaign</div>
              </Link>
              <Link
                href="/dashboard/qr/new"
                className="block px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-green-900">Generate QR Code</div>
                <div className="text-sm text-green-700">Create a trackable QR code</div>
              </Link>
              <Link
                href="/dashboard/landing/new"
                className="block px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-purple-900">Build Landing Page</div>
                <div className="text-sm text-purple-700">Design a custom landing page</div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="text-center py-8 text-gray-500">
              No recent activity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
