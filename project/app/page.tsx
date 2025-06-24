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
  },
  {
    id: '7',
    name: 'Bright Minds Fund',
    mission: 'Supporting STEM education for girls in developing regions.',
    balance: 1.15,
    lastDonation: new Date('2024-01-10T13:25:00Z'),
    totalDonations: 9.3,
    beneficiaryCount: 60,
    walletAddress: '0x7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c',
    imageUrl: 'https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg',
    urgencyScore: 77,
    isAIRecommended: false
  },
  {
    id: '8',
    name: 'Safe Steps',
    mission: 'Providing safe transportation for children in remote areas.',
    balance: 0.67,
    lastDonation: new Date('2024-01-09T08:10:00Z'),
    totalDonations: 5.1,
    beneficiaryCount: 40,
    walletAddress: '0x8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d',
    imageUrl: 'https://images.pexels.com/photos/325521/pexels-photo-325521.jpeg',
    urgencyScore: 70,
    isAIRecommended: false
  },
  {
    id: '9',
    name: 'Bright Smiles',
    mission: 'Dental care and hygiene education for children.',
    balance: 0.82,
    lastDonation: new Date('2024-01-08T17:00:00Z'),
    totalDonations: 6.7,
    beneficiaryCount: 55,
    walletAddress: '0x9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
    imageUrl: 'https://images.pexels.com/photos/20787/pexels-photo.jpg',
    urgencyScore: 74,
    isAIRecommended: false
  },
  {
    id: '10',
    name: 'Future Leaders Fund',
    mission: 'Empowering children with leadership and life skills for a brighter tomorrow.',
    balance: 1.25,
    lastDonation: new Date('2024-01-07T15:30:00Z'),
    totalDonations: 7.9,
    beneficiaryCount: 70,
    walletAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    imageUrl: 'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg',
    urgencyScore: 81,
    isAIRecommended: true
  },
];

const mockActivities: Activity[] = [
  { id: '1', donor: 'Anonymous', amount: 0.5, trustName: 'Education First Initiative', timestamp: new Date('2024-01-15T10:30:00Z'), txHash: '0x1234567890abcdef1234567890abcdef12345678' },
  { id: '2', donor: 'Sarah M.', amount: 1.2, trustName: 'Healthy Meals Program', timestamp: new Date('2024-01-14T15:45:00Z'), txHash: '0xabcdef1234567890abcdef1234567890abcdef12' },
  { id: '3', donor: 'Anonymous', amount: 0.8, trustName: 'Medical Care Access', timestamp: new Date('2024-01-13T09:20:00Z'), txHash: '0x567890abcdef1234567890abcdef1234567890ab' },
  { id: '4', donor: 'Priya S.', amount: 0.3, trustName: 'Safe Housing Project', timestamp: new Date('2024-01-16T18:10:00Z'), txHash: '0xabc123abc123abc123abc123abc123abc123abc1' },
  { id: '5', donor: 'John D.', amount: 2.0, trustName: 'Tech for Tomorrow', timestamp: new Date('2024-01-12T12:00:00Z'), txHash: '0xdef456def456def456def456def456def456def4' },
  { id: '6', donor: 'Anonymous', amount: 0.6, trustName: 'Mental Health Support', timestamp: new Date('2024-01-11T17:20:00Z'), txHash: '0x789abc789abc789abc789abc789abc789abc789a' },
  { id: '7', donor: 'Emily R.', amount: 1.1, trustName: 'Bright Minds Fund', timestamp: new Date('2024-01-10T14:30:00Z'), txHash: '0x456def456def456def456def456def456def456d' },
  { id: '8', donor: 'Anonymous', amount: 0.4, trustName: 'Safe Steps', timestamp: new Date('2024-01-09T09:15:00Z'), txHash: '0x321cba321cba321cba321cba321cba321cba321c' },
  { id: '9', donor: 'Carlos M.', amount: 0.9, trustName: 'Bright Smiles', timestamp: new Date('2024-01-08T18:00:00Z'), txHash: '0x654fed654fed654fed654fed654fed654fed654f' },
  { id: '10', donor: 'Ava L.', amount: 1.5, trustName: 'Education First Initiative', timestamp: new Date('2024-01-15T12:00:00Z'), txHash: '0xaaa111aaa111aaa111aaa111aaa111aaa111aaa1' },
  { id: '11', donor: 'Ben T.', amount: 0.7, trustName: 'Healthy Meals Program', timestamp: new Date('2024-01-14T16:10:00Z'), txHash: '0xbbb222bbb222bbb222bbb222bbb222bbb222bbb2' },
  { id: '12', donor: 'Anonymous', amount: 0.2, trustName: 'Medical Care Access', timestamp: new Date('2024-01-13T10:00:00Z'), txHash: '0xccc333ccc333ccc333ccc333ccc333ccc333ccc3' },
  { id: '13', donor: 'Priya S.', amount: 0.9, trustName: 'Safe Housing Project', timestamp: new Date('2024-01-16T19:00:00Z'), txHash: '0xddd444ddd444ddd444ddd444ddd444ddd444ddd4' },
  { id: '14', donor: 'John D.', amount: 1.8, trustName: 'Tech for Tomorrow', timestamp: new Date('2024-01-12T13:00:00Z'), txHash: '0xeee555eee555eee555eee555eee555eee555eee5' },
  { id: '15', donor: 'Anonymous', amount: 0.3, trustName: 'Mental Health Support', timestamp: new Date('2024-01-11T18:00:00Z'), txHash: '0xfff666fff666fff666fff666fff666fff666fff6' },
  { id: '16', donor: 'Emily R.', amount: 1.0, trustName: 'Bright Minds Fund', timestamp: new Date('2024-01-10T15:00:00Z'), txHash: '0x111aaa111aaa111aaa111aaa111aaa111aaa111a' },
  { id: '17', donor: 'Anonymous', amount: 0.5, trustName: 'Safe Steps', timestamp: new Date('2024-01-09T10:00:00Z'), txHash: '0x222bbb222bbb222bbb222bbb222bbb222bbb222b' },
  { id: '18', donor: 'Carlos M.', amount: 1.2, trustName: 'Bright Smiles', timestamp: new Date('2024-01-08T19:00:00Z'), txHash: '0x333ccc333ccc333ccc333ccc333ccc333ccc333c' },
  { id: '19', donor: 'Anonymous', amount: 0.6, trustName: 'Education First Initiative', timestamp: new Date('2024-01-15T13:00:00Z'), txHash: '0x444ddd444ddd444ddd444ddd444ddd444ddd444d' },
  { id: '20', donor: 'Sarah M.', amount: 1.3, trustName: 'Healthy Meals Program', timestamp: new Date('2024-01-14T17:00:00Z'), txHash: '0x555eee555eee555eee555eee555eee555eee555e' },
  { id: '21', donor: 'Anonymous', amount: 0.7, trustName: 'Medical Care Access', timestamp: new Date('2024-01-13T11:00:00Z'), txHash: '0x666fff666fff666fff666fff666fff666fff666f' },
  { id: '22', donor: 'Priya S.', amount: 0.4, trustName: 'Safe Housing Project', timestamp: new Date('2024-01-16T20:00:00Z'), txHash: '0x7771117771117771117771117771117771117771' },
  { id: '23', donor: 'John D.', amount: 2.2, trustName: 'Tech for Tomorrow', timestamp: new Date('2024-01-12T14:00:00Z'), txHash: '0x8882228882228882228882228882228882228882' },
  { id: '24', donor: 'Anonymous', amount: 0.8, trustName: 'Mental Health Support', timestamp: new Date('2024-01-11T19:00:00Z'), txHash: '0x9993339993339993339993339993339993339993' },
  { id: '25', donor: 'Emily R.', amount: 1.3, trustName: 'Bright Minds Fund', timestamp: new Date('2024-01-10T16:00:00Z'), txHash: '0xaaa444aaa444aaa444aaa444aaa444aaa444aaa4' },
  { id: '26', donor: 'Anonymous', amount: 0.9, trustName: 'Safe Steps', timestamp: new Date('2024-01-09T11:00:00Z'), txHash: '0xbbb555bbb555bbb555bbb555bbb555bbb555bbb5' },
  { id: '27', donor: 'Carlos M.', amount: 1.5, trustName: 'Bright Smiles', timestamp: new Date('2024-01-08T20:00:00Z'), txHash: '0xccc666ccc666ccc666ccc666ccc666ccc666ccc6' },
  { id: '28', donor: 'Anonymous', amount: 0.4, trustName: 'Education First Initiative', timestamp: new Date('2024-01-15T14:00:00Z'), txHash: '0xddd777ddd777ddd777ddd777ddd777ddd777ddd7' },
  { id: '29', donor: 'Sarah M.', amount: 1.4, trustName: 'Healthy Meals Program', timestamp: new Date('2024-01-14T18:00:00Z'), txHash: '0xeee888eee888eee888eee888eee888eee888eee8' },
  { id: '30', donor: 'Anonymous', amount: 0.5, trustName: 'Medical Care Access', timestamp: new Date('2024-01-13T12:00:00Z'), txHash: '0xfff999fff999fff999fff999fff999fff999fff9' },
  { id: '31', donor: 'Priya S.', amount: 0.8, trustName: 'Safe Housing Project', timestamp: new Date('2024-01-16T21:00:00Z'), txHash: '0x111aaa222bbb333ccc444ddd555eee666fff777g' },
  { id: '32', donor: 'John D.', amount: 2.5, trustName: 'Tech for Tomorrow', timestamp: new Date('2024-01-12T15:00:00Z'), txHash: '0x8889998889998889998889998889998889998889' },
  { id: '33', donor: 'Anonymous', amount: 0.7, trustName: 'Mental Health Support', timestamp: new Date('2024-01-11T20:00:00Z'), txHash: '0x7778887778887778887778887778887778887778' },
  
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

  const handleAutoDonate = (trust: Trust, amount: number) => {
    // Simulate a transaction hash for the mock
    const txHash = Math.random().toString(16).slice(2);
    // Update trust balance and activity feed
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
    const newActivity: Activity = {
      id: Date.now().toString(),
      donor: 'You (Auto Donate)',
      amount,
      trustName: trust.name,
      timestamp: new Date(),
      txHash
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onAdminClick={() => setShowAdminPanel(!showAdminPanel)} />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <HeroSection />
        
        <AIInsights trusts={trusts} onAutoDonate={handleAutoDonate} />
        
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