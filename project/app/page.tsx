'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TrustGrid } from '@/components/TrustGrid';
import { ActivityFeed } from '@/components/ActivityFeed';
import { DonationModal } from '@/components/DonationModal';
import { AIInsights } from '@/components/AIInsights';
import { AdminPanel } from '@/components/AdminPanel';
import { Trust, Activity } from '@/types';

// Mock data for demonstration
const mockTrusts: Trust[] = [
  {
    id: '1',
    name: 'Education First Initiative',
    mission: 'Providing quality education and school supplies to underprivileged children in rural communities.',
    balance: 2.47,
    lastDonation: new Date('2024-01-15T10:30:00Z'),
    totalDonations: 15.8,
    beneficiaryCount: 150,
    walletAddress: '0x742d35Cc6634C0532925a3b8D77d72d00481abcd',
    imageUrl: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg',
    urgencyScore: 85,
    isAIRecommended: true
  },
  {
    id: '2',
    name: 'Healthy Meals Program',
    mission: 'Ensuring no child goes hungry by providing nutritious meals to food-insecure families.',
    balance: 1.92,
    lastDonation: new Date('2024-01-14T15:45:00Z'),
    totalDonations: 23.6,
    beneficiaryCount: 200,
    walletAddress: '0x8ba1f109551bD432803012645Hac136c4c72d0b',
    imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
    urgencyScore: 72,
    isAIRecommended: false
  },
  {
    id: '3',
    name: 'Medical Care Access',
    mission: 'Providing essential healthcare services and medical supplies to children in underserved areas.',
    balance: 0.83,
    lastDonation: new Date('2024-01-13T09:20:00Z'),
    totalDonations: 19.2,
    beneficiaryCount: 85,
    walletAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    imageUrl: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
    urgencyScore: 91,
    isAIRecommended: false
  },
  {
    id: '4',
    name: 'Safe Housing Project',
    mission: 'Building safe and secure housing for children who have lost their homes due to natural disasters.',
    balance: 3.21,
    lastDonation: new Date('2024-01-16T14:10:00Z'),
    totalDonations: 31.5,
    beneficiaryCount: 120,
    walletAddress: '0x9f8e7d6c5b4a39281726354495867483957362f1',
    imageUrl: 'https://images.pexels.com/photos/8923659/pexels-photo-8923659.jpeg',
    urgencyScore: 68,
    isAIRecommended: false
  },
  {
    id: '5',
    name: 'Tech for Tomorrow',
    mission: 'Bridging the digital divide by providing technology access and digital literacy programs.',
    balance: 1.56,
    lastDonation: new Date('2024-01-12T11:55:00Z'),
    totalDonations: 12.4,
    beneficiaryCount: 95,
    walletAddress: '0xa1b2c3d4e5f6789012345678901234567890abcd',
    imageUrl: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg',
    urgencyScore: 79,
    isAIRecommended: false
  },
  {
    id: '6',
    name: 'Mental Health Support',
    mission: 'Providing counseling and mental health resources to children affected by trauma and crisis.',
    balance: 0.94,
    lastDonation: new Date('2024-01-11T16:40:00Z'),
    totalDonations: 8.7,
    beneficiaryCount: 65,
    walletAddress: '0xb2c3d4e5f6789012345678901234567890abcdef',
    imageUrl: 'https://images.pexels.com/photos/8923659/pexels-photo-8923659.jpeg',
    urgencyScore: 88,
    isAIRecommended: false
  }
];

const mockActivities: Activity[] = [
  {
    id: '1',
    donor: 'Anonymous',
    amount: 0.5,
    trustName: 'Education First Initiative',
    timestamp: new Date('2024-01-15T10:30:00Z'),
    txHash: '0x1234567890abcdef1234567890abcdef12345678'
  },
  {
    id: '2',
    donor: 'Sarah M.',
    amount: 1.2,
    trustName: 'Healthy Meals Program',
    timestamp: new Date('2024-01-14T15:45:00Z'),
    txHash: '0xabcdef1234567890abcdef1234567890abcdef12'
  },
  {
    id: '3',
    donor: 'Anonymous',
    amount: 0.8,
    trustName: 'Medical Care Access',
    timestamp: new Date('2024-01-13T09:20:00Z'),
    txHash: '0x567890abcdef1234567890abcdef1234567890ab'
  }
];

export default function Home() {
  const [trusts, setTrusts] = useState<Trust[]>(mockTrusts);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [selectedTrust, setSelectedTrust] = useState<Trust | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const handleDonate = (trust: Trust) => {
    setSelectedTrust(trust);
    setShowDonationModal(true);
  };

  const handleDonationComplete = (trust: Trust, amount: number, txHash: string) => {
    // Update trust balance
    setTrusts(prevTrusts =>
      prevTrusts.map(t =>
        t.id === trust.id
          ? {
              ...t,
              balance: t.balance + amount,
              totalDonations: t.totalDonations + amount,
              lastDonation: new Date()
            }
          : t
      )
    );

    // Add to activity feed
    const newActivity: Activity = {
      id: Date.now().toString(),
      donor: 'You',
      amount,
      trustName: trust.name,
      timestamp: new Date(),
      txHash
    };
    setActivities(prev => [newActivity, ...prev]);

    setShowDonationModal(false);
    setSelectedTrust(null);
  };

  const handleAddTrust = (newTrustData: Omit<Trust, 'id'>) => {
    const newTrust: Trust = {
      ...newTrustData,
      id: Date.now().toString()
    };
    setTrusts(prev => [...prev, newTrust]);
  };

  const handleDeleteTrust = (trustId: string) => {
    setTrusts(prev => prev.filter(t => t.id !== trustId));
    // Also remove related activities
    setActivities(prev => prev.filter(a => {
      const trust = trusts.find(t => t.id === trustId);
      return trust ? a.trustName !== trust.name : true;
    }));
  };

  const handleUpdateTrust = (updatedTrust: Trust) => {
    setTrusts(prev => prev.map(t => t.id === updatedTrust.id ? updatedTrust : t));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onAdminClick={() => setShowAdminPanel(!showAdminPanel)} />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <HeroSection />
        
        <AIInsights trusts={trusts} />
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TrustGrid trusts={trusts} onDonate={handleDonate} />
          </div>
          
          <div>
            <ActivityFeed activities={activities} />
          </div>
        </div>
        
        {showAdminPanel && (
          <AdminPanel 
            trusts={trusts} 
            activities={activities}
            onClose={() => setShowAdminPanel(false)}
            onAddTrust={handleAddTrust}
            onDeleteTrust={handleDeleteTrust}
            onUpdateTrust={handleUpdateTrust}
          />
        )}
      </main>

      {showDonationModal && selectedTrust && (
        <DonationModal
          trust={selectedTrust}
          onClose={() => setShowDonationModal(false)}
          onDonationComplete={handleDonationComplete}
        />
      )}
    </div>
  );
}