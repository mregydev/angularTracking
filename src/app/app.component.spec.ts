import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MapComponent } from "./components/map/map.component";
import { VehicleListComponent } from "./components/vehicle-list/vehicle-list.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MapComponent,
        VehicleListComponent,
        MatExpansionModule,
        MatListModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [provideAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have title defined as "leaflet"', () => {
    expect(component.title).toEqual('Live tracking App');
  });

  it('should render <app-map> component', () => {
    const mapElement = fixture.nativeElement.querySelector('app-map');
    expect(mapElement).toBeTruthy();
  });

  it('should render <app-vehicle-list> component inside mat-expansion-panel', () => {
    const vehicleListElement = fixture.nativeElement.querySelector('app-vehicle-list');
    expect(vehicleListElement).toBeTruthy();
  });

  it('should render a mat-expansion-panel that is expanded by default', () => {
    const expansionPanel = fixture.nativeElement.querySelector('mat-expansion-panel');
    expect(expansionPanel.getAttribute('expanded')).toBeTruthy();
  });

});
