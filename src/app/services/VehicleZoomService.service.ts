import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Vehicle } from '@/app/models/Vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private zoomToVehicleSubject = new Subject<Vehicle>();

  // Observable to subscribe to zoom events
  zoomToVehicle$ = this.zoomToVehicleSubject.asObservable();

  // Method to trigger zoom to a vehicle
  zoomToVehicle(vehicle: Vehicle) {
    this.zoomToVehicleSubject.next(vehicle);
  }
}
