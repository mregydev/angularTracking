# Live Tracking App

## Overview
This is a **Live Tracking Application** that renders a list of vehicles and tracks them in real-time. The app provides the ability to monitor vehicle statuses and detect any issues they may encounter. Vehicles are displayed both in a list and on a map, with real-time updates reflecting their current states.

App is deployed in vercel on link https://angular-tracking.vercel.app/

## Features
- **Real-time Vehicle Tracking**: Continuously updates the positions of vehicles on a map.
- **Vehicle Issue Detection**: Marks vehicles with issues and displays relevant error messages.
- **Expandable/Collapsible List View**: Users can expand or minimize vehicle list items.
- **Optimized Performance**: Efficient change detection strategy ensures minimal re-renders.

## Performance Optimizations
To ensure smooth and high-performance updates, the following strategies were used:

- **Selective Re-rendering**: Only vehicles that have changed (either in the list or as map markers) are re-rendered, reducing unnecessary updates.
- **Efficient State Management**: Vehicle data updates are handled through RxJS subscriptions to optimize real-time performance.

## Map Functionality
- **Live updates of vehicle positions**
- **Markers change dynamically based on vehicle issues**
- **Zooming functionality to focus on specific vehicles**
- **Bounds adjustment to fit all vehicles in view**

## Technologies Used
- **Angular** with **OnPush Change Detection** for performance optimization
- **Leaflet** for interactive map visualization
- **RxJS** for handling real-time data updates efficiently

This ensures that the app remains responsive, scalable, and delivers real-time tracking with minimal overhead.
