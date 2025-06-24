'use client';

import { Trust } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Target, AlertTriangle } from 'lucide-react';

interface AIInsightsProps {
  trusts: Trust[];
  onAutoDonate: (trust: Trust, amount: number) => void;
}

export function AIInsights({ trusts, onAutoDonate }: AIInsightsProps) {
  const recommendedTrust = trusts.find(t => t.isAIRecommended);
  const highUrgencyTrusts = trusts.filter(t => t.urgencyScore >= 85).length;
  const totalBalance = trusts.reduce((sum, t) => sum + t.balance, 0);
  const avgUrgency = trusts.reduce((sum, t) => sum + t.urgencyScore, 0) / trusts.length;

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">AI Donation Intelligence</h3>
        <p className="text-slate-600">Real-time analysis and recommendations for maximum impact</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-700">
              {recommendedTrust ? '1' : '0'}
            </span>
          </div>
          <h4 className="font-semibold text-slate-900 mb-1">AI Recommendation</h4>
          <p className="text-sm text-slate-600">
            {recommendedTrust ? `${recommendedTrust.name}` : 'Analyzing...'}
          </p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
            <span className="text-2xl font-bold text-amber-700">
              {highUrgencyTrusts}
            </span>
          </div>
          <h4 className="font-semibold text-slate-900 mb-1">High Priority</h4>
          <p className="text-sm text-slate-600">Trusts needing urgent support</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-700">
              {totalBalance.toFixed(1)}
            </span>
          </div>
          <h4 className="font-semibold text-slate-900 mb-1">Total ETH</h4>
          <p className="text-sm text-slate-600">Currently in trust wallets</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-700">
              {avgUrgency.toFixed(0)}%
            </span>
          </div>
          <h4 className="font-semibold text-slate-900 mb-1">Avg Urgency</h4>
          <p className="text-sm text-slate-600">Current need level</p>
        </Card>
      </div>
      
      {recommendedTrust && (
        <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <Brain className="h-6 w-6 mr-2" />
                <h4 className="text-lg font-semibold">AI Recommendation</h4>
              </div>
              <p className="text-blue-100 mb-4">
                Based on current funding levels, recent donation patterns, and urgency indicators, 
                <strong className="text-white"> {recommendedTrust.name}</strong> would benefit most 
                from your donation right now.
              </p>
              <div className="flex items-center space-x-4 text-sm text-blue-100">
                <span>Urgency: {recommendedTrust.urgencyScore}%</span>
                <span>Balance: {recommendedTrust.balance.toFixed(2)} ETH</span>
                <span>Beneficiaries: {recommendedTrust.beneficiaryCount}</span>
              </div>
            </div>
            <Button
              variant="secondary"
              className="ml-6 bg-white text-blue-700 hover:bg-blue-50"
              onClick={() => onAutoDonate(recommendedTrust, 5.0)}
            >
              Auto Donate
            </Button>
          </div>
        </Card>
      )}
    </section>
  );
}