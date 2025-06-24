'use client';

import { useState } from 'react';
import { Trust } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Brain, TrendingUp, Target, AlertTriangle, Zap } from 'lucide-react';

interface AIInsightsProps {
  trusts: Trust[];
  onAutoDonate: (trust: Trust, amount: number) => void;
}

export function AIInsights({ trusts, onAutoDonate }: AIInsightsProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const recommendedTrust = trusts.find(t => t.isAIRecommended);
  const highUrgencyTrusts = trusts.filter(t => t.urgencyScore >= 85).length;
  const totalBalance = trusts.reduce((sum, t) => sum + t.balance, 0);
  const avgUrgency = trusts.reduce((sum, t) => sum + t.urgencyScore, 0) / trusts.length;

  const handleAutoDonate = async () => {
    if (!recommendedTrust) return;
    setIsProcessing(true);
    await new Promise(res => setTimeout(res, 1200)); // fake animation delay
    onAutoDonate(recommendedTrust, 5.0);
    setIsProcessing(false);
    setShowConfirm(false);
  };

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
              onClick={() => setShowConfirm(true)}
              disabled={isProcessing}
            >
              Auto Donate
            </Button>
          </div>
        </Card>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md animate-bounce-in">
          <div className="text-center py-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Confirm Auto Donation</h3>
            <p className="text-slate-600 mb-4">
              Are you sure you want to auto donate <span className="font-bold">5.0 ETH</span> to <span className="font-bold">{recommendedTrust?.name}</span>?
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleAutoDonate}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Yes, Donate'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}