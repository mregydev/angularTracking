import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleSocketService } from '@/app/services/VehicleSocketService.service';
import { Vehicle } from '@/app/models/Vehicle.model';
import { Subscription } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { VehicleService } from '@/app/services/VehicleZoomService.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  standalone: true,
  imports: [MatListModule, MatIconModule, NgStyle, NgFor,NgIf],

})
export class VehicleListComponent implements OnInit, OnDestroy {
  vehicles: Vehicle[] = [];
  private vehicleUpdatesSubscription: Subscription | null = null;

  constructor(
    private vehicleSocketService: VehicleSocketService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    // Subscribe to vehicle updates
    this.vehicleUpdatesSubscription = this.vehicleSocketService
      .getVehicleUpdates()
      .subscribe((vehicle) => {
        const index = this.vehicles.findIndex((v) => v.id === vehicle.id);
        if (index === -1) {
          // Add new vehicle
          this.vehicles.push(vehicle);
        } else {
          // Update existing vehicle
          this.vehicles[index] = vehicle;
        }
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.vehicleUpdatesSubscription?.unsubscribe();
  }

  // Get the color for the status
  getStatusColor(vehicle: Vehicle): string {
    return vehicle.hasIssue ? 'red' : 'green';
  }

  // TrackBy function to optimize rendering
  trackByVehicleId(_: number, vehicle: Vehicle): string {
    return vehicle.id;
  }

  // Zoom to a vehicle on the map
  zoomToVehicle(vehicle: Vehicle): void {
    this.vehicleService.zoomToVehicle(vehicle);
  }
}
