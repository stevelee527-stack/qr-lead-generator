'use client';

import { useState } from 'react';
import { Download, Copy, Check, Eye } from 'lucide-react';

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
    <div className="card-hover">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-lg font-semibold text-sand-900">{qrCode.name}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <Eye className="w-3.5 h-3.5 text-sand-400" />
            <span className="text-sm text-sand-500">{qrCode.scans} scans</span>
          </div>
        </div>
        <span className="badge-success">Active</span>
      </div>

      <div className="flex justify-center mb-5 bg-sand-50 p-6 rounded-2xl">
        <img
          src={qrCode.imageUrl}
          alt={qrCode.name}
          className="w-56 h-56"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">
          Landing Page URL
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={qrCode.url}
            readOnly
            className="flex-1 px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-sand-700"
          />
          <button
            onClick={handleCopyUrl}
            className="px-3 py-2.5 bg-sand-50 hover:bg-sand-100 border border-sand-200 rounded-xl transition-all duration-200"
            title="Copy URL"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4 text-sand-600" />
            )}
          </button>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Download QR Code
      </button>
    </div>
  );
}
