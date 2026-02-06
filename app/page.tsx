import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          QR Lead Generator
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Create dynamic QR codes, build custom landing pages, and capture leads 
          with real-time notifications to your design consultants.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/admin"
            className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-semibold"
          >
            Admin Panel
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Dynamic QR Codes</h3>
            <p className="text-gray-600">
              Generate trackable QR codes that link to custom landing pages
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold mb-2">Landing Page Builder</h3>
            <p className="text-gray-600">
              Create beautiful, conversion-optimized landing pages
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-lg font-semibold mb-2">Instant Notifications</h3>
            <p className="text-gray-600">
              Get real-time alerts when new leads submit their information
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
