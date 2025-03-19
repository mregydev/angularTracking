import { tileLayer, latLng, LatLngBounds, LatLng, icon, divIcon } from 'leaflet';

// Map options
export const mapOptions = {
  layers: [
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 20,
    }),
  ],
  zoom: 13,
  center: latLng(50.94, 6.92), // Default center
};

// Bounds for the map
export const mapBounds = new LatLngBounds(
  new LatLng(50.917, 6.844), // Southwest corner
  new LatLng(50.972, 7.08) // Northeast corner
);

// Custom icons for markers
export const alertVehicleIcon = divIcon({
  className: 'animated-marker',
  html: `
    <div class="pulse">
      <img
        src="https://cdn-icons-png.flaticon.com/512/744/744465.png"
        alt="Alert Vehicle Icon"
        style="width: 40px; height: 40px;"
      />
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const defaultVehicleIcon = icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
