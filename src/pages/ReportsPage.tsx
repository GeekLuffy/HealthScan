/**
 * Reports Page
 * Displays all past health test reports stored locally
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassNavbar } from '@/components/GlassNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { ChatBot } from '@/components/ChatBot';
import {
  FileText,
  Calendar,
  Filter,
  Download,
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  X,
  ChevronDown,
  ChevronUp,
  MessageCircle
} from 'lucide-react';
import { getAllResults, deleteTestResult } from '../services/healthDataService';
import { HealthTestResult, TestCategory, TestType } from '../types/health';

export default function ReportsPage() {
  const [reports, setReports] = useState<HealthTestResult[]>([]);
  const [filteredReports, setFilteredReports] = useState<HealthTestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | 'all'>('all');
  const [selectedTestType, setSelectedTestType] = useState<TestType | 'all'>('all');
  const [expandedReports, setExpandedReports] = useState<Set<string>>(new Set());
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedReportForChat, setSelectedReportForChat] = useState<HealthTestResult | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchQuery, selectedCategory, selectedTestType]);

  const loadReports = () => {
    try {
      const allReports = getAllResults();
      setReports(allReports);
      setFilteredReports(allReports);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(report =>
        getTestTypeLabel(report.testType).toLowerCase().includes(query) ||
        report.interpretation?.toLowerCase().includes(query) ||
        report.testDate.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(report => report.category === selectedCategory);
    }

    // Filter by test type
    if (selectedTestType !== 'all') {
      filtered = filtered.filter(report => report.testType === selectedTestType);
    }

    setFilteredReports(filtered);
  };

  const getTestTypeLabel = (testType: TestType): string => {
    const labels: Record<TestType, string> = {
      'digit-span': 'Digit Span Test',
      'word-list-recall': 'Word List Recall',
      'saccade': 'Saccade Test',
      'stroop': 'Stroop Test',
      'alzheimers': "Alzheimer's Assessment",
      'parkinsons': "Parkinson's Assessment",
      'epilepsy': 'Epilepsy Assessment',
      'cognitive': 'Cognitive Assessment',
      'voice': 'Voice Analysis',
      'eye': 'Eye Test',
      'motor': 'Motor Function Test',
      'cardiovascular-test': 'Cardiovascular Test',
      'respiratory-test': 'Respiratory Test',
      'mental-health-assessment': 'Mental Health Assessment',
      'vision-test': 'Vision Test',
      'hearing-test': 'Hearing Test',
      'lifestyle-survey': 'Lifestyle Survey',
    };
    return labels[testType] || testType;
  };

  const getCategoryLabel = (category: TestCategory): string => {
    const labels: Record<TestCategory, string> = {
      'neurological': 'Neurological',
      'cardiovascular': 'Cardiovascular',
      'respiratory': 'Respiratory',
      'mental-health': 'Mental Health',
      'vision-hearing': 'Vision & Hearing',
      'lifestyle': 'Lifestyle',
    };
    return labels[category] || category;
  };

  const getRiskBadgeVariant = (risk?: string): "default" | "secondary" | "destructive" | "outline" => {
    if (!risk) return 'outline';
    switch (risk.toLowerCase()) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  const getRiskBadgeColor = (risk?: string): string => {
    if (!risk) return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'high': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700';
      case 'critical': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (duration?: number): string => {
    if (!duration) return 'N/A';
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const toggleExpand = (reportId: string) => {
    const newExpanded = new Set(expandedReports);
    if (newExpanded.has(reportId)) {
      newExpanded.delete(reportId);
    } else {
      newExpanded.add(reportId);
    }
    setExpandedReports(newExpanded);
  };

  const handleDelete = (reportId: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      const success = deleteTestResult(reportId);
      if (success) {
        loadReports();
      }
    }
  };

  const downloadReport = (report: HealthTestResult) => {
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `health-report-${report.testType}-${report.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const categories: TestCategory[] = ['neurological', 'cardiovascular', 'respiratory', 'mental-health', 'vision-hearing', 'lifestyle'];
  const testTypes: TestType[] = Array.from(new Set(reports.map(r => r.testType)));

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <GlassNavbar />
        <div className="flex items-center justify-center min-h-screen pt-24">
          <div className="text-center space-y-4">
            <Activity className="w-12 h-12 animate-spin mx-auto text-blue-500" />
            <p className="text-muted-foreground">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GlassNavbar />

      <div className="pt-24 pb-20 px-4 flex-1">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 glass-panel p-8 border-l-4 border-blue-500">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FileText className="w-10 h-10 text-blue-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              All Reports
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              View and manage all your past health test reports
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20">
                {reports.length} Total Report{reports.length !== 1 ? 's' : ''}
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/20">Locally Stored</Badge>
            </div>
          </div>

          {/* Filters and Search */}
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Filter className="w-5 h-5 text-blue-500" />
                Filter & Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reports by test name, date, or interpretation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-foreground placeholder-muted-foreground"
                />
              </div>

              {/* Category and Type Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as TestCategory | 'all')}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-foreground [&>option]:bg-gray-900 [&>option]:text-foreground"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {getCategoryLabel(cat)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Test Type
                  </label>
                  <select
                    value={selectedTestType}
                    onChange={(e) => setSelectedTestType(e.target.value as TestType | 'all')}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-foreground [&>option]:bg-gray-900 [&>option]:text-foreground"
                  >
                    <option value="all">All Test Types</option>
                    {testTypes.map(type => (
                      <option key={type} value={type}>
                        {getTestTypeLabel(type)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'all' || selectedTestType !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedTestType('all');
                  }}
                  className="w-full bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Reports List */}
          {filteredReports.length === 0 ? (
            <Card className="glass-panel">
              <CardContent className="py-12 text-center">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {reports.length === 0 ? 'No Reports Yet' : 'No Reports Match Your Filters'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {reports.length === 0
                    ? 'Start by taking your first health assessment'
                    : 'Try adjusting your search or filter criteria'}
                </p>
                {reports.length === 0 && (
                  <Link to="/labs">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      Take Your First Test
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredReports.length} of {reports.length} report{reports.length !== 1 ? 's' : ''}
              </div>
              {filteredReports.map((report) => {
                const isExpanded = expandedReports.has(report.id);
                return (
                  <Card
                    key={report.id}
                    className="glass-panel border-l-4 border-blue-500"
                  >
                    <CardHeader className="cursor-pointer" onClick={() => toggleExpand(report.id)}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg text-foreground">
                              {getTestTypeLabel(report.testType)}
                            </CardTitle>
                            <Badge className={getRiskBadgeColor(report.riskLevel)}>
                              {report.riskLevel || 'N/A'}
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center gap-4 mt-2 text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(report.testDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatDuration(report.duration)}
                            </span>
                            <Badge variant="outline" className="text-xs border-white/10 text-muted-foreground bg-white/5">
                              {getCategoryLabel(report.category)}
                            </Badge>
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(report.id);
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="space-y-4 pt-0">
                        {/* Score and Performance */}
                        {(report.score !== undefined || report.scorePercentage !== undefined) && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                            {report.score !== undefined && (
                              <div>
                                <div className="text-sm text-muted-foreground mb-1">Score</div>
                                <div className="text-2xl font-bold text-foreground">
                                  {report.score}
                                  {report.maxScore && ` / ${report.maxScore}`}
                                </div>
                              </div>
                            )}
                            {report.scorePercentage !== undefined && (
                              <div>
                                <div className="text-sm text-muted-foreground mb-1">Performance</div>
                                <div className="text-2xl font-bold text-foreground">
                                  {Math.round(report.scorePercentage)}%
                                </div>
                                <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                                  <div
                                    className="h-full bg-blue-500 transition-all"
                                    style={{ width: `${report.scorePercentage}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            {report.status && (
                              <div>
                                <div className="text-sm text-muted-foreground mb-1">Status</div>
                                <Badge
                                  variant={report.status === 'final' ? 'default' : 'secondary'}
                                  className={`text-sm ${report.status === 'final'
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-white/10 text-muted-foreground'
                                    }`}
                                >
                                  {report.status}
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Interpretation */}
                        {report.interpretation && (
                          <div className="p-4 bg-blue-500/10 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-start gap-2 mb-2">
                              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                              <h4 className="font-semibold text-foreground">Interpretation</h4>
                            </div>
                            <p className="text-muted-foreground">{report.interpretation}</p>
                          </div>
                        )}

                        {/* Recommendations */}
                        {report.recommendations && report.recommendations.length > 0 && (
                          <div className="p-4 bg-green-500/10 rounded-lg border-l-4 border-green-500">
                            <div className="flex items-start gap-2 mb-2">
                              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                              <h4 className="font-semibold text-foreground">Recommendations</h4>
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {report.recommendations.map((rec, idx) => (
                                <li key={idx}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Raw Data (Collapsible) */}
                        <details className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <summary className="cursor-pointer font-medium text-foreground mb-2">
                            View Raw Data
                          </summary>
                          <pre className="mt-2 p-3 bg-black/50 rounded text-xs overflow-x-auto border border-white/10 text-muted-foreground">
                            {JSON.stringify(report.data, null, 2)}
                          </pre>
                        </details>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => {
                              setSelectedReportForChat(report);
                              setChatOpen(true);
                            }}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Chat about Report
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadReport(report)}
                            className="border-white/10 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(report.id)}
                            className="border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <SiteFooter />

      {/* ChatBot with Report Context */}
      <ChatBot
        isOpen={chatOpen}
        onClose={() => {
          setChatOpen(false);
          setSelectedReportForChat(null);
        }}
        reportContext={selectedReportForChat || undefined}
      />
    </div>
  );
}

