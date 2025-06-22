'use client';

import { Shield, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface HeaderProps {
  onAdminClick: () => void;
}

export function Header({ onAdminClick }: HeaderProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async () => {
    setConnecting(true);
    try {
      const res = await fetch('/api/connect');
      const data = await res.json();
      setAddress(data.address);
      console.log('Wallet connected:', data.address);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                TrustBridge
              </h1>
              <p className="text-sm text-slate-600">AI-Powered Giving</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              className="text-slate-600 hover:text-blue-700"
            >
              <Settings className="h-4 w-4 mr-2" />
              Admin
            </Button>
            
            <div>
              {address ? (
                <span className="font-mono text-xs">Connected: {address}</span>
              ) : connecting ? (
                <div className="flex items-center space-x-2 px-4 py-2">
                  <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <span className="text-blue-700 font-semibold animate-pulse">Connecting to wallet...</span>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}