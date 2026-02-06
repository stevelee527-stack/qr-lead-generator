'use client';

import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';

interface QRCodeDisplayProps {
  qrCode: {
    id: string;
    name: string;
    url: string;
    imageUrl: string;
    scans: number;
  };
}

export default function QRCodeDisplay({ qrCode }: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCode.imageUrl;
    link.download = `${qrCode.name.replace(/\s+/g, '_')}_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(qrCode.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{qrCode.name}</h3>
          <p className="text-sm text-gray-500 mt-1">Scans: {qrCode.scans}</p>
        </div>
      </div>

      <div className="flex justify-center mb-4 bg-gray-50 p-4 rounded">
        <img
          src={qrCode.imageUrl}
          alt={qrCode.name}
          className="w-64 h-64"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Landing Page URL
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={qrCode.url}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
          />
          <button
            onClick={handleCopyUrl}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            title="Copy URL"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Download className="w-4 h-4" />
        Download QR Code
      </button>
    </div>
  );
}
