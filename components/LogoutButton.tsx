'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-10 h-10 bg-sand-900 rounded-xl flex items-center justify-center hover:bg-sand-800 transition-colors"
      title="Sign out"
    >
      <LogOut className="w-4 h-4 text-white" />
    </button>
  );
}
