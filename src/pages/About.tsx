import React from 'react';
import { GlassNavbar } from '@/components/GlassNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Linkedin, Github } from 'lucide-react';
import {
  Brain, Heart, Users, Award, Lightbulb, Shield, Cpu, Smartphone, Zap, Target, Activity, Stethoscope,
  AlertTriangle, Search, Mic, Eye, Ear, CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const About: React.FC = () => {

  const values = [
    {
      icon: Smartphone,
      title: "Hardware Innovation",
      description: "Developing professional-grade medical sensors integrated with Raspberry Pi Zero processing for comprehensive neurological monitoring.",
      color: "blue"
    },
    {
      icon: Stethoscope,
      title: "Medical Precision",
      description: "Every sensor and algorithm is designed with medical accuracy in mind, targeting early detection of neurological conditions.",
      color: "green"
    },
    {
      icon: Activity,
      title: "Comprehensive Monitoring",
      description: "Six medical-grade sensors working in harmony - Heart Rate Sensor, EMG, motion tracking, temperature, pulse oximetry, and voice analysis.",
      color: "orange"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "8-10 hour battery life with continuous real-time analysis and intelligent power management for all-day monitoring.",
      color: "purple"
    },
    {
      icon: Target,
      title: "Early Detection Focus",
      description: "Specialized AI algorithms for identifying early-stage indicators of Parkinson's, Alzheimer's, and epilepsy.",
      color: "cyan"
    },
    {
      icon: Users,
      title: "Primary Care Integration",
      description: "Designed for seamless integration into primary healthcare workflows with secure data transmission and professional reporting.",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'border-blue-500 bg-blue-500/10 text-blue-400',
      green: 'border-green-500 bg-green-500/10 text-green-400',
      orange: 'border-orange-500 bg-orange-500/10 text-orange-400',
      purple: 'border-purple-500 bg-purple-500/10 text-purple-400',
      cyan: 'border-cyan-500 bg-cyan-500/10 text-cyan-400',
      indigo: 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GlassNavbar />

      <div className="pt-24 pb-20 px-4 flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 glass-panel p-8 border-l-4 border-blue-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Activity className="w-64 h-64 text-blue-500" />
            </div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                About <span className="text-blue-500">Health Scan</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We're pioneering the future of neurological healthcare by developing the <strong className="text-foreground">HealthScan device</strong> -
                a comprehensive medical-grade hardware platform that combines advanced AI with professional sensor technology
                for early detection and monitoring of neurological conditions.
              </p>
              <div className="flex justify-center gap-2 mt-6">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20">ABDM Integrated</Badge>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/20">Government Approved</Badge>
              </div>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">India's Healthcare Crisis</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* The Problem */}
              <Card className="glass-panel border-l-4 border-red-500 hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    The Problem
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "60% rural population - no specialist access",
                      "Parkinson's detected 5-7 years late (70% brain damage)",
                      "Alzheimer's cases doubling every 5 years",
                      "1 neurologist per 100,000 people",
                      "₹2,000-5,000 per screening + travel costs",
                      "No comprehensive health tracking tools"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Root Causes */}
              <Card className="glass-panel border-l-4 border-orange-500 hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Search className="w-5 h-5" />
                    Root Causes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Geographic barriers (travel to cities)",
                      "Economic barriers (expensive consultations)",
                      "Awareness gap (symptoms ignored)",
                      "Fragmented healthcare (multiple visits)",
                      "Data silos (reports not accessible)"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 text-center">
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-lg px-4 py-2 mt-4">
                50+ Million Indians Need Accessible Health Screening
              </Badge>
            </div>
          </div>

          {/* Solution Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Solution: HealthScan</h2>
            <Card className="glass-panel border-t-4 border-blue-500">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[
                    { icon: Activity, label: "Motor & Tremor Lab", desc: "Parkinson's screening (91% accuracy)", color: "text-blue-400" },
                    { icon: Mic, label: "Voice & Speech Lab", desc: "Voice pattern analysis (89% accuracy)", color: "text-purple-400" },
                    { icon: Eye, label: "Eye & Cognition Lab", desc: "Alzheimer's screening (87% accuracy)", color: "text-green-400" },
                    { icon: Heart, label: "Cardiovascular Lab", desc: "Heart health monitoring (94% accuracy)", color: "text-red-400" },
                    { icon: Brain, label: "Mental Health Lab", desc: "Depression/anxiety screening (95% accuracy)", color: "text-indigo-400" },
                    { icon: Ear, label: "Vision & Hearing Lab", desc: "Sensory health assessment", color: "text-orange-400" },
                  ].map((lab, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <lab.icon className={`w-5 h-5 shrink-0 ${lab.color}`} />
                      <div>
                        <div className="font-semibold text-foreground text-sm">{lab.label}</div>
                        <div className="text-xs text-muted-foreground">{lab.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  {[
                    "Diabetes Management with AI Meal Planner",
                    "Blood Pressure Tracking with Smart Alerts",
                    "Google Fit Smartwatch Integration",
                    "ABDM/EHR Integration (Government Approved)"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm font-medium text-blue-300">
                    100% Browser-Based | No Installation | Powered by Google Technologies
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className={`glass-panel hover:bg-white/5 transition-all duration-300 border-l-4 ${getColorClasses(value.color)}`}>
                    <CardHeader>
                      <div className={`p-3 rounded-lg w-fit mb-4 ${getColorClasses(value.color)} bg-opacity-20`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl text-foreground">
                        {value.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Team</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Owais naeem */}
                <Card className="glass-panel border-l-4 border-blue-500 overflow-hidden flex flex-col">
                  <CardHeader className="text-center bg-blue-500/5 pb-8">
                    <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-blue-500/20 shadow-lg">
                      <AvatarImage src="/owais.png" alt="Owais Naeem" />
                      <AvatarFallback className="bg-blue-500/20 text-blue-400">ON</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl font-bold text-foreground">
                      Owais Naeem
                    </CardTitle>
                    <p className="text-xl text-blue-400 font-medium mt-2">AI Architect & Backend Lead</p>
                  </CardHeader>
                  <CardContent className="mt-6 text-lg text-muted-foreground space-y-8 text-center flex-1">
                    <p>
                      Spearheading the core intelligence of HealthScan. Owais creates the custom neurological models and robust backend infrastructure that makes real-time analysis possible.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2">
                      {["AI/ML Models", "Python", "API Development", "Authentication", "Cloud Architecture", "Research"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-center gap-6 pt-4">
                      <a href="https://github.com/Geekluffy" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-400 transition-colors transform hover:scale-110">
                        <Github className="w-7 h-7" />
                      </a>
                      <a href="https://linkedin.com/in/mohammad-owais-naeem" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-400 transition-colors transform hover:scale-110">
                        <Linkedin className="w-7 h-7" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Himanshu Rathore */}
                <Card className="glass-panel border-l-4 border-green-500 overflow-hidden flex flex-col">
                  <CardHeader className="text-center bg-green-500/5 pb-8">
                    <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-green-500/20 shadow-lg">
                      <AvatarImage src="/himanshu.png" alt="Himanshu Rathore" />
                      <AvatarFallback className="bg-green-500/20 text-green-400">HR</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl font-bold text-foreground">
                      Himanshu Rathore
                    </CardTitle>
                    <p className="text-xl text-green-400 font-medium mt-2">Frontend Lead & UX/IoT Designer</p>
                  </CardHeader>
                  <CardContent className="mt-6 text-lg text-muted-foreground space-y-8 text-center flex-1">
                    <p>
                      Crafting the user experience that makes complex medical data accessible. Himanshu builds the responsive interfaces and manages the IoT device connectivity flow.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2">
                      {["Frontend (React)", "UI/UX Design", "IoT Integration", "Data Visualization", "WebSockets", "User Research"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-center gap-6 pt-4">
                      <a href="https://github.com/himanshu-2l" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-green-400 transition-colors transform hover:scale-110">
                        <Github className="w-7 h-7" />
                      </a>
                      <a href="https://www.linkedin.com/in/himanshu-rathore21/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-green-400 transition-colors transform hover:scale-110">
                        <Linkedin className="w-7 h-7" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default About;
