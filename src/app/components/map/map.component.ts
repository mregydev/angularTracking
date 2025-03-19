import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { tileLayer, latLng, LatLngBounds, LatLng, marker, icon, divIcon, Map } from 'leaflet';
import { VehicleSocketService } from '@/app/services/VehicleSocketService.service';
import { Vehicle } from '@/app/models/Vehicle.model';
import { Subscription } from 'rxjs';
import { VehicleService } from '@/app/services/VehicleZoomService.service';
import { alertVehicleIcon, defaultVehicleIcon, mapBounds, mapOptions } from './map.config';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  // Map options
  options = mapOptions
  // Bounds for the map
  bounds = mapBounds

  alertVehicleIcon = alertVehicleIcon

  defaultVehicleIcon = defaultVehicleIcon

  // Layers for the map (markers, etc.)
  layers: any[] = [];

  // Store vehicle markers
  vehicleMarkers: { [key: string]: any } = {};

  // RxJS subscriptions
  vehicleUpdatesSubscription: Subscription | null = null;
  zoomToVehicleSubscription: Subscription | null = null;

  // Leaflet map instance
  private map: Map | null = null;

  constructor(
    private vehicleSocketService: VehicleSocketService,
    private vehicleService: VehicleService // Inject the shared service
  ) {}

  ngOnInit(): void {
    // Subscribe to vehicle updates
    this.vehicleUpdatesSubscription = this.vehicleSocketService
      .getVehicleUpdates()
      .subscribe((vehicle) => {
        this.updateVehicleMarker(vehicle);
      });

    // Subscribe to zoom events
    this.zoomToVehicleSubscription = this.vehicleService.zoomToVehicle$.subscribe(
      (vehicle) => {
        this.zoomToVehicle(vehicle);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.vehicleUpdatesSubscription?.unsubscribe();
    this.zoomToVehicleSubscription?.unsubscribe();
  }

  // Update or add a vehicle marker
  private updateVehicleMarker(vehicle: Vehicle): void {
    const latLng = new LatLng(vehicle.position.lat, vehicle.position.lng);

    if (this.vehicleMarkers[vehicle.id]) {
      // Smoothly update existing marker
      this.vehicleMarkers[vehicle.id].setLatLng(latLng);
    } else {
      // Add new marker with custom icon
      const newMarker = marker(latLng, {
        icon: vehicle.hasIssue
          ? this.alertVehicleIcon
          : this.defaultVehicleIcon,
      }).bindPopup(
        `<b>${vehicle.name}</b> ${vehicle.hasIssue ? `has issue ${vehicle.errorMessage}`:''}`
      );

      // Add the marker to the layers array
      this.layers = [...this.layers, newMarker];
      this.vehicleMarkers[vehicle.id] = newMarker;
    }
  }

  // Zoom to a specific vehicle
  private zoomToVehicle(vehicle: Vehicle): void {
    if (this.map) {
      const latLng = new LatLng(vehicle.position.lat, vehicle.position.lng);
      this.map.setView(latLng, 15);
    }
  }

  // Store the map instance
  onMapReady(map: Map) {
    this.map = map;
  }

  zoomToFullExtent()
  {
    if (this.map) {
      this.map.fitBounds(this.bounds);
    }
  }
}
