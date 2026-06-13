// TIPOS DEL SISTEMA - Observatorio Inteligente de Eventos y Territorio

export type EventType = 'meeting' | 'incentive' | 'conference' | 'exhibition' | 'sports' | 'cultural' | 'corporate';
export type EventStatus = 'planned' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type EventCategory = 'international' | 'national' | 'regional' | 'local';
export type ImpactDimension = 'economic' | 'touristic' | 'social' | 'media' | 'territorial' | 'academic' | 'legacy';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  region: string;
  config: Record<string, unknown>;
}

export interface Venue {
  id: string;
  tenantId: string;
  name: string;
  type: string;
  capacity: number;
  areaM2: number;
  location: { lat: number; lng: number };
  address: string;
  equipment: Record<string, unknown>;
  rating: number;
}

export interface Event {
  id: string;
  tenantId: string;
  name: string;
  type: EventType;
  category: EventCategory;
  status: EventStatus;
  startDate: string;
  endDate: string;
  venueId: string;
  venueName: string;
  organizerId: string;
  organizerName: string;
  expectedAttendees: number;
  actualAttendees: number;
  budget: number;
  revenue: number;
  economicImpact: number;
  metadata: Record<string, unknown>;
  odsMapping: number[];
  comuna: string;
}

export interface Attendee {
  id: string;
  tenantId: string;
  eventId: string;
  name: string;
  email: string;
  institution: string;
  country: string;
  city: string;
  role: string;
  type: string;
}

export interface KPIDefinition {
  id: string;
  tenantId: string;
  name: string;
  formula: string;
  source: string;
  frequency: string;
  target: number;
  visualizationType: 'number' | 'chart' | 'gauge' | 'trend';
  category: 'strategic' | 'tactical' | 'operational' | 'predictive';
  unit: string;
  description: string;
}

export interface KPIValue {
  id: string;
  kpiId: string;
  period: string;
  value: number;
  targetAchieved: number;
  previousValue?: number;
}

export interface Alert {
  id: string;
  tenantId: string;
  type: 'opportunity' | 'warning' | 'critical' | 'info';
  message: string;
  module: string;
  severity: 'low' | 'medium' | 'high';
  read: boolean;
  createdAt: string;
}

export interface Document {
  id: string;
  tenantId: string;
  title: string;
  author: string;
  type: string;
  category: string;
  fileUrl: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  tenantId: string;
  eventName: string;
  type: EventType;
  source: string;
  probability: number;
  estimatedValue: number;
  estimatedAttendees: number;
  decisionDate: string;
  status: 'prospect' | 'contacted' | 'proposal' | 'negotiation' | 'won' | 'lost';
  comuna: string;
  notes: string;
  createdAt: string;
}

export interface ImpactMeasurement {
  id: string;
  tenantId: string;
  eventId: string;
  dimension: ImpactDimension;
  metric: string;
  value: number;
  currency?: string;
  measuredAt: string;
}

export interface ComunaData {
  name: string;
  eventsCount: number;
  attendees: number;
  economicImpact: number;
  venues: number;
  coordinates: [number, number];
}

export interface BenchmarkData {
  region: string;
  country: string;
  eventsCount: number;
  internationalEvents: number;
  attendees: number;
  satisfaction: number;
  infrastructure: number;
  year: number;
  position: number;
}

export interface Report {
  id: string;
  tenantId: string;
  title: string;
  type: string;
  format: 'pdf' | 'excel' | 'dashboard';
  status: 'generating' | 'completed' | 'error';
  fileUrl?: string;
  generatedBy: string;
  createdAt: string;
}

export interface TimeSeriesData {
  period: string;
  events: number;
  attendees: number;
  economicImpact: number;
  satisfaction: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'director' | 'analyst' | 'operator' | 'viewer';
  avatar?: string;
  permissions: string[];
}
