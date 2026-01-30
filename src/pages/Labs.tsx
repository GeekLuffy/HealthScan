import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassNavbar } from '@/components/GlassNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Activity, Eye, Mic, ArrowRight, Stethoscope, Shield, Heart, Brain, Ear } from 'lucide-react';

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
	},
];

const LabsPage = () => {
	const location = useLocation();
	const isLabDetail = location.pathname.split('/').length > 2;

	if (isLabDetail) {
		return (
			<div className="min-h-screen flex flex-col">
				<GlassNavbar showBack />
				<main className="container mx-auto px-4 py-8 pt-24">
					<Outlet />
				</main>
				<SiteFooter />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col">
			<GlassNavbar />
			<main className="container mx-auto px-6 py-12 pt-24 flex-1">
				<div className="text-center mb-12 glass-panel p-8 relative overflow-hidden group">
					<div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
					<div className="flex items-center justify-center gap-3 mb-4">
						<Stethoscope className="w-10 h-10 text-primary" />
						<Shield className="w-10 h-10 text-green-500" />
					</div>
					<h1 className="text-5xl font-bold text-foreground">
						Health Scan Bench
					</h1>
					<p className="text-xl text-muted-foreground mt-4">Select a lab to begin your session.</p>
					<div className="flex justify-center gap-2 mt-4">
						<Badge className="bg-primary/20 text-primary border-primary/20">ABDM Integrated</Badge>
						<Badge className="bg-green-500/20 text-green-500 border-green-500/20">Government Approved</Badge>
					</div>
				</div>
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
											<div className={`p-3 rounded-2xl ${colorClasses[lab.color as keyof typeof colorClasses] || colorClasses.blue}`}>
												<IconComponent className="w-10 h-10" />
											</div>
											<Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-sm px-3 py-1">
												{lab.status}
											</Badge>
										</div>
										<CardTitle className="group-hover:text-primary transition-colors text-2xl text-foreground">
											{lab.title}
										</CardTitle>
										<div className="mb-3">
											<Badge variant="outline" className="text-xs border-white/20 text-muted-foreground bg-white/5 font-normal">
												Target: {lab.targetCondition}
											</Badge>
										</div>
										<CardDescription className="text-lg leading-relaxed text-muted-foreground">
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
												className={`w-full ${btnColor[lab.color as keyof typeof btnColor] || btnColor.blue} text-white border-0`}
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
			</main>
			<SiteFooter />
		</div>
	);
};

export default LabsPage;
