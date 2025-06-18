'use client';

import { useState } from 'react';
import { Trust, Activity } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  X, BarChart3, Users, Wallet, TrendingUp, Plus, Trash2, 
  Edit, Shield, AlertTriangle, CheckCircle, Copy, ExternalLink 
} from 'lucide-react';

interface AdminPanelProps {
  trusts: Trust[];
  activities: Activity[];
  onClose: () => void;
  onAddTrust: (trust: Omit<Trust, 'id'>) => void;
  onDeleteTrust: (trustId: string) => void;
  onUpdateTrust: (trust: Trust) => void;
}

interface TrustFormData {
  name: string;
  mission: string;
  beneficiaryCount: number;
  imageUrl: string;
  urgencyScore: number;
  isAIRecommended: boolean;
}

export function AdminPanel({ trusts, activities, onClose, onAddTrust, onDeleteTrust, onUpdateTrust }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'trusts' | 'registration'>('overview');
  const [showAddTrustModal, setShowAddTrustModal] = useState(false);
  const [showEditTrustModal, setShowEditTrustModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingTrust, setEditingTrust] = useState<Trust | null>(null);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [newWalletAddress, setNewWalletAddress] = useState('');
  
  const [formData, setFormData] = useState<TrustFormData>({
    name: '',
    mission: '',
    beneficiaryCount: 0,
    imageUrl: '',
    urgencyScore: 50,
    isAIRecommended: false
  });

  const totalBalance = trusts.reduce((sum, t) => sum + t.balance, 0);
  const totalBeneficiaries = trusts.reduce((sum, t) => sum + t.beneficiaryCount, 0);
  const totalDonations = trusts.reduce((sum, t) => sum + t.totalDonations, 0);
  const avgUrgency = trusts.reduce((sum, t) => sum + t.urgencyScore, 0) / trusts.length;

  const generateWalletAddress = async () => {
    setIsCreatingWallet(true);
    // Simulate wallet creation with CDP SDK
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockWallet = '0x' + Math.random().toString(16).slice(2, 42).padEnd(40, '0');
    setNewWalletAddress(mockWallet);
    setIsCreatingWallet(false);
    return mockWallet;
  };

  const handleAddTrust = async () => {
    if (!formData.name || !formData.mission) return;
    
    const walletAddress = newWalletAddress || await generateWalletAddress();
    
    const newTrust: Omit<Trust, 'id'> = {
      ...formData,
      balance: 0,
      lastDonation: new Date(),
      totalDonations: 0,
      walletAddress,
      imageUrl: formData.imageUrl || 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg'
    };
    
    onAddTrust(newTrust);
    setShowAddTrustModal(false);
    setFormData({
      name: '',
      mission: '',
      beneficiaryCount: 0,
      imageUrl: '',
      urgencyScore: 50,
      isAIRecommended: false
    });
    setNewWalletAddress('');
  };

  const handleEditTrust = () => {
    if (!editingTrust) return;
    
    const updatedTrust: Trust = {
      ...editingTrust,
      ...formData
    };
    
    onUpdateTrust(updatedTrust);
    setShowEditTrustModal(false);
    setEditingTrust(null);
    setFormData({
      name: '',
      mission: '',
      beneficiaryCount: 0,
      imageUrl: '',
      urgencyScore: 50,
      isAIRecommended: false
    });
  };

  const openEditModal = (trust: Trust) => {
    setEditingTrust(trust);
    setFormData({
      name: trust.name,
      mission: trust.mission,
      beneficiaryCount: trust.beneficiaryCount,
      imageUrl: trust.imageUrl,
      urgencyScore: trust.urgencyScore,
      isAIRecommended: trust.isAIRecommended
    });
    setShowEditTrustModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-hidden bg-white">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
              <p className="text-slate-600">Manage trusts, monitor performance, and oversee donation flows</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex space-x-1 mt-6">
            <Button
              variant={activeTab === 'overview' ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab('overview')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'trusts' ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab('trusts')}
            >
              <Shield className="h-4 w-4 mr-2" />
              Trust Management
            </Button>
            <Button
              variant={activeTab === 'registration' ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab('registration')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Register New Trust
            </Button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
          {activeTab === 'overview' && (
            <div className="p-6 space-y-8">
              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <Wallet className="h-6 w-6 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-700">
                      {totalBalance.toFixed(2)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900">Total ETH</h3>
                  <p className="text-sm text-slate-600">In trust wallets</p>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="h-6 w-6 text-emerald-600" />
                    <span className="text-2xl font-bold text-emerald-700">
                      {totalBeneficiaries}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900">Beneficiaries</h3>
                  <p className="text-sm text-slate-600">Children supported</p>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-6 w-6 text-amber-600" />
                    <span className="text-2xl font-bold text-amber-700">
                      {totalDonations.toFixed(1)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900">Total Raised</h3>
                  <p className="text-sm text-slate-600">All-time ETH</p>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-700">
                      {avgUrgency.toFixed(0)}%
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900">Avg Urgency</h3>
                  <p className="text-sm text-slate-600">System-wide need</p>
                </Card>
              </div>
              
              {/* Recent Activity */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Recent Activity</h3>
                <Card className="p-4">
                  {activities.length === 0 ? (
                    <p className="text-slate-500 text-center py-4">No recent activity</p>
                  ) : (
                    <div className="space-y-3">
                      {activities.slice(0, 10).map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                          <div>
                            <span className="font-medium">{activity.donor}</span>
                            <span className="text-slate-600"> donated </span>
                            <span className="font-semibold text-emerald-600">{activity.amount} ETH</span>
                            <span className="text-slate-600"> to </span>
                            <span className="font-medium">{activity.trustName}</span>
                          </div>
                          <div className="text-sm text-slate-500">
                            {activity.timestamp.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'trusts' && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Trust Management</h3>
                <Button onClick={() => setShowAddTrustModal(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Trust
                </Button>
              </div>
              
              <div className="grid gap-4">
                {trusts.map((trust) => (
                  <Card key={trust.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="text-lg font-semibold text-slate-900">{trust.name}</h4>
                          {trust.isAIRecommended && (
                            <Badge className="bg-blue-100 text-blue-700">AI Recommended</Badge>
                          )}
                          <Badge variant={trust.urgencyScore >= 85 ? 'destructive' : trust.urgencyScore >= 70 ? 'default' : 'secondary'}>
                            {trust.urgencyScore}% Urgency
                          </Badge>
                        </div>
                        
                        <p className="text-slate-600 mb-4 max-w-2xl">{trust.mission}</p>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">Balance: </span>
                            <span className="font-medium">{trust.balance.toFixed(2)} ETH</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Total Raised: </span>
                            <span className="font-medium">{trust.totalDonations.toFixed(1)} ETH</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Beneficiaries: </span>
                            <span className="font-medium">{trust.beneficiaryCount}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-500">Wallet: </span>
                            <span className="font-mono text-xs">{trust.walletAddress.slice(0, 8)}...</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(trust.walletAddress)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(trust)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDeleteConfirm(trust.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'registration' && (
            <div className="p-6">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Register New Trust</h3>
                  <p className="text-slate-600">Create a new verified trust with dedicated wallet infrastructure</p>
                </div>
                
                <Card className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Trust Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Education First Initiative"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Mission Statement *
                      </label>
                      <Textarea
                        value={formData.mission}
                        onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                        placeholder="Describe the trust's mission and how donations will be used..."
                        rows={4}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Beneficiary Count
                        </label>
                        <Input
                          type="number"
                          value={formData.beneficiaryCount}
                          onChange={(e) => setFormData({ ...formData, beneficiaryCount: parseInt(e.target.value) || 0 })}
                          placeholder="150"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Urgency Score (0-100)
                        </label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={formData.urgencyScore}
                          onChange={(e) => setFormData({ ...formData, urgencyScore: parseInt(e.target.value) || 50 })}
                          placeholder="85"
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Image URL
                      </label>
                      <Input
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="https://images.pexels.com/photos/..."
                        className="w-full"
                      />
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-3">Wallet Creation</h4>
                      {newWalletAddress ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                            <span className="text-sm text-emerald-700 font-medium">Wallet Created Successfully</span>
                          </div>
                          <div className="bg-white p-3 rounded border flex items-center justify-between">
                            <span className="font-mono text-sm">{newWalletAddress}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(newWalletAddress)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm text-slate-600">
                            A secure wallet will be automatically created for this trust using Coinbase CDP SDK.
                          </p>
                          <Button
                            variant="outline"
                            onClick={generateWalletAddress}
                            disabled={isCreatingWallet}
                            className="w-full"
                          >
                            {isCreatingWallet ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                Creating Wallet...
                              </>
                            ) : (
                              <>
                                <Wallet className="h-4 w-4 mr-2" />
                                Pre-Generate Wallet
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="aiRecommended"
                        checked={formData.isAIRecommended}
                        onChange={(e) => setFormData({ ...formData, isAIRecommended: e.target.checked })}
                        className="rounded border-slate-300"
                      />
                      <label htmlFor="aiRecommended" className="text-sm text-slate-700">
                        Mark as AI Recommended
                      </label>
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFormData({
                            name: '',
                            mission: '',
                            beneficiaryCount: 0,
                            imageUrl: '',
                            urgencyScore: 50,
                            isAIRecommended: false
                          });
                          setNewWalletAddress('');
                        }}
                        className="flex-1"
                      >
                        Reset Form
                      </Button>
                      <Button
                        onClick={handleAddTrust}
                        disabled={!formData.name || !formData.mission}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      >
                        Register Trust
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Add Trust Modal */}
      <Dialog open={showAddTrustModal} onOpenChange={setShowAddTrustModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Trust</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Trust Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Textarea
              placeholder="Mission Statement"
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Beneficiaries"
                value={formData.beneficiaryCount}
                onChange={(e) => setFormData({ ...formData, beneficiaryCount: parseInt(e.target.value) || 0 })}
              />
              <Input
                type="number"
                placeholder="Urgency (0-100)"
                value={formData.urgencyScore}
                onChange={(e) => setFormData({ ...formData, urgencyScore: parseInt(e.target.value) || 50 })}
              />
            </div>
            <Input
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowAddTrustModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleAddTrust} className="flex-1">
                Add Trust
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Trust Modal */}
      <Dialog open={showEditTrustModal} onOpenChange={setShowEditTrustModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Trust</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Trust Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Textarea
              placeholder="Mission Statement"
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Beneficiaries"
                value={formData.beneficiaryCount}
                onChange={(e) => setFormData({ ...formData, beneficiaryCount: parseInt(e.target.value) || 0 })}
              />
              <Input
                type="number"
                placeholder="Urgency (0-100)"
                value={formData.urgencyScore}
                onChange={(e) => setFormData({ ...formData, urgencyScore: parseInt(e.target.value) || 50 })}
              />
            </div>
            <Input
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="editAiRecommended"
                checked={formData.isAIRecommended}
                onChange={(e) => setFormData({ ...formData, isAIRecommended: e.target.checked })}
              />
              <label htmlFor="editAiRecommended" className="text-sm">AI Recommended</label>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowEditTrustModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleEditTrust} className="flex-1">
                Update Trust
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Delete Trust
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-slate-600">
              Are you sure you want to delete this trust? This action cannot be undone and will remove all associated data.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(null)} className="flex-1">
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (showDeleteConfirm) {
                    onDeleteTrust(showDeleteConfirm);
                    setShowDeleteConfirm(null);
                  }
                }}
                className="flex-1"
              >
                Delete Trust
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}