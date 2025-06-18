export interface Trust {
  id: string;
  name: string;
  mission: string;
  balance: number;
  lastDonation: Date;
  totalDonations: number;
  beneficiaryCount: number;
  walletAddress: string;
  imageUrl: string;
  urgencyScore: number;
  isAIRecommended: boolean;
}

export interface Activity {
  id: string;
  donor: string;
  amount: number;
  trustName: string;
  timestamp: Date;
  txHash: string;
}

export interface AIRecommendation {
  trustId: string;
  confidence: number;
  reasoning: string;
  suggestedAmount: number;
}