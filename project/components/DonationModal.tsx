'use client';

import { useState } from 'react';
import { Trust } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, Shield, CheckCircle } from 'lucide-react';

interface DonationModalProps {
  trust: Trust;
  onClose: () => void;
  onDonationComplete: (trust: Trust, amount: number, txHash: string) => void;
}

export function DonationModal({ trust, onClose, onDonationComplete }: DonationModalProps) {
  const [amount, setAmount] = useState('0.1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [txHash, setTxHash] = useState('');

  const suggestedAmounts = ['0.05', '0.1', '0.25', '0.5', '1.0'];
  const aiSuggestedAmount = trust.isAIRecommended ? '0.15' : '0.1';

  const handleDonate = async () => {
    setIsProcessing(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock transaction hash
    const mockTxHash = '0x' + Math.random().toString(16).slice(2, 42).padEnd(40, '0');
    setTxHash(mockTxHash);
    setIsProcessing(false);
    setIsComplete(true);
    
    // Complete after showing success
    setTimeout(() => {
      onDonationComplete(trust, parseFloat(amount), mockTxHash);
    }, 2000);
  };

  if (isComplete) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Donation Successful!</h3>
            <p className="text-slate-600 mb-4">
              Your donation of {amount} ETH has been sent to {trust.name}
            </p>
            <div className="bg-slate-50 p-3 rounded-lg mb-6">
              <p className="text-xs text-slate-500 mb-1">Transaction Hash</p>
              <p className="text-sm font-mono text-slate-700">{txHash}</p>
            </div>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }


  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Donate to {trust.name}
            {trust.isAIRecommended && (
              <Badge className="ml-2 bg-blue-100 text-blue-700">
                AI Recommended
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-slate-600 mb-2">{trust.mission}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Current Balance:</span>
              <span className="font-semibold">{trust.balance.toFixed(2)} ETH</span>
            </div>
          </div>
          
          {trust.isAIRecommended && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <Zap className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">AI Insight</h4>
                  <p className="text-sm text-slate-600">
                    This trust has the highest impact potential right now. 
                    Suggested amount: <strong>{aiSuggestedAmount} ETH</strong>
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Donation Amount (ETH)
            </label>
            <Input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
              placeholder="0.1"
            />
          </div>
          
          <div>
            <p className="text-sm text-slate-600 mb-3">Quick amounts:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedAmounts.map((suggested) => (
                <Button
                  key={suggested}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(suggested)}
                  className={amount === suggested ? 'bg-blue-50 border-blue-300' : ''}
                >
                  {suggested} ETH
                </Button>
              ))}
              {trust.isAIRecommended && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(aiSuggestedAmount)}
                  className={`${amount === aiSuggestedAmount ? 'bg-blue-50 border-blue-300' : ''} border-blue-400 text-blue-700`}
                >
                  {aiSuggestedAmount} ETH (AI)
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <div>
                <h4 className="font-semibold text-emerald-800 mb-1">Secure & Transparent</h4>
                <p className="text-sm text-emerald-700">
                  100% of your donation goes directly to the trust wallet. 
                  Track your transaction on the blockchain.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleDonate} 
              disabled={isProcessing || !amount || parseFloat(amount) <= 0}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing....
                </>
              ) : (
                `Donate ${amount} ETH`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}