'use client';

import { Trust } from '@/types';
import { TrustCard } from './TrustCard';

interface TrustGridProps {
  trusts: Trust[];
  onDonate: (trust: Trust) => void;
}

export function TrustGrid({ trusts, onDonate }: TrustGridProps) {
  // Sort trusts with AI recommended first, then by urgency score
  const sortedTrusts = [...trusts].sort((a, b) => {
    if (a.isAIRecommended && !b.isAIRecommended) return -1;
    if (!a.isAIRecommended && b.isAIRecommended) return 1;
    return b.urgencyScore - a.urgencyScore;
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Active Trusts</h3>
          <p className="text-slate-600 mt-1">Choose a trust to support or let AI guide your giving</p>
        </div>
        <div className="text-sm text-slate-500">
          {trusts.length} verified trusts
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {sortedTrusts.map((trust) => (
          <TrustCard
            key={trust.id}
            trust={trust}
            onDonate={() => onDonate(trust)}
          />
        ))}
      </div>
    </section>
  );
}