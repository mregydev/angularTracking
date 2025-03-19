/**
 * MinimizeDetails
 */
export interface MinimizeDetails {
  widgetId: string;
  widgetTitle: string;
}

export type VehicleMoveStatus='moving'|'paused'
export type VehicleWorkingStatus = 'working' | 'damaged' | 'all' | 'none';
export type Locale = 'en' | 'de';

/**
 * Vehicle
 */
export interface Vehicle {
  id: string;
  name: string;
  attributes: VehicleAttributes;
  position: Position;
  pathIndex: number;
  pathDirection: number;
  hasIssue: boolean;
  errorMessage: string;
  issueTimer: number;
  status: VehicleMoveStatus;
}

/**
 * VehicleAttributes
 */
export interface VehicleAttributes {
  speed: number;
  batteryLevel: number;
  temperature: number;
  tirePressure: number;
  motorEfficiency: number;
  regenerativeBraking: boolean;
  oilLevel: number;
  brakeFluid: number;
  coolantLevel: number;
  fuelLevel: number;
  engineLoad: number;
  gpsAccuracy: number;
}

/**
 * Position
 */
export interface Position {
  lat: number;
  lng: number;
}
