import { Position } from "./Position.model";
import { VehicleAttributes } from "./VehicleAttributes";

export type VehicleMoveStatus='moving'|'paused'
export type VehicleWorkingStatus = 'working' | 'damaged' | 'all' | 'none';

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

