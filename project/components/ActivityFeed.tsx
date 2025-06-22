'use client';

import { Activity } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900">Live Activity</h3>
        <Badge variant="outline" className="text-emerald-600 border-emerald-200">
          Live
        </Badge>
      </div>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="border-l-2 border-blue-200 pl-4 pb-4 last:pb-0 relative"
            >
              <div className="absolute -left-2 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900">
                    {activity.donor}
                  </span>
                  <span className="text-sm text-slate-500">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600">
                  Donated{' '}
                  <span className="font-semibold text-emerald-600">
                    {activity.amount} ETH
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {activity.trustName}
                  </span>
                </p>
                
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {truncateHash(activity.txHash)}
                  </Badge>
                  <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {activities.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all activity →
          </button>
        </div>
      )}
    </Card>
  );
}