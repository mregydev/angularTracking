import { Component } from '@angular/core';
import { MapComponent } from "./components/map/map.component";
import { VehicleListComponent } from "./components/vehicle-list/vehicle-list.component";
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MapComponent, VehicleListComponent,MatExpansionModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Live tracking App';
}
