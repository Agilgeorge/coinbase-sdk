'use client';


import { Trust } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Wallet, Sparkles, Heart, Gift, HandHeart, Coins } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';


interface TrustCardProps {
  trust: Trust;
  onDonate: () => void;
}

export function TrustCard({ trust, onDonate }: TrustCardProps) {
  const getUrgencyColor = (score: number) => {
    if (score >= 85) return 'bg-red-100 text-red-700';
    if (score >= 70) return 'bg-amber-100 text-amber-700';
    return 'bg-green-100 text-green-700';
  };

  const getUrgencyLabel = (score: number) => {
    if (score >= 85) return 'High Priority';
    if (score >= 70) return 'Medium Priority';
    return 'Stable';
  };

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
      trust.isAIRecommended ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
    }`}>
      {/* Donation Appeal Banner */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-center py-2 z-20">
        <div className="flex items-center justify-center space-x-2 text-sm font-medium">
          <HandHeart className="h-4 w-4" />
          <span>Your donation can make a difference today</span>
          <Heart className="h-4 w-4 animate-pulse" />
        </div>
      </div>

      {trust.isAIRecommended && (
        <div className="absolute top-12 right-4 z-10">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Recommended
          </Badge>
        </div>
      )}
      
      <div className="aspect-video relative overflow-hidden mt-10">
        <img
          src={trust.imageUrl}
          alt={trust.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Floating Donation Elements */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-2">
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
              <Gift className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
              <span className="text-xs font-semibold text-slate-800">Help Now</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <Badge className={`${getUrgencyColor(trust.urgencyScore)} border-0 shadow-lg`}>
              {getUrgencyLabel(trust.urgencyScore)}
            </Badge>
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Coins className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-bold text-slate-800">
                {trust.balance.toFixed(2)} ETH
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
          {trust.name}
        </h4>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {trust.mission}
        </p>
        
        {/* Donation Impact Visualization */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg mb-4 border border-emerald-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-800">Impact Potential</span>
            </div>
            <div className="text-sm font-bold text-emerald-700">
              {trust.beneficiaryCount} children
            </div>
          </div>
          <div className="w-full bg-white rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((trust.balance / 5) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>Current funding</span>
            <span>Full capacity</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-slate-500">
              <Users className="h-4 w-4 mr-2" />
              {trust.beneficiaryCount} children
            </div>
            <div className="flex items-center text-slate-500">
              <Wallet className="h-4 w-4 mr-2" />
              {trust.totalDonations.toFixed(1)} ETH raised
            </div>
          </div>
          
          <div className="flex items-center text-sm text-slate-500">
            <Clock className="h-4 w-4 mr-2" />
            Last donation {formatDistanceToNow(trust.lastDonation, { addSuffix: true })}
          </div>
        </div>
        
        {/* Donation Call-to-Action */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200">
            <div className="flex items-center space-x-2 mb-1">
              <HandHeart className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">Every donation counts</span>
            </div>
            <p className="text-xs text-amber-700">
              Your contribution directly supports {trust.beneficiaryCount} children in need
            </p>
          </div>
          
          <Button 
            onClick={onDonate}
            className={`w-full relative overflow-hidden ${
              trust.isAIRecommended 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
            } text-white border-0 transition-all duration-300 group-hover:shadow-lg`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Gift className="h-4 w-4" />
              <span className="font-semibold">
                {trust.isAIRecommended ? 'Donate Now (AI Pick)' : 'Donate Now'}
              </span>
              <Heart className="h-4 w-4 group-hover:animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>
        </div>
      </div>

      {/* Floating donation reminder */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
        <Heart className="h-4 w-4 text-white" />
      </div>
    </Card>
  );
}