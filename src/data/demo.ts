// DATOS DEMO - Región de Los Ríos, Chile
// Sistema de Inteligencia Territorial para Eventos MICE

import type {
  Event, Venue, KPIDefinition, KPIValue, Alert, Document,
  Opportunity, ImpactMeasurement, ComunaData, BenchmarkData,
  Report, TimeSeriesData, UserProfile
} from '@/types';

export const tenant = {
  id: 'los-rios-001',
  name: 'Los Ríos Convention Bureau',
  slug: 'los-rios',
  region: 'Región de Los Ríos, Chile',
  config: { currency: 'CLP', language: 'es', timezone: 'America/Santiago' }
};

export const currentUser: UserProfile = {
  id: 'user-001',
  name: 'Directora MICE',
  email: 'directora@losriosconventionbureau.cl',
  role: 'director',
  permissions: ['events.read', 'events.write', 'dashboard.read', 'reports.read', 'alerts.read', 'settings.read']
};

// === COMUNAS DE LA REGIÓN DE LOS RÍOS ===
export const comunas: ComunaData[] = [
  { name: 'Valdivia', eventsCount: 89, attendees: 45200, economicImpact: 3850000000, venues: 24, coordinates: [-39.8196, -73.2452] },
  { name: 'Panguipulli', eventsCount: 34, attendees: 12800, economicImpact: 980000000, venues: 12, coordinates: [-39.6436, -72.3326] },
  { name: 'La Unión', eventsCount: 28, attendees: 9500, economicImpact: 720000000, venues: 8, coordinates: [-40.2931, -73.0817] },
  { name: 'Río Bueno', eventsCount: 22, attendees: 7100, economicImpact: 580000000, venues: 7, coordinates: [-40.3167, -72.9667] },
  { name: 'Los Lagos', eventsCount: 18, attendees: 5400, economicImpact: 420000000, venues: 6, coordinates: [-39.8500, -72.8333] },
  { name: 'Lanco', eventsCount: 15, attendees: 4200, economicImpact: 310000000, venues: 5, coordinates: [-39.4500, -72.7833] },
  { name: 'Máfil', eventsCount: 12, attendees: 3600, economicImpact: 265000000, venues: 4, coordinates: [-39.6500, -72.9500] },
  { name: 'Mariquina', eventsCount: 10, attendees: 2900, economicImpact: 210000000, venues: 4, coordinates: [-39.5167, -72.9667] },
  { name: 'Paillaco', eventsCount: 14, attendees: 4100, economicImpact: 295000000, venues: 5, coordinates: [-40.0667, -72.8833] },
  { name: 'Corral', eventsCount: 8, attendees: 2200, economicImpact: 165000000, venues: 3, coordinates: [-39.8833, -73.4333] },
  { name: 'Futrono', eventsCount: 11, attendees: 3400, economicImpact: 250000000, venues: 4, coordinates: [-40.1167, -72.4000] },
  { name: 'Lago Ranco', eventsCount: 9, attendees: 2800, economicImpact: 205000000, venues: 3, coordinates: [-40.3167, -72.5000] },
];

// === EVENTOS MICE 2024-2025 ===
export const events: Event[] = [
  { id: 'evt-001', tenantId: 'los-rios-001', name: 'Congreso Internacional de Ciencias del Mar', type: 'conference', category: 'international', status: 'completed', startDate: '2025-01-15', endDate: '2025-01-19', venueId: 'ven-001', venueName: 'Hotel Dreams Valdivia', organizerId: 'org-001', organizerName: 'Universidad Austral de Chile', expectedAttendees: 450, actualAttendees: 487, budget: 120000000, revenue: 145000000, economicImpact: 380000000, metadata: { theme: 'Oceanografía y Cambio Climático' }, odsMapping: [13, 14], comuna: 'Valdivia' },
  { id: 'evt-002', tenantId: 'los-rios-001', name: 'Encuentro Nacional de Gestión Turística', type: 'meeting', category: 'national', status: 'completed', startDate: '2025-02-20', endDate: '2025-02-22', venueId: 'ven-002', venueName: 'Centro de Eventos Casino Dreams', organizerId: 'org-002', organizerName: 'SERNATUR Los Ríos', expectedAttendees: 320, actualAttendees: 298, budget: 45000000, revenue: 52000000, economicImpact: 142000000, metadata: { theme: 'Turismo Sustentable' }, odsMapping: [8, 12], comuna: 'Valdivia' },
  { id: 'evt-003', tenantId: 'los-rios-001', name: 'Feria ExpoMICE Los Ríos 2025', type: 'exhibition', category: 'regional', status: 'completed', startDate: '2025-03-10', endDate: '2025-03-13', venueId: 'ven-003', venueName: 'Centro de Convenciones Campus Isla Teja', organizerId: 'org-003', organizerName: 'Los Ríos Convention Bureau', expectedAttendees: 1200, actualAttendees: 1350, budget: 85000000, revenue: 98000000, economicImpact: 265000000, metadata: { exhibitors: 45 }, odsMapping: [8, 9, 17], comuna: 'Valdivia' },
  { id: 'evt-004', tenantId: 'los-rios-001', name: 'Simposio de Inteligencia Artificial Aplicada', type: 'conference', category: 'international', status: 'completed', startDate: '2025-04-05', endDate: '2025-04-08', venueId: 'ven-001', venueName: 'Hotel Dreams Valdivia', organizerId: 'org-001', organizerName: 'Universidad Austral de Chile', expectedAttendees: 280, actualAttendees: 312, budget: 65000000, revenue: 78000000, economicImpact: 195000000, metadata: { theme: 'IA y Desarrollo Regional' }, odsMapping: [9, 17], comuna: 'Valdivia' },
  { id: 'evt-005', tenantId: 'los-rios-001', name: 'Retiro Ejecutivo Líderes del Sur', type: 'incentive', category: 'national', status: 'completed', startDate: '2025-04-22', endDate: '2025-04-26', venueId: 'ven-004', venueName: 'Termas Geométricas', organizerId: 'org-004', organizerName: 'CORP Los Ríos', expectedAttendees: 85, actualAttendees: 92, budget: 95000000, revenue: 110000000, economicImpact: 165000000, metadata: { premium: true }, odsMapping: [8], comuna: 'Panguipulli' },
  { id: 'evt-006', tenantId: 'los-rios-001', name: 'Maratón Internacional Valdivia 2025', type: 'sports', category: 'international', status: 'completed', startDate: '2025-05-11', endDate: '2025-05-11', venueId: 'ven-005', venueName: 'Costanera de Valdivia', organizerId: 'org-005', organizerName: 'Municipalidad de Valdivia', expectedAttendees: 3500, actualAttendees: 4200, budget: 18000000, revenue: 22000000, economicImpact: 385000000, metadata: { participants: 4200, countries: 8 }, odsMapping: [3], comuna: 'Valdivia' },
  { id: 'evt-007', tenantId: 'los-rios-001', name: 'Congreso Chileno de Gestión Pública', type: 'conference', category: 'national', status: 'in_progress', startDate: '2025-06-15', endDate: '2025-06-18', venueId: 'ven-003', venueName: 'Centro de Convenciones Campus Isla Teja', organizerId: 'org-006', organizerName: 'Subdere Los Ríos', expectedAttendees: 550, actualAttendees: 0, budget: 38000000, revenue: 45000000, economicImpact: 0, metadata: { theme: 'Innovación Pública' }, odsMapping: [16, 17], comuna: 'Valdivia' },
  { id: 'evt-008', tenantId: 'los-rios-001', name: 'Foro de Inversión y Negocios Los Ríos', type: 'meeting', category: 'regional', status: 'confirmed', startDate: '2025-07-08', endDate: '2025-07-09', venueId: 'ven-006', venueName: 'Parque Científico Teja', organizerId: 'org-003', organizerName: 'Los Ríos Convention Bureau', expectedAttendees: 200, actualAttendees: 0, budget: 28000000, revenue: 0, economicImpact: 0, metadata: { investors: 25 }, odsMapping: [8, 9], comuna: 'Valdivia' },
  { id: 'evt-009', tenantId: 'los-rios-001', name: 'Festival Cultural Niebla 2025', type: 'cultural', category: 'regional', status: 'confirmed', startDate: '2025-08-01', endDate: '2025-08-03', venueId: 'ven-007', venueName: 'Fuerte de Niebla', organizerId: 'org-007', organizerName: 'Corporación Cultural Niebla', expectedAttendees: 5000, actualAttendees: 0, budget: 15000000, revenue: 0, economicImpact: 0, metadata: { artists: 15 }, odsMapping: [4, 11], comuna: 'Valdivia' },
  { id: 'evt-010', tenantId: 'los-rios-001', name: 'Encuentro Latinoamericano de Educación Ambiental', type: 'conference', category: 'international', status: 'planned', startDate: '2025-09-10', endDate: '2025-09-14', venueId: 'ven-003', venueName: 'Centro de Convenciones Campus Isla Teja', organizerId: 'org-001', organizerName: 'Universidad Austral de Chile', expectedAttendees: 380, actualAttendees: 0, budget: 72000000, revenue: 0, economicImpact: 0, metadata: { theme: 'Educación y Sustentabilidad' }, odsMapping: [4, 13, 15], comuna: 'Valdivia' },
  { id: 'evt-011', tenantId: 'los-rios-001', name: 'Convención Anual de la Industria Maderera', type: 'conference', category: 'national', status: 'confirmed', startDate: '2025-10-05', endDate: '2025-10-08', venueId: 'ven-008', venueName: 'Centro de Eventos La Unión', organizerId: 'org-008', organizerName: 'CMPC Maderas', expectedAttendees: 420, actualAttendees: 0, budget: 55000000, revenue: 0, economicImpact: 0, metadata: { theme: 'Industria 4.0' }, odsMapping: [9, 12], comuna: 'La Unión' },
  { id: 'evt-012', tenantId: 'los-rios-001', name: 'Workshop de Innovación en Salud Rural', type: 'meeting', category: 'regional', status: 'planned', startDate: '2025-11-12', endDate: '2025-11-14', venueId: 'ven-009', venueName: 'Hospital Base Valdivia', organizerId: 'org-009', organizerName: 'Servicio de Salud Valdivia', expectedAttendees: 150, actualAttendees: 0, budget: 22000000, revenue: 0, economicImpact: 0, metadata: { theme: 'Telemedicina' }, odsMapping: [3], comuna: 'Valdivia' },
  { id: 'evt-013', tenantId: 'los-rios-001', name: 'Torneo Internacional de Kayak Panguipulli', type: 'sports', category: 'international', status: 'confirmed', startDate: '2025-11-20', endDate: '2025-11-23', venueId: 'ven-010', venueName: 'Lago Panguipulli', organizerId: 'org-010', organizerName: 'Club Náutico Panguipulli', expectedAttendees: 800, actualAttendees: 0, budget: 18000000, revenue: 0, economicImpact: 0, metadata: { countries: 12 }, odsMapping: [3], comuna: 'Panguipulli' },
  { id: 'evt-014', tenantId: 'los-rios-001', name: 'Cumbre de Energías Renovables del Sur', type: 'conference', category: 'national', status: 'planned', startDate: '2025-12-01', endDate: '2025-12-04', venueId: 'ven-003', venueName: 'Centro de Convenciones Campus Isla Teja', organizerId: 'org-011', organizerName: 'Asociación de Energías Renovables', expectedAttendees: 290, actualAttendees: 0, budget: 48000000, revenue: 0, economicImpact: 0, metadata: { theme: 'Hidrogeno Verde' }, odsMapping: [7, 13], comuna: 'Valdivia' },
  { id: 'evt-015', tenantId: 'los-rios-001', name: 'Congreso Mundial de Silvicultura', type: 'conference', category: 'international', status: 'planned', startDate: '2026-01-18', endDate: '2026-01-24', venueId: 'ven-003', venueName: 'Centro de Convenciones Campus Isla Teja', organizerId: 'org-012', organizerName: 'IUFRO International', expectedAttendees: 650, actualAttendees: 0, budget: 140000000, revenue: 0, economicImpact: 0, metadata: { theme: 'Bosques y Cambio Climático' }, odsMapping: [13, 15], comuna: 'Valdivia' },
  { id: 'evt-016', tenantId: 'los-rios-001', name: 'Encuentro de Turismo de Aventura', type: 'meeting', category: 'regional', status: 'planned', startDate: '2026-02-14', endDate: '2026-02-16', venueId: 'ven-004', venueName: 'Termas Geométricas', organizerId: 'org-003', organizerName: 'Los Ríos Convention Bureau', expectedAttendees: 180, actualAttendees: 0, budget: 25000000, revenue: 0, economicImpact: 0, metadata: { theme: 'Ecoturismo' }, odsMapping: [8, 12, 15], comuna: 'Panguipulli' },
  { id: 'evt-017', tenantId: 'los-rios-001', name: 'Feria Gastronómica del Sur', type: 'cultural', category: 'local', status: 'planned', startDate: '2026-03-05', endDate: '2026-03-08', venueId: 'ven-005', venueName: 'Costanera de Valdivia', organizerId: 'org-005', organizerName: 'Municipalidad de Valdivia', expectedAttendees: 8000, actualAttendees: 0, budget: 12000000, revenue: 0, economicImpact: 0, metadata: { exhibitors: 60 }, odsMapping: [2, 8], comuna: 'Valdivia' },
  { id: 'evt-018', tenantId: 'los-rios-001', name: 'Simposio de Acuicultura Sustentable', type: 'conference', category: 'international', status: 'planned', startDate: '2026-04-10', endDate: '2026-04-13', venueId: 'ven-001', venueName: 'Hotel Dreams Valdivia', organizerId: 'org-001', organizerName: 'Universidad Austral de Chile', expectedAttendees: 340, actualAttendees: 0, budget: 58000000, revenue: 0, economicImpact: 0, metadata: { theme: 'Salmonicultura 4.0' }, odsMapping: [2, 14], comuna: 'Valdivia' },
  { id: 'evt-019', tenantId: 'los-rios-001', name: 'Convención de Municipalidades de Chile', type: 'meeting', category: 'national', status: 'planned', startDate: '2026-05-15', endDate: '2026-05-18', venueId: 'ven-011', venueName: 'Hotel Marina Río Bueno', organizerId: 'org-013', organizerName: 'ACHM Chile', expectedAttendees: 500, actualAttendees: 0, budget: 65000000, revenue: 0, economicImpact: 0, metadata: { theme: 'Desarrollo Local' }, odsMapping: [11], comuna: 'Río Bueno' },
  { id: 'evt-020', tenantId: 'los-rios-001', name: 'Festival de Jazz en Corral', type: 'cultural', category: 'regional', status: 'planned', startDate: '2026-06-01', endDate: '2026-06-03', venueId: 'ven-007', venueName: 'Fuerte de Niebla', organizerId: 'org-007', organizerName: 'Corporación Cultural Niebla', expectedAttendees: 2500, actualAttendees: 0, budget: 8500000, revenue: 0, economicImpact: 0, metadata: { artists: 8 }, odsMapping: [4, 8], comuna: 'Corral' },
];

// === VENUES ===
export const venues: Venue[] = [
  { id: 'ven-001', tenantId: 'los-rios-001', name: 'Hotel Dreams Valdivia', type: 'hotel', capacity: 450, areaM2: 3200, location: { lat: -39.8196, lng: -73.2452 }, address: 'Avenida Alemania 0160, Valdivia', equipment: { audiovisual: true, streaming: true, translation: true, wifi: true }, rating: 4.5 },
  { id: 'ven-002', tenantId: 'los-rios-001', name: 'Centro de Eventos Casino Dreams', type: 'convention_center', capacity: 800, areaM2: 4500, location: { lat: -39.828, lng: -73.238 }, address: 'Picarte 2280, Valdivia', equipment: { audiovisual: true, streaming: true, translation: false, wifi: true }, rating: 4.2 },
  { id: 'ven-003', tenantId: 'los-rios-001', name: 'Centro de Convenciones Campus Isla Teja', type: 'convention_center', capacity: 1200, areaM2: 6800, location: { lat: -39.808, lng: -73.254 }, address: 'Campus Isla Teja, Valdivia', equipment: { audiovisual: true, streaming: true, translation: true, wifi: true }, rating: 4.8 },
  { id: 'ven-004', tenantId: 'los-rios-001', name: 'Termas Geométricas', type: 'resort', capacity: 200, areaM2: 1800, location: { lat: -39.683, lng: -72.215 }, address: 'Coñaripe, Panguipulli', equipment: { audiovisual: true, streaming: false, translation: false, wifi: true }, rating: 4.9 },
  { id: 'ven-005', tenantId: 'los-rios-001', name: 'Costanera de Valdivia', type: 'outdoor', capacity: 5000, areaM2: 15000, location: { lat: -39.814, lng: -73.239 }, address: 'Costanera Arturo Prat, Valdivia', equipment: { audiovisual: true, streaming: false, translation: false, wifi: true }, rating: 4.3 },
  { id: 'ven-006', tenantId: 'los-rios-001', name: 'Parque Científico Teja', type: 'convention_center', capacity: 300, areaM2: 2200, location: { lat: -39.810, lng: -73.252 }, address: 'Isla Teja, Valdivia', equipment: { audiovisual: true, streaming: true, translation: false, wifi: true }, rating: 4.4 },
  { id: 'ven-007', tenantId: 'los-rios-001', name: 'Fuerte de Niebla', type: 'cultural', capacity: 1500, areaM2: 8000, location: { lat: -39.883, lng: -73.433 }, address: 'Niebla, Valdivia', equipment: { audiovisual: true, streaming: false, translation: false, wifi: false }, rating: 4.6 },
  { id: 'ven-008', tenantId: 'los-rios-001', name: 'Centro de Eventos La Unión', type: 'convention_center', capacity: 500, areaM2: 2800, location: { lat: -40.293, lng: -73.082 }, address: 'Arturo Prat 450, La Unión', equipment: { audiovisual: true, streaming: false, translation: false, wifi: true }, rating: 3.8 },
  { id: 'ven-009', tenantId: 'los-rios-001', name: 'Hospital Base Valdivia', type: 'other', capacity: 200, areaM2: 1200, location: { lat: -39.825, lng: -73.240 }, address: 'Avenida José Manzano 0200, Valdivia', equipment: { audiovisual: true, streaming: true, translation: false, wifi: true }, rating: 3.5 },
  { id: 'ven-010', tenantId: 'los-rios-001', name: 'Lago Panguipulli', type: 'outdoor', capacity: 2000, areaM2: 25000, location: { lat: -39.644, lng: -72.333 }, address: 'Panguipulli', equipment: { audiovisual: false, streaming: false, translation: false, wifi: false }, rating: 4.7 },
  { id: 'ven-011', tenantId: 'los-rios-001', name: 'Hotel Marina Río Bueno', type: 'hotel', capacity: 350, areaM2: 1800, location: { lat: -40.317, lng: -72.967 }, address: 'Costanera 320, Río Bueno', equipment: { audiovisual: true, streaming: false, translation: false, wifi: true }, rating: 3.9 },
  { id: 'ven-012', tenantId: 'los-rios-001', name: 'Centro Cultural La Unión', type: 'cultural', capacity: 400, areaM2: 1500, location: { lat: -40.295, lng: -73.080 }, address: 'Yerbas Buenas 180, La Unión', equipment: { audiovisual: true, streaming: false, translation: false, wifi: true }, rating: 4.0 },
];

// === KPIs ===
export const kpiDefinitions: KPIDefinition[] = [
  { id: 'kpi-001', tenantId: 'los-rios-001', name: 'Eventos Realizados', formula: 'COUNT(events WHERE status=completed)', source: 'Sistema de Gestión', frequency: 'mensual', target: 120, visualizationType: 'number', category: 'strategic', unit: 'eventos', description: 'Total de eventos ejecutados exitosamente' },
  { id: 'kpi-002', tenantId: 'los-rios-001', name: 'Impacto Económico Total', formula: 'SUM(economic_impact)', source: 'Mediciones Post-Evento', frequency: 'mensual', target: 5000000000, visualizationType: 'number', category: 'strategic', unit: 'CLP', description: 'Suma del impacto económico generado' },
  { id: 'kpi-003', tenantId: 'los-rios-001', name: 'Asistentes Internacionales', formula: 'COUNT(attendees WHERE country!="Chile")', source: 'Registro de Asistentes', frequency: 'mensual', target: 5000, visualizationType: 'number', category: 'strategic', unit: 'personas', description: 'Asistentes provenientes del extranjero' },
  { id: 'kpi-004', tenantId: 'los-rios-001', name: 'Tasa de Satisfacción', formula: 'AVG(satisfaction_score)', source: 'Encuestas Post-Evento', frequency: 'por evento', target: 4.5, visualizationType: 'gauge', category: 'tactical', unit: 'score', description: 'Promedio de satisfacción de asistentes' },
  { id: 'kpi-005', tenantId: 'los-rios-001', name: 'ROI Medio por Evento', formula: 'AVG((revenue - budget) / budget)', source: 'Finanzas', frequency: 'mensual', target: 0.25, visualizationType: 'gauge', category: 'tactical', unit: '%', description: 'Retorno sobre inversión promedio' },
  { id: 'kpi-006', tenantId: 'los-rios-001', name: 'Ocupación Hotelera Promedio', formula: 'AVG(hotel_occupancy)', source: 'SERNATUR', frequency: 'mensual', target: 68, visualizationType: 'chart', category: 'tactical', unit: '%', description: 'Ocupación hotelera durante eventos' },
  { id: 'kpi-007', tenantId: 'los-rios-001', name: 'Tasa de Captación', formula: 'WON_opportunities / TOTAL_opportunities', source: 'Pipeline CRM', frequency: 'trimestral', target: 0.35, visualizationType: 'gauge', category: 'tactical', unit: '%', description: 'Eventos captados vs oportunidades' },
  { id: 'kpi-008', tenantId: 'los-rios-001', name: 'Ranking ICCA Nacional', formula: 'Position in ICCA ranking', source: 'ICCA', frequency: 'anual', target: 3, visualizationType: 'number', category: 'strategic', unit: 'posición', description: 'Posición en ranking ICCA Chile' },
  { id: 'kpi-009', tenantId: 'los-rios-001', name: 'Tasa de Conversión Pipeline', formula: 'WON / (WON + LOST)', source: 'CRM', frequency: 'mensual', target: 0.40, visualizationType: 'gauge', category: 'operational', unit: '%', description: 'Tasa de conversión del pipeline' },
  { id: 'kpi-010', tenantId: 'los-rios-001', name: 'Tiempo Medio de Respuesta', formula: 'AVG(response_time_hours)', source: 'CRM', frequency: 'semanal', target: 4, visualizationType: 'chart', category: 'operational', unit: 'horas', description: 'Tiempo de respuesta a consultas' },
  { id: 'kpi-011', tenantId: 'los-rios-001', name: 'Predicción de Asistencia', formula: 'ML Model (XGBoost)', source: 'IA Predictiva', frequency: 'por evento', target: 0.85, visualizationType: 'chart', category: 'predictive', unit: 'accuracy', description: 'Precisión de predicción de asistencia' },
  { id: 'kpi-012', tenantId: 'los-rios-001', name: 'Tendencia de Crecimiento', formula: 'Prophet Trend', source: 'IA Series Temporales', frequency: 'mensual', target: 0.15, visualizationType: 'trend', category: 'predictive', unit: '%', description: 'Tendencia de crecimiento de eventos' },
];

// === KPI VALUES (últimos 6 meses) ===
export const kpiValues: KPIValue[] = [
  { id: 'kv-001', kpiId: 'kpi-001', period: '2025-01', value: 18, targetAchieved: 1.05, previousValue: 15 },
  { id: 'kv-002', kpiId: 'kpi-001', period: '2025-02', value: 16, targetAchieved: 0.96, previousValue: 18 },
  { id: 'kv-003', kpiId: 'kpi-001', period: '2025-03', value: 22, targetAchieved: 1.22, previousValue: 16 },
  { id: 'kv-004', kpiId: 'kpi-001', period: '2025-04', value: 19, targetAchieved: 1.06, previousValue: 22 },
  { id: 'kv-005', kpiId: 'kpi-001', period: '2025-05', value: 25, targetAchieved: 1.39, previousValue: 19 },
  { id: 'kv-006', kpiId: 'kpi-001', period: '2025-06', value: 14, targetAchieved: 0.78, previousValue: 25 },
  { id: 'kv-007', kpiId: 'kpi-002', period: '2025-01', value: 892000000, targetAchieved: 0.95, previousValue: 780000000 },
  { id: 'kv-008', kpiId: 'kpi-002', period: '2025-02', value: 534000000, targetAchieved: 0.78, previousValue: 892000000 },
  { id: 'kv-009', kpiId: 'kpi-002', period: '2025-03', value: 1250000000, targetAchieved: 1.25, previousValue: 534000000 },
  { id: 'kv-010', kpiId: 'kpi-002', period: '2025-04', value: 876000000, targetAchieved: 1.05, previousValue: 1250000000 },
  { id: 'kv-011', kpiId: 'kpi-002', period: '2025-05', value: 1580000000, targetAchieved: 1.52, previousValue: 876000000 },
  { id: 'kv-012', kpiId: 'kpi-002', period: '2025-06', value: 425000000, targetAchieved: 0.45, previousValue: 1580000000 },
  { id: 'kv-013', kpiId: 'kpi-004', period: '2025-01', value: 4.6, targetAchieved: 1.02, previousValue: 4.4 },
  { id: 'kv-014', kpiId: 'kpi-004', period: '2025-02', value: 4.7, targetAchieved: 1.04, previousValue: 4.6 },
  { id: 'kv-015', kpiId: 'kpi-004', period: '2025-03', value: 4.5, targetAchieved: 1.00, previousValue: 4.7 },
  { id: 'kv-016', kpiId: 'kpi-004', period: '2025-04', value: 4.8, targetAchieved: 1.07, previousValue: 4.5 },
  { id: 'kv-017', kpiId: 'kpi-004', period: '2025-05', value: 4.7, targetAchieved: 1.04, previousValue: 4.8 },
  { id: 'kv-018', kpiId: 'kpi-004', period: '2025-06', value: 4.6, targetAchieved: 1.02, previousValue: 4.7 },
  { id: 'kv-019', kpiId: 'kpi-006', period: '2025-01', value: 72, targetAchieved: 1.06, previousValue: 65 },
  { id: 'kv-020', kpiId: 'kpi-006', period: '2025-02', value: 68, targetAchieved: 1.00, previousValue: 72 },
  { id: 'kv-021', kpiId: 'kpi-006', period: '2025-03', value: 75, targetAchieved: 1.10, previousValue: 68 },
  { id: 'kv-022', kpiId: 'kpi-006', period: '2025-04', value: 71, targetAchieved: 1.04, previousValue: 75 },
  { id: 'kv-023', kpiId: 'kpi-006', period: '2025-05', value: 78, targetAchieved: 1.15, previousValue: 71 },
  { id: 'kv-024', kpiId: 'kpi-006', period: '2025-06', value: 70, targetAchieved: 1.03, previousValue: 78 },
  { id: 'kv-025', kpiId: 'kpi-012', period: '2025-01', value: 0.12, targetAchieved: 0.80, previousValue: 0.10 },
  { id: 'kv-026', kpiId: 'kpi-012', period: '2025-02', value: 0.14, targetAchieved: 0.93, previousValue: 0.12 },
  { id: 'kv-027', kpiId: 'kpi-012', period: '2025-03', value: 0.18, targetAchieved: 1.20, previousValue: 0.14 },
  { id: 'kv-028', kpiId: 'kpi-012', period: '2025-04', value: 0.15, targetAchieved: 1.00, previousValue: 0.18 },
  { id: 'kv-029', kpiId: 'kpi-012', period: '2025-05', value: 0.22, targetAchieved: 1.47, previousValue: 0.15 },
  { id: 'kv-030', kpiId: 'kpi-012', period: '2025-06', value: 0.16, targetAchieved: 1.07, previousValue: 0.22 },
];

// === ALERTAS ===
export const alerts: Alert[] = [
  { id: 'alt-001', tenantId: 'los-rios-001', type: 'opportunity', message: 'Nueva oportunidad: Congreso de Neurología (450 asistentes potenciales)', module: 'Captación', severity: 'high', read: false, createdAt: '2025-06-10T08:30:00' },
  { id: 'alt-002', tenantId: 'los-rios-001', type: 'warning', message: 'El evento "Congreso Chileno de Gestión Pública" inicia en 2 días sin confirmar catering', module: 'Gestión de Eventos', severity: 'medium', read: false, createdAt: '2025-06-11T10:15:00' },
  { id: 'alt-003', tenantId: 'los-rios-001', type: 'critical', message: 'Ocupación hotelera proyectada al 95% para Maratón Internacional Valdivia', module: 'Observatorio', severity: 'high', read: false, createdAt: '2025-06-09T14:00:00' },
  { id: 'alt-004', tenantId: 'los-rios-001', type: 'info', message: 'El benchmark LATAM se actualizó: Los Ríos sube 2 posiciones', module: 'Benchmark', severity: 'low', read: true, createdAt: '2025-06-08T09:00:00' },
  { id: 'alt-005', tenantId: 'los-rios-001', type: 'opportunity', message: 'Tendencia detectada: aumento de consultas por eventos de IA/tech', module: 'IA - Tendencias', severity: 'medium', read: false, createdAt: '2025-06-11T16:45:00' },
  { id: 'alt-006', tenantId: 'los-rios-001', type: 'warning', message: 'Venue "Hotel Marina Río Bueno" reporta mantenimiento en salón principal', module: 'Venues', severity: 'medium', read: true, createdAt: '2025-06-07T11:30:00' },
  { id: 'alt-007', tenantId: 'los-rios-001', type: 'info', message: 'Reporte mensual de mayo 2025 generado exitosamente', module: 'Reportes', severity: 'low', read: true, createdAt: '2025-06-01T08:00:00' },
];

// === DOCUMENTOS ===
export const documents: Document[] = [
  { id: 'doc-001', tenantId: 'los-rios-001', title: 'Plan Estratégico MICE Los Ríos 2025-2030', author: 'Los Ríos Convention Bureau', type: 'pdf', category: 'planificación', fileUrl: '#', metadata: { pages: 45, year: 2025 }, createdAt: '2025-01-15' },
  { id: 'doc-002', tenantId: 'los-rios-001', title: 'Protocolo de Medición de Impacto Económico', author: 'Consultor MICE Internacional', type: 'pdf', category: 'metodología', fileUrl: '#', metadata: { pages: 32, year: 2025 }, createdAt: '2025-02-20' },
  { id: 'doc-003', tenantId: 'los-rios-001', title: 'Análisis de Competencia - Benchmark Nacional 2025', author: 'Equipo de Inteligencia', type: 'excel', category: 'análisis', fileUrl: '#', metadata: { pages: 12, year: 2025 }, createdAt: '2025-03-10' },
  { id: 'doc-004', tenantId: 'los-rios-001', title: 'Base de Datos de Organizadores Internacionales', author: 'ICCA Database', type: 'excel', category: 'datos', fileUrl: '#', metadata: { pages: 1, year: 2025 }, createdAt: '2025-04-05' },
  { id: 'doc-005', tenantId: 'los-rios-001', title: 'Presentación de Ventas - Venue Campus Isla Teja', author: 'Universidad Austral', type: 'pdf', category: 'promoción', fileUrl: '#', metadata: { pages: 18, year: 2025 }, createdAt: '2025-05-12' },
  { id: 'doc-006', tenantId: 'los-rios-001', title: 'Informe de Satisfacción Q1 2025', author: 'Equipo de Encuestas', type: 'pdf', category: 'reportes', fileUrl: '#', metadata: { pages: 24, year: 2025 }, createdAt: '2025-04-15' },
  { id: 'doc-007', tenantId: 'los-rios-001', title: 'Convenio Corporación Cultural Niebla 2025', author: 'Legal', type: 'pdf', category: 'legal', fileUrl: '#', metadata: { pages: 8, year: 2025 }, createdAt: '2025-05-20' },
  { id: 'doc-008', tenantId: 'los-rios-001', title: 'Estudio de Mercado MICE Chile-LATAM', author: 'SERNATUR', type: 'pdf', category: 'análisis', fileUrl: '#', metadata: { pages: 56, year: 2024 }, createdAt: '2024-11-30' },
];

// === OPORTUNIDADES (CAPTACIÓN) ===
export const opportunities: Opportunity[] = [
  { id: 'opp-001', tenantId: 'los-rios-001', eventName: 'Congreso Latinoamericano de Neurología', type: 'conference', source: 'ICCA Database', probability: 0.65, estimatedValue: 280000000, estimatedAttendees: 450, decisionDate: '2025-08-15', status: 'negotiation', comuna: 'Valdivia', notes: 'Interés confirmado por comité organizador', createdAt: '2025-04-10' },
  { id: 'opp-002', tenantId: 'los-rios-001', eventName: 'Foro Mundial de Educación en Ciencias', type: 'conference', source: 'Referencia', probability: 0.45, estimatedValue: 190000000, estimatedAttendees: 320, decisionDate: '2025-09-20', status: 'proposal', comuna: 'Valdivia', notes: 'Enviada propuesta preliminar', createdAt: '2025-05-15' },
  { id: 'opp-003', tenantId: 'los-rios-001', eventName: 'Encuentro de Startups del Sur', type: 'meeting', source: 'Corfo', probability: 0.80, estimatedValue: 85000000, estimatedAttendees: 200, decisionDate: '2025-07-30', status: 'negotiation', comuna: 'Valdivia', notes: 'Alto interés, presupuesto aprobado', createdAt: '2025-06-01' },
  { id: 'opp-004', tenantId: 'los-rios-001', eventName: 'Campeonato Sudamericano de Remo', type: 'sports', source: 'Federación Chilena', probability: 0.55, estimatedValue: 120000000, estimatedAttendees: 600, decisionDate: '2025-10-10', status: 'contacted', comuna: 'Valdivia', notes: 'En evaluación técnica de instalaciones', createdAt: '2025-06-05' },
  { id: 'opp-005', tenantId: 'los-rios-001', eventName: 'Convención de Hotelería del Sur', type: 'meeting', source: 'ACHIGA', probability: 0.90, estimatedValue: 145000000, estimatedAttendees: 280, decisionDate: '2025-07-01', status: 'won', comuna: 'Panguipulli', notes: 'Confirmado, en planificación', createdAt: '2025-03-20' },
  { id: 'opp-006', tenantId: 'los-rios-001', eventName: 'Simposio de Biotecnología Marina', type: 'conference', source: 'Direct Outreach', probability: 0.35, estimatedValue: 220000000, estimatedAttendees: 380, decisionDate: '2025-11-15', status: 'contacted', comuna: 'Valdivia', notes: 'Primera reunión realizada', createdAt: '2025-05-22' },
  { id: 'opp-007', tenantId: 'los-rios-001', eventName: 'Festival de Cine Austral', type: 'cultural', source: 'Ministerio de Culturas', probability: 0.50, estimatedValue: 95000000, estimatedAttendees: 1500, decisionDate: '2025-09-01', status: 'proposal', comuna: 'Valdivia', notes: 'Postulación a fondo FONDART', createdAt: '2025-06-08' },
  { id: 'opp-008', tenantId: 'los-rios-001', eventName: 'Workshop de Liderazgo Gubernamental', type: 'incentive', source: 'Contacto Directo', probability: 0.25, estimatedValue: 65000000, estimatedAttendees: 85, decisionDate: '2025-12-20', status: 'prospect', comuna: 'Panguipulli', notes: 'Lead inicial generado en feria', createdAt: '2025-06-12' },
  { id: 'opp-009', tenantId: 'los-rios-001', eventName: 'Congreso de Ingeniería Forestal', type: 'conference', source: 'CONAF', probability: 0.70, estimatedValue: 175000000, estimatedAttendees: 350, decisionDate: '2025-08-30', status: 'proposal', comuna: 'Valdivia', notes: 'Propuesta técnica en revisión', createdAt: '2025-05-30' },
  { id: 'opp-010', tenantId: 'los-rios-001', eventName: 'Encuentro Internacional de Guías de Turismo', type: 'meeting', source: 'COTAL', probability: 0.40, estimatedValue: 78000000, estimatedAttendees: 250, decisionDate: '2025-10-30', status: 'contacted', comuna: 'Panguipulli', notes: 'Enviado dossier del destino', createdAt: '2025-06-10' },
];

// === IMPACT MEASUREMENTS ===
export const impactMeasurements: ImpactMeasurement[] = [
  { id: 'imp-001', tenantId: 'los-rios-001', eventId: 'evt-001', dimension: 'economic', metric: 'Impacto Directo', value: 380000000, currency: 'CLP', measuredAt: '2025-01-20' },
  { id: 'imp-002', tenantId: 'los-rios-001', eventId: 'evt-001', dimension: 'touristic', metric: 'Noches de Hotel', value: 1845, measuredAt: '2025-01-20' },
  { id: 'imp-003', tenantId: 'los-rios-001', eventId: 'evt-001', dimension: 'academic', metric: 'Papers Publicados', value: 12, measuredAt: '2025-01-20' },
  { id: 'imp-004', tenantId: 'los-rios-001', eventId: 'evt-002', dimension: 'economic', metric: 'Impacto Directo', value: 142000000, measuredAt: '2025-02-23' },
  { id: 'imp-005', tenantId: 'los-rios-001', eventId: 'evt-002', dimension: 'social', metric: 'Empleos Temporales', value: 45, measuredAt: '2025-02-23' },
  { id: 'imp-006', tenantId: 'los-rios-001', eventId: 'evt-003', dimension: 'economic', metric: 'Impacto Directo', value: 265000000, measuredAt: '2025-03-14' },
  { id: 'imp-007', tenantId: 'los-rios-001', eventId: 'evt-003', dimension: 'territorial', metric: 'ODS Impactados', value: 3, measuredAt: '2025-03-14' },
  { id: 'imp-008', tenantId: 'los-rios-001', eventId: 'evt-004', dimension: 'economic', metric: 'Impacto Directo', value: 195000000, measuredAt: '2025-04-09' },
  { id: 'imp-009', tenantId: 'los-rios-001', eventId: 'evt-004', dimension: 'academic', metric: 'Partnerships Formados', value: 8, measuredAt: '2025-04-09' },
  { id: 'imp-010', tenantId: 'los-rios-001', eventId: 'evt-005', dimension: 'economic', metric: 'Impacto Directo', value: 165000000, measuredAt: '2025-04-27' },
  { id: 'imp-011', tenantId: 'los-rios-001', eventId: 'evt-005', dimension: 'touristic', metric: 'Noches de Hotel', value: 368, measuredAt: '2025-04-27' },
  { id: 'imp-012', tenantId: 'los-rios-001', eventId: 'evt-006', dimension: 'economic', metric: 'Impacto Directo', value: 385000000, measuredAt: '2025-05-12' },
  { id: 'imp-013', tenantId: 'los-rios-001', eventId: 'evt-006', dimension: 'media', metric: 'Alcance en Redes', value: 2500000, measuredAt: '2025-05-12' },
  { id: 'imp-014', tenantId: 'los-rios-001', eventId: 'evt-006', dimension: 'social', metric: 'Voluntarios Activados', value: 120, measuredAt: '2025-05-12' },
];

// === BENCHMARK DATA ===
export const benchmarkData: BenchmarkData[] = [
  { region: 'Los Ríos', country: 'Chile', eventsCount: 114, internationalEvents: 23, attendees: 105200, satisfaction: 4.6, infrastructure: 4.2, year: 2025, position: 4 },
  { region: 'Valparaíso', country: 'Chile', eventsCount: 89, internationalEvents: 18, attendees: 78400, satisfaction: 4.3, infrastructure: 4.5, year: 2025, position: 6 },
  { region: 'Concepción', country: 'Chile', eventsCount: 67, internationalEvents: 12, attendees: 52300, satisfaction: 4.1, infrastructure: 4.0, year: 2025, position: 8 },
  { region: 'Antofagasta', country: 'Chile', eventsCount: 45, internationalEvents: 15, attendees: 41200, satisfaction: 4.0, infrastructure: 3.9, year: 2025, position: 10 },
  { region: 'La Serena', country: 'Chile', eventsCount: 52, internationalEvents: 8, attendees: 35600, satisfaction: 4.2, infrastructure: 4.1, year: 2025, position: 9 },
  { region: 'Temuco', country: 'Chile', eventsCount: 38, internationalEvents: 6, attendees: 28400, satisfaction: 3.9, infrastructure: 3.7, year: 2025, position: 12 },
  { region: 'Puerto Varas', country: 'Chile', eventsCount: 71, internationalEvents: 14, attendees: 45600, satisfaction: 4.5, infrastructure: 4.3, year: 2025, position: 7 },
  { region: 'Iquique', country: 'Chile', eventsCount: 29, internationalEvents: 7, attendees: 22100, satisfaction: 3.8, infrastructure: 3.6, year: 2025, position: 13 },
  { region: 'Punta Arenas', country: 'Chile', eventsCount: 18, internationalEvents: 4, attendees: 15400, satisfaction: 3.9, infrastructure: 3.4, year: 2025, position: 14 },
  { region: 'Santiago', country: 'Chile', eventsCount: 342, internationalEvents: 98, attendees: 412800, satisfaction: 4.4, infrastructure: 4.8, year: 2025, position: 1 },
];

// === BENCHMARK LATAM ===
export const benchmarkLatam: BenchmarkData[] = [
  { region: 'Buenos Aires', country: 'Argentina', eventsCount: 198, internationalEvents: 45, attendees: 245000, satisfaction: 4.5, infrastructure: 4.6, year: 2025, position: 2 },
  { region: 'São Paulo', country: 'Brasil', eventsCount: 287, internationalEvents: 62, attendees: 398000, satisfaction: 4.3, infrastructure: 4.7, year: 2025, position: 1 },
  { region: 'Ciudad de México', country: 'México', eventsCount: 245, internationalEvents: 58, attendees: 312000, satisfaction: 4.4, infrastructure: 4.5, year: 2025, position: 3 },
  { region: 'Cartagena', country: 'Colombia', eventsCount: 156, internationalEvents: 32, attendees: 187000, satisfaction: 4.6, infrastructure: 4.3, year: 2025, position: 5 },
  { region: 'Lima', country: 'Perú', eventsCount: 134, internationalEvents: 28, attendees: 165000, satisfaction: 4.2, infrastructure: 4.1, year: 2025, position: 7 },
  { region: 'Montevideo', country: 'Uruguay', eventsCount: 87, internationalEvents: 18, attendees: 98000, satisfaction: 4.3, infrastructure: 4.0, year: 2025, position: 9 },
  { region: 'Santiago', country: 'Chile', eventsCount: 342, internationalEvents: 98, attendees: 412800, satisfaction: 4.4, infrastructure: 4.8, year: 2025, position: 4 },
  { region: 'Los Ríos', country: 'Chile', eventsCount: 114, internationalEvents: 23, attendees: 105200, satisfaction: 4.6, infrastructure: 4.2, year: 2025, position: 11 },
  { region: 'Panamá', country: 'Panamá', eventsCount: 98, internationalEvents: 24, attendees: 112000, satisfaction: 4.5, infrastructure: 4.4, year: 2025, position: 10 },
  { region: 'San José', country: 'Costa Rica', eventsCount: 76, internationalEvents: 19, attendees: 87000, satisfaction: 4.4, infrastructure: 4.1, year: 2025, position: 12 },
];

// === TIME SERIES (últimos 12 meses) ===
export const timeSeriesData: TimeSeriesData[] = [
  { period: 'Jun 2024', events: 12, attendees: 8500, economicImpact: 420000000, satisfaction: 4.3 },
  { period: 'Jul 2024', events: 15, attendees: 10200, economicImpact: 580000000, satisfaction: 4.4 },
  { period: 'Ago 2024', events: 18, attendees: 12400, economicImpact: 720000000, satisfaction: 4.3 },
  { period: 'Sep 2024', events: 14, attendees: 9800, economicImpact: 540000000, satisfaction: 4.2 },
  { period: 'Oct 2024', events: 16, attendees: 11200, economicImpact: 650000000, satisfaction: 4.5 },
  { period: 'Nov 2024', events: 19, attendees: 13800, economicImpact: 780000000, satisfaction: 4.4 },
  { period: 'Dic 2024', events: 22, attendees: 15600, economicImpact: 890000000, satisfaction: 4.5 },
  { period: 'Ene 2025', events: 18, attendees: 13100, economicImpact: 892000000, satisfaction: 4.6 },
  { period: 'Feb 2025', events: 16, attendees: 9800, economicImpact: 534000000, satisfaction: 4.7 },
  { period: 'Mar 2025', events: 22, attendees: 18200, economicImpact: 1250000000, satisfaction: 4.5 },
  { period: 'Abr 2025', events: 19, attendees: 14500, economicImpact: 876000000, satisfaction: 4.8 },
  { period: 'May 2025', events: 25, attendees: 20100, economicImpact: 1580000000, satisfaction: 4.7 },
  { period: 'Jun 2025', events: 14, attendees: 8500, economicImpact: 425000000, satisfaction: 4.6 },
];

// === REPORTES ===
export const reports: Report[] = [
  { id: 'rep-001', tenantId: 'los-rios-001', title: 'Informe Mensual - Mayo 2025', type: 'mensual', format: 'pdf', status: 'completed', fileUrl: '#', generatedBy: 'Sistema Automático', createdAt: '2025-06-01' },
  { id: 'rep-002', tenantId: 'los-rios-001', title: 'Impacto Económico Q1 2025', type: 'trimestral', format: 'excel', status: 'completed', fileUrl: '#', generatedBy: 'Directora MICE', createdAt: '2025-04-05' },
  { id: 'rep-003', tenantId: 'los-rios-001', title: 'Benchmark Nacional 2025', type: 'anual', format: 'dashboard', status: 'completed', fileUrl: '#', generatedBy: 'Analista de Inteligencia', createdAt: '2025-05-20' },
  { id: 'rep-004', tenantId: 'los-rios-001', title: 'Predicción Eventos Q3 2025', type: 'predictivo', format: 'dashboard', status: 'generating', fileUrl: '#', generatedBy: 'IA Predictiva', createdAt: '2025-06-12' },
  { id: 'rep-005', tenantId: 'los-rios-001', title: 'Análisis de Satisfacción - H1 2025', type: 'análisis', format: 'pdf', status: 'completed', fileUrl: '#', generatedBy: 'Equipo de Encuestas', createdAt: '2025-06-10' },
];

// === DIMENSIONES DE IMPACTO ===
export const impactDimensions = [
  { id: 'economic', name: 'Económico', description: 'Impacto directo e indirecto en la economía regional', color: '#0f766e', weight: 0.30 },
  { id: 'touristic', name: 'Turístico', description: 'Generación de demanda turística y ocupación', color: '#0369a1', weight: 0.20 },
  { id: 'social', name: 'Social', description: 'Empleo, voluntariado e inclusión comunitaria', color: '#b45309', weight: 0.15 },
  { id: 'media', name: 'Mediático', description: 'Visibilidad, alcance y reputación del destino', color: '#7c3aed', weight: 0.10 },
  { id: 'territorial', name: 'Territorial', description: 'Desarrollo urbano, infraestructura y ODS', color: '#15803d', weight: 0.10 },
  { id: 'academic', name: 'Académico/Científico', description: 'Conocimiento, partnerships y publicaciones', color: '#be185d', weight: 0.10 },
  { id: 'legacy', name: 'Legado', description: 'Impacto de largo plazo en la región', color: '#4338ca', weight: 0.05 },
];

// === ODS ICONS/MAPPING ===
export const odsList = [
  { id: 1, name: 'Fin de la pobreza' },
  { id: 2, name: 'Hambre cero' },
  { id: 3, name: 'Salud y bienestar' },
  { id: 4, name: 'Educación de calidad' },
  { id: 5, name: 'Igualdad de género' },
  { id: 6, name: 'Agua limpia' },
  { id: 7, name: 'Energía asequible' },
  { id: 8, name: 'Trabajo decente' },
  { id: 9, name: 'Industria e innovación' },
  { id: 10, name: 'Reducción desigualdades' },
  { id: 11, name: 'Ciudades sostenibles' },
  { id: 12, name: 'Producción responsable' },
  { id: 13, name: 'Acción por el clima' },
  { id: 14, name: 'Vida submarina' },
  { id: 15, name: 'Vida de ecosistemas' },
  { id: 16, name: 'Paz e instituciones' },
  { id: 17, name: 'Alianzas para los ODS' },
];

// Helpers
export const formatCurrency = (value: number): string => {
  if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)} mil millones`;
  if (value >= 1000000) return `$${(value / 1000000).toFixed(0)} millones`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)} mil`;
  return `$${value}`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('es-CL').format(value);
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    completed: 'bg-green-100 text-green-800',
    confirmed: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-amber-100 text-amber-800',
    planned: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
    prospect: 'bg-gray-100 text-gray-600',
    contacted: 'bg-blue-50 text-blue-600',
    proposal: 'bg-purple-50 text-purple-600',
    negotiation: 'bg-amber-50 text-amber-600',
    won: 'bg-green-100 text-green-700',
    lost: 'bg-red-50 text-red-500',
    international: 'bg-indigo-100 text-indigo-800',
    national: 'bg-sky-100 text-sky-800',
    regional: 'bg-teal-100 text-teal-800',
    local: 'bg-gray-100 text-gray-600',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    completed: 'Completado',
    confirmed: 'Confirmado',
    in_progress: 'En curso',
    planned: 'Planificado',
    cancelled: 'Cancelado',
    prospect: 'Prospecto',
    contacted: 'Contactado',
    proposal: 'Propuesta',
    negotiation: 'Negociación',
    won: 'Ganado',
    lost: 'Perdido',
    meeting: 'Reunión',
    incentive: 'Incentivo',
    conference: 'Conferencia',
    exhibition: 'Exhibición',
    sports: 'Deportivo',
    cultural: 'Cultural',
    corporate: 'Corporativo',
    international: 'Internacional',
    national: 'Nacional',
    regional: 'Regional',
    local: 'Local',
  };
  return labels[status] || status;
};
