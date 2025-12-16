import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { MatListItem } from '@angular/material/list';
import { Vehicle } from '@/app/models/Vehicle.model';

@Component({
  selector: 'app-vehicle-list-item',
  standalone: true,
  imports: [MatListItem, NgIf, NgStyle],
  template: `
    <mat-list-item class="vehicle-item" (click)="handleClick()">
      <div class="vehicle-details">
        <h3>{{ vehicle?.name }}</h3>
        <h4 *ngIf="vehicle?.hasIssue">{{ vehicle?.errorMessage }}</h4>
        <span
          class="status-icon"
          [ngStyle]="{ 'background-color': statusColor }"
        ></span>
      </div>
    </mat-list-item>
  `,
  styleUrls: ['./vehicle-list-item.component.scss'],
})
export class VehicleListItemComponent {
  @Input() vehicle!: Vehicle;
  @Input() statusColor = 'green';
  @Output() select = new EventEmitter<Vehicle>();

  handleClick(): void {
    if (this.vehicle) {
      this.select.emit(this.vehicle);
    }
  }
}


