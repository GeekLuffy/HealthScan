/**
 * AI Insulin + Medicine Reminder Component
 * Smart reminders with dose guidance
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pill,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  Bell,
  Activity,
} from 'lucide-react';
import {
  saveMedication,
  getAllMedications,
  deleteMedication,
  getUpcomingReminders,
  markReminderTaken,
  getDoseGuidance,
  checkReminders,
  Medication,
  Reminder,
  DoseGuidance,
  getAdherenceStats,
  AdherenceStats,
} from '@/services/insulinReminderService';
import { format, parseISO } from 'date-fns';
import { getAllGlucoseReadings } from '@/services/glucoseService';

export const InsulinReminder: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddMedication, setShowAddMedication] = useState(false);

  // Add medication form
  const [medName, setMedName] = useState('');
  const [medType, setMedType] = useState<'insulin' | 'oral' | 'other'>('oral');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'twice-daily' | 'before-meals' | 'after-meals' | 'as-needed'>('daily');
  const [times, setTimes] = useState<string[]>(['08:00']);

  useEffect(() => {
    loadMedications();
    loadReminders();

    // Check reminders every minute
    const interval = setInterval(() => {
      loadReminders();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadMedications = () => {
    const meds = getAllMedications();
    setMedications(meds);
  };

  const loadReminders = () => {
    const glucoseReadings = getAllGlucoseReadings();
    const currentGlucose = glucoseReadings[0]?.fasting || glucoseReadings[0]?.postMeal;

    const upcoming = getUpcomingReminders(24);
    const checkedReminders = checkReminders(currentGlucose);
    setReminders(checkedReminders.length > 0 ? checkedReminders : upcoming);
  };

  const handleAddMedication = () => {
    if (!medName || !dosage || times.length === 0) {
      alert('Please fill all required fields');
      return;
    }

    const medication: Omit<Medication, 'id'> = {
      name: medName,
      type: medType,
      dosage,
      frequency,
      times,
    };

    saveMedication(medication);
    loadMedications();
    loadReminders();

    // Reset form
    setMedName('');
    setDosage('');
    setTimes(['08:00']);
    setShowAddMedication(false);
  };

  const handleTakeMedication = (reminderId: string) => {
    const glucoseReadings = getAllGlucoseReadings();
    const currentGlucose = glucoseReadings[0]?.fasting || glucoseReadings[0]?.postMeal;

    markReminderTaken(reminderId, currentGlucose);
    loadReminders();
  };

  const getDoseGuidanceForReminder = (reminder: Reminder): DoseGuidance | null => {
    if (!reminder.glucoseLevel) return null;

    return getDoseGuidance(reminder.medicationId, reminder.glucoseLevel);
  };

  return (
    <Card className="glass-panel border-0 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/50"></div>
      <CardHeader className="bg-white/5 border-b border-white/5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-purple-400" />
            <CardTitle className="text-lg text-foreground">
              AI Medicine & Insulin Reminder
            </CardTitle>
          </div>
          <Button
            onClick={() => setShowAddMedication(true)}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Medication
          </Button>
        </div>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          Smart reminders with AI-powered dose guidance based on glucose levels
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {/* Add Medication Dialog */}
        {showAddMedication && (
          <Card className="glass-panel text-foreground border border-purple-500/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-foreground">Add Medication</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddMedication(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Medication Name *
                  </label>
                  <Input
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    placeholder="e.g., Metformin, Insulin"
                    className="bg-black/20 text-foreground placeholder:text-muted-foreground border-white/10 focus:border-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Type *
                    </label>
                    <Select value={medType} onValueChange={(v: any) => setMedType(v)}>
                      <SelectTrigger className="bg-black/20 text-foreground border-white/10 focus:border-purple-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="insulin">Insulin</SelectItem>
                        <SelectItem value="oral">Oral Medication</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Dosage *
                    </label>
                    <Input
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      placeholder="e.g., 500mg, 10 units"
                      className="bg-black/20 text-foreground placeholder:text-muted-foreground border-white/10 focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Frequency *
                  </label>
                  <Select value={frequency} onValueChange={(v: any) => setFrequency(v)}>
                    <SelectTrigger className="bg-black/20 text-foreground border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Once Daily</SelectItem>
                      <SelectItem value="twice-daily">Twice Daily</SelectItem>
                      <SelectItem value="before-meals">Before Meals</SelectItem>
                      <SelectItem value="after-meals">After Meals</SelectItem>
                      <SelectItem value="as-needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Times (HH:mm, comma-separated) *
                  </label>
                  <Input
                    value={times.join(', ')}
                    onChange={(e) => setTimes(e.target.value.split(',').map(t => t.trim()))}
                    placeholder="08:00, 20:00"
                    className="bg-black/20 text-foreground placeholder:text-muted-foreground border-white/10 focus:border-purple-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddMedication}
                    className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
                  >
                    Save Medication
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddMedication(false)}
                    className="border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Reminders */}
        {reminders.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Bell className="w-5 h-5 text-purple-400" />
              Upcoming Reminders (Next 24 Hours)
            </div>
            {reminders.map((reminder) => {
              const medication = medications.find(m => m.id === reminder.medicationId);
              const guidance = getDoseGuidanceForReminder(reminder);

              return (
                <Alert
                  key={reminder.id}
                  className={
                    reminder.alertLevel === 'danger'
                      ? 'border-red-500/50 bg-red-500/10'
                      : reminder.alertLevel === 'warning'
                        ? 'border-orange-500/50 bg-orange-500/10'
                        : 'border-blue-500/50 bg-blue-500/10'
                  }
                >
                  <Clock className="h-4 w-4" />
                  <AlertTitle className="font-semibold text-foreground">
                    {medication?.name} - {format(parseISO(reminder.scheduledTime), 'HH:mm')}
                  </AlertTitle>
                  <AlertDescription className="mt-2 space-y-2">
                    <div className="text-sm text-gray-300">
                      <strong>Dosage:</strong> {medication?.dosage}
                    </div>
                    {guidance && (
                      <div className="text-sm font-medium text-foreground">
                        {guidance.message}
                      </div>
                    )}
                    {reminder.recommendation && (
                      <div className="text-sm text-gray-300">
                        {reminder.recommendation}
                      </div>
                    )}
                    {guidance && guidance.suggestedDosage && (
                      <div className="text-sm text-gray-300">
                        <strong>Suggested:</strong> {guidance.suggestedDosage}
                      </div>
                    )}
                    <Button
                      onClick={() => handleTakeMedication(reminder.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white mt-2"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Taken
                    </Button>
                  </AlertDescription>
                </Alert>
              );
            })}
          </div>
        )}

        {/* Medications List */}
        {medications.length > 0 && (
          <div className="space-y-3">
            <div className="text-lg font-semibold text-foreground">
              Your Medications
            </div>
            {medications.map((medication) => {
              const stats = getAdherenceStats(medication.id, 30);

              return (
                <Card key={medication.id} className="glass-panel border-0 bg-white/5">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-foreground">
                            {medication.name}
                          </div>
                          <Badge className={
                            medication.type === 'insulin'
                              ? 'bg-red-500/20 text-red-200 border-red-500/20'
                              : 'bg-blue-500/20 text-blue-200 border-blue-500/20'
                          }>
                            {medication.type}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 font-medium">
                          {medication.dosage} • {medication.frequency} • Times: {medication.times.join(', ')}
                        </div>
                        {stats.totalReminders > 0 && (
                          <div className="text-xs text-muted-foreground mt-2 font-medium">
                            Adherence: {stats.adherenceRate}% ({stats.taken}/{stats.totalReminders} taken)
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (window.confirm('Delete this medication?')) {
                            deleteMedication(medication.id);
                            loadMedications();
                            loadReminders();
                          }
                        }}
                        className="text-red-600 dark:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {medications.length === 0 && (
          <div className="text-center py-8 space-y-4">
            <Pill className="w-16 h-16 mx-auto text-muted-foreground opacity-50" />
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                No medications added yet
              </h3>
              <p className="text-muted-foreground mb-4 font-medium">
                Add your medications to get smart reminders with AI dose guidance
              </p>
              <Button
                onClick={() => setShowAddMedication(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Medication
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsulinReminder;

