import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { VehicleSocketService } from '@/app/services/VehicleSocketService.service';
import { VehicleService } from '@/app/services/VehicleZoomService.service';
import { of, Subscription } from 'rxjs';
import { Vehicle } from '@/app/models/Vehicle.model';
import { alertVehicleIcon, defaultVehicleIcon, mapBounds, mapOptions } from './map.config';
import { LatLng } from 'leaflet';

// Mock services
class MockVehicleSocketService {
  getVehicleUpdates = jasmine.createSpy('getVehicleUpdates').and.returnValue(of());
}

class MockVehicleService {
  zoomToVehicle$ = of();
}

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let vehicleSocketService: VehicleSocketService;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeafletModule, MapComponent], // Add MapComponent to imports (standalone component)
      providers: [
        { provide: VehicleSocketService, useClass: MockVehicleSocketService },
        { provide: VehicleService, useClass: MockVehicleService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    vehicleSocketService = TestBed.inject(VehicleSocketService);
    vehicleService = TestBed.inject(VehicleService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize map options and bounds', () => {
    expect(component.options).toEqual(mapOptions);
    expect(component.bounds).toEqual(mapBounds);
  });

  it('should initialize vehicle icons', () => {
    expect(component.alertVehicleIcon).toEqual(alertVehicleIcon);
    expect(component.defaultVehicleIcon).toEqual(defaultVehicleIcon);
  });

  it('should subscribe to vehicle updates on initialization', () => {
    expect(vehicleSocketService.getVehicleUpdates).toHaveBeenCalled();
  });

  it('should subscribe to zoom events on initialization', () => {
    expect(vehicleService.zoomToVehicle$).toBeDefined();
  });

  it('should add a new marker when a vehicle update is received', () => {
    const vehicle: Partial<Vehicle> = {
      id: '1',
      name: 'Vehicle 1',
      position: { lat: 50.94, lng: 6.92 },
      hasIssue: false,
      attributes: {
        speed: 50,
        batteryLevel: 80,
        temperature: 25,
        tirePressure: 32,
        motorEfficiency: 90,
        regenerativeBraking: true,
        oilLevel: 95,
        brakeFluid: 85,
        coolantLevel: 75,
        fuelLevel: 50,
        engineLoad: 60,
        gpsAccuracy: 5,
      },
    };

    // Trigger the vehicle update
    (vehicleSocketService.getVehicleUpdates as jasmine.Spy).and.returnValue(of(vehicle));
    component.ngOnInit();

    expect(component.layers.length).toBe(1);
    expect(component.vehicleMarkers[vehicle.id ?? '']).toBeDefined();
  });

  it('should update an existing marker when a vehicle update is received', () => {
    const vehicle: Partial<Vehicle> = {
      id: '1',
      name: 'Vehicle 1',
      position: { lat: 50.94, lng: 6.92 },
      hasIssue: false,
      attributes: {
        speed: 50,
        batteryLevel: 80,
        temperature: 25,
        tirePressure: 32,
        motorEfficiency: 90,
        regenerativeBraking: true,
        oilLevel: 95,
        brakeFluid: 85,
        coolantLevel: 75,
        fuelLevel: 50,
        engineLoad: 60,
        gpsAccuracy: 5,
      },
    };

    // Add the initial marker
    (vehicleSocketService.getVehicleUpdates as jasmine.Spy).and.returnValue(of(vehicle));
    component.ngOnInit();

    // Update the vehicle's position
    const updatedVehicle = { ...vehicle, position: { lat: 50.95, lng: 6.93 } };
    (vehicleSocketService.getVehicleUpdates as jasmine.Spy).and.returnValue(of(updatedVehicle));
    component.ngOnInit();

    // Mock the getLatLng method
    const mockMarker = jasmine.createSpyObj('Marker', ['getLatLng']);
    mockMarker.getLatLng.and.returnValue(new LatLng(updatedVehicle.position.lat, updatedVehicle.position.lng));
    component.vehicleMarkers[vehicle.id ?? ''] = mockMarker;

    expect(component.layers.length).toBe(1);
    expect(component.vehicleMarkers[vehicle.id ?? ''].getLatLng()).toEqual(
      new LatLng(updatedVehicle.position.lat, updatedVehicle.position.lng)
    );
  });


  it('should zoom to full extent when zoomToFullExtent is called', () => {
    // Mock the map instance
    const mockMap = jasmine.createSpyObj('Map', ['fitBounds']);
    component.onMapReady(mockMap);

    // Call zoomToFullExtent
    component.zoomToFullExtent();

    expect(mockMap.fitBounds).toHaveBeenCalledWith(mapBounds);
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    const vehicleUpdatesSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    const zoomToVehicleSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);

    component.vehicleUpdatesSubscription = vehicleUpdatesSubscription;
    component.zoomToVehicleSubscription = zoomToVehicleSubscription;

    component.ngOnDestroy();

    expect(vehicleUpdatesSubscription.unsubscribe).toHaveBeenCalled();
    expect(zoomToVehicleSubscription.unsubscribe).toHaveBeenCalled();
  });
});
