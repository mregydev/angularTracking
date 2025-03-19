import { TestBed } from '@angular/core/testing';
import { VehicleService } from './VehicleZoomService.service';
import { Vehicle } from '@/app/models/Vehicle.model';

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(() => {
    // Configure the testing module
    TestBed.configureTestingModule({
      providers: [VehicleService],
    });

    // Inject the service
    service = TestBed.inject(VehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a Vehicle object when zoomToVehicle is called', (done) => {
    // Define a mock Vehicle object
    const mockVehicle: Vehicle = {
      id: '1',
      name: 'Vehicle 1',
      status: 'moving',
      attributes: {
        speed: 0,
        batteryLevel: 0,
        temperature: 0,
        tirePressure: 0,
        motorEfficiency: 0,
        regenerativeBraking: false,
        oilLevel: 0,
        brakeFluid: 0,
        coolantLevel: 0,
        fuelLevel: 0,
        engineLoad: 0,
        gpsAccuracy: 0
      },
      position: {lat:0,lng:0},
      pathIndex: 0,
      pathDirection: 0,
      hasIssue: false,
      errorMessage: '',
      issueTimer: 0
    };

    // Subscribe to the zoomToVehicle$ observable
    service.zoomToVehicle$.subscribe((vehicle:Partial<Vehicle>) => {
      // Verify that the emitted vehicle matches the mock vehicle
      expect(vehicle).toEqual(mockVehicle);
      done(); // Signal that the test is complete
    });

    // Trigger the zoomToVehicle method with the mock vehicle
    service.zoomToVehicle(mockVehicle);
  });
});
