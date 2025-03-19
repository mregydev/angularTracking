import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { Vehicle } from '@/app/models/Vehicle.model';
import { environment } from '@/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class VehicleSocketService {
  private socket: Socket | null = null;
  private vehicleUpdates$ = new Subject<Vehicle>();

  constructor() {
    this.connect();
  }

  // Connect to the WebSocket server
  private connect() {
    this.socket = io(environment.socketUrl, {
      transports: ['websocket'],
    });

    // Listen for vehicle updates
    this.socket.on('vehicleUpdate', (vehicle: Vehicle) => {
      this.vehicleUpdates$.next(vehicle);
    });
  }

  // Expose vehicle updates as an Observable
  getVehicleUpdates(): Observable<Vehicle> {
    return this.vehicleUpdates$.asObservable();
  }

  // Release all event handlers
  releaseHandlers() {
    this.socket?.off('vehicleUpdate');
  }
}
