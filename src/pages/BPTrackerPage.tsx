/**
 * BP Tracker Page
 * Dedicated full-page view for Blood Pressure tracking
 */

import React from 'react';
import { GlassNavbar } from '@/components/GlassNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { BPTracker } from '@/components/BPTracker';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity } from 'lucide-react';

export default function BPTrackerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GlassNavbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 flex-1">
        {/* Compact Header */}
        <div className="mb-8 glass-panel p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
                  Smart BP Tracker
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/20 text-xs ml-2">
                    <Activity className="w-3 h-3 mr-1" />
                    Real-time
                  </Badge>
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Monitor blood pressure with visual trends, automatic alerts & detailed analysis
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/20 text-xs px-2 py-1">ABDM Integrated</Badge>
            </div>
          </div>
        </div>

        {/* BP Tracker Component */}
        <BPTracker />
      </div>

      <SiteFooter />
    </div>
  );
}

