/**
 * Diabetes Tracking Page
 * Combines all diabetes tracking features
 */

import React from 'react';
import { GlassNavbar } from '@/components/GlassNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { GlucoseTracker } from '@/components/GlucoseTracker';
import { DiabeticRiskCalculator } from '@/components/DiabeticRiskCalculator';
import { MealPlanner } from '@/components/MealPlanner';
import { InsulinReminder } from '@/components/InsulinReminder';
import { EarlyWarningAlerts } from '@/components/EarlyWarningAlerts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Droplet,
  Shield,
  UtensilsCrossed,
  Pill,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export default function DiabetesManagementPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <GlassNavbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 flex-1">
        {/* Compact Header */}
        <div className="mb-8 glass-panel p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Droplet className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
                  Diabetes Tracking
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/20 text-xs ml-2">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI-Powered
                  </Badge>
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Comprehensive glucose tracking, risk assessment, meal planning & smart reminders
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/20 text-xs px-2 py-1">ABDM Integrated</Badge>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="glucose" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 gap-2 mb-6 bg-white/5 border border-white/10 p-1 rounded-xl backdrop-blur-md">
            <TabsTrigger
              value="glucose"
              className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-2.5 text-sm font-medium transition-all text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent data-[state=active]:border-primary/20"
            >
              <Droplet className="w-4 h-4" />
              <span className="hidden sm:inline">Glucose</span>
              <span className="sm:hidden">Track</span>
            </TabsTrigger>
            <TabsTrigger
              value="risk"
              className="flex items-center justify-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg py-2.5 text-sm font-medium transition-all text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent data-[state=active]:border-green-500/20"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Risk</span>
              <span className="sm:hidden">Risk</span>
            </TabsTrigger>
            <TabsTrigger
              value="meals"
              className="flex items-center justify-center gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-lg py-2.5 text-sm font-medium transition-all text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent data-[state=active]:border-orange-500/20"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span className="hidden sm:inline">Meals</span>
              <span className="sm:hidden">Meals</span>
            </TabsTrigger>
            <TabsTrigger
              value="reminders"
              className="flex items-center justify-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg py-2.5 text-sm font-medium transition-all text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent data-[state=active]:border-purple-500/20"
            >
              <Pill className="w-4 h-4" />
              <span className="hidden sm:inline">Reminders</span>
              <span className="sm:hidden">Meds</span>
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="flex items-center justify-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg py-2.5 text-sm font-medium transition-all text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent data-[state=active]:border-red-500/20"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Alerts</span>
              <span className="sm:hidden">Alert</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="glucose" className="mt-0">
            <GlucoseTracker />
          </TabsContent>

          <TabsContent value="risk" className="mt-0">
            <DiabeticRiskCalculator />
          </TabsContent>

          <TabsContent value="meals" className="mt-0">
            <MealPlanner />
          </TabsContent>

          <TabsContent value="reminders" className="mt-0">
            <InsulinReminder />
          </TabsContent>

          <TabsContent value="alerts" className="mt-0">
            <EarlyWarningAlerts />
          </TabsContent>
        </Tabs>
      </div>

      <SiteFooter />
    </div>
  );
}
