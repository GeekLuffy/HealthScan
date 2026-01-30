import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VoiceLab } from '@/components/labs/VoiceLab';
import MotorLab from '@/components/labs/MotorLab';
import { EyeLab } from '@/components/labs/EyeLab';
import { GlassNavbar } from '@/components/GlassNavbar';
import { GovernmentBanner } from '@/components/GovernmentBanner';
import { SiteFooter } from '@/components/SiteFooter';
import {
  Activity,
  Brain,
  Eye,
  Mic,
  Timer,
  TrendingUp,
  Sparkles,
  Shield,
  Cpu,
  ArrowRight,
  Stethoscope,
  Heart,
  CheckCircle,
  Ear
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const labs = [
    {
      id: 'voice',
      title: 'Voice & Speech Lab',
      description: 'Analyze vocal patterns, pitch stability, and speech characteristics',
      targetCondition: 'Vocal Biomarkers & Laryngitis',
      icon: Mic,
      status: 'ready',
      features: ['Pitch Analysis', 'Jitter Detection', 'Voice Quality'],
      color: 'green'
    },
    {
      id: 'eye',
      title: 'Eye & Cognition Lab',
      description: 'Test reaction times, visual attention, and cognitive processing',
      targetCondition: "Alzheimer's & Cognitive Decline",
      icon: Eye,
      status: 'ready',
      features: ['Saccade Tests', 'Reaction Time', 'Stroop Test'],
      color: 'orange'
    },
    {
      id: 'motor',
      title: 'Motor & Tremor Lab',
      description: 'Measure movement patterns, tremor frequency, and motor control',
      targetCondition: "Parkinson's & Movement Disorders",
      icon: Activity,
      status: 'ready',
      features: ['Finger Tapping', 'Tremor Analysis', 'Movement Speed'],
      color: 'blue'
    },
    {
      id: 'mental-health',
      title: 'Mental Health Lab',
      description: 'PHQ-9 depression and GAD-7 anxiety screening assessments',
      targetCondition: 'Depression & Anxiety',
      icon: Brain,
      status: 'ready',
      features: ['PHQ-9 Screening', 'GAD-7 Screening', 'Mood Tracking'],
      color: 'purple'
    },
    {
      id: 'vision-hearing',
      title: 'Vision & Hearing Lab',
      description: 'Visual acuity, color blindness, and hearing frequency tests',
      targetCondition: 'Sensory Processing Disorders',
      icon: Ear,
      status: 'ready',
      features: ['Visual Acuity', 'Color Blindness', 'Hearing Test'],
      color: 'indigo'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <GlassNavbar />
      <GovernmentBanner />

      <main className="container mx-auto px-6 py-12 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 mb-12 justify-center glass-pill p-1 bg-white/5 border border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400 rounded-full transition-all">Overview</TabsTrigger>
            <TabsTrigger value="labs" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400 rounded-full transition-all">Labs</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400 rounded-full transition-all">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-12 space-y-16">
            {/* Hero Section */}
            <div className="glass-panel p-12 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="p-4 bg-blue-500/20 rounded-full glass-card animate-pulse-slow">
                    <Brain className="w-12 h-12 text-blue-400" />
                  </div>
                  <div className="p-4 bg-green-500/20 rounded-full glass-card animate-pulse-slow">
                    <Stethoscope className="w-12 h-12 text-green-400" />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-sm">
                  Health Scan
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Privacy-first browser lab bench for comprehensive health screening.
                  All processing happens securely on your device.
                </p>
                <p className="text-lg text-primary/80 font-medium">
                  ABDM Integrated | Government Approved Healthcare Platform
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 flex items-center gap-2 px-4 py-2 text-sm backdrop-blur-md">
                  <Shield className="w-4 h-4" />
                  Privacy-First
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30 flex items-center gap-2 px-4 py-2 text-sm backdrop-blur-md">
                  <Cpu className="w-4 h-4" />
                  On-Device Processing
                </Badge>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30 flex items-center gap-2 px-4 py-2 text-sm backdrop-blur-md">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Insights
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30 flex items-center gap-2 px-4 py-2 text-sm backdrop-blur-md">
                  <Heart className="w-4 h-4" />
                  ABDM Compatible
                </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="glass-panel border-0 hover:scale-105 transition-transform duration-300">
                <CardHeader className="text-center pb-8 border-b border-white/5">
                  <Timer className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-4xl font-bold text-white">10</CardTitle>
                  <CardDescription className="text-lg text-gray-400">Active Labs</CardDescription>
                </CardHeader>
              </Card>
              <Card className="glass-panel border-0 hover:scale-105 transition-transform duration-300">
                <CardHeader className="text-center pb-8 border-b border-white/5">
                  <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <CardTitle className="text-4xl font-bold text-white">Ready</CardTitle>
                  <CardDescription className="text-lg text-gray-400">System Status</CardDescription>
                </CardHeader>
              </Card>
              <Card className="glass-panel border-0 hover:scale-105 transition-transform duration-300">
                <CardHeader className="text-center pb-8 border-b border-white/5">
                  <CheckCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <CardTitle className="text-4xl font-bold text-white">100%</CardTitle>
                  <CardDescription className="text-lg text-gray-400">Secure & Private</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Featured Lab */}
            <Card className="glass-panel border-0 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50"></div>
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-700"></div>

              <CardHeader className="pb-6 relative z-10">
                <CardTitle className="flex items-center gap-3 text-2xl text-white">
                  <Mic className="w-8 h-8 text-green-400" />
                  Featured: Voice & Speech Lab
                </CardTitle>
                <CardDescription className="text-lg leading-relaxed text-gray-300">
                  Start with our most advanced lab - analyze vocal patterns and speech characteristics using cutting-edge signal processing
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Link to="/labs">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg shadow-green-900/20"
                    size="lg"
                  >
                    Begin Voice Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="labs" className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
              {labs.map((lab) => {
                const IconComponent = lab.icon;
                const colorClasses = {
                  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
                  green: 'text-green-400 bg-green-500/10 border-green-500/20',
                  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
                  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
                  indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
                };
                const btnColor = {
                  blue: 'bg-blue-600 hover:bg-blue-700',
                  green: 'bg-green-600 hover:bg-green-700',
                  orange: 'bg-orange-600 hover:bg-orange-700',
                  purple: 'bg-purple-600 hover:bg-purple-700',
                  indigo: 'bg-indigo-600 hover:bg-indigo-700'
                };

                return (
                  <Link to={`/labs/${lab.id}`} key={lab.id}>
                    <Card className="glass-panel border-0 group cursor-pointer hover:scale-[1.02] transition-all duration-300 h-full">
                      <CardHeader className="pb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-2xl ${colorClasses[lab.color as keyof typeof colorClasses]}`}>
                            <IconComponent className="w-8 h-8" />
                          </div>
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-sm px-3 py-1">
                            {lab.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl text-white group-hover:text-primary transition-colors">
                          {lab.title}
                        </CardTitle>
                        <div className="mb-3">
                          <Badge variant="outline" className="text-xs border-white/20 text-gray-300 bg-white/5 font-normal">
                            Target: {lab.targetCondition}
                          </Badge>
                        </div>
                        <CardDescription className="text-lg leading-relaxed text-gray-400">
                          {lab.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {lab.features.map((feature) => (
                              <Badge
                                key={feature}
                                variant="outline"
                                className="text-sm px-3 py-1 border-white/10 text-gray-300 bg-white/5"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            className={`w-full ${btnColor[lab.color as keyof typeof btnColor]} text-white border-0`}
                            size="lg"
                          >
                            Launch Lab
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-12">
            <Card className="glass-panel border-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
              <CardHeader>
                <CardTitle className="text-3xl text-white">Clinical Reports</CardTitle>
                <CardDescription className="text-lg text-gray-400">
                  AI-generated summaries and clinician-ready reports with comprehensive analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16">
                  <div className="bg-blue-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-blue-400" />
                  </div>
                  <p className="text-xl text-gray-300">Complete lab sessions to generate detailed reports</p>
                  <Link to="/dashboard" className="mt-8 inline-block">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                      View Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
