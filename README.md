# RideOn — Frontend

React + Vite client for RideOn. Uses Socket.IO client for realtime notifications and Google Maps for geolocation.

## Quick start
1. Copy `.env` in `/Frontend/.env` and set:
   - VITE_BASE_URL (API base) — currently `http://localhost:9000/api/v1`
   - VITE_GOOGLE_MAPS_API_KEY
2. Install & run:
   ```sh
   cd Frontend
   npm install
   npm run dev
   ```
3. App entry: [`src/main.jsx`](Frontend/src/main.jsx). Routes defined in [`src/App.jsx`](Frontend/src/App.jsx).

## Key concepts & files
- Socket provider: [`src/context/SocketContext.jsx`](Frontend/src/context/SocketContext.jsx) — exposes [`SocketContext`](Frontend/src/context/SocketContext.jsx) and the socket instance created with `io(...)`.
- User state: [`src/context/UserContext.jsx`](Frontend/src/context/UserContext.jsx) — provides [`UserDataContext`](Frontend/src/context/UserContext.jsx).
- Captain state: [`src/context/CaptainContext.jsx`](Frontend/src/context/CaptainContext.jsx).
- Main pages:
  - Home: [`src/pages/Home.jsx`](Frontend/src/pages/Home.jsx) — emits `join` and listens to `ride-confirmed` / `ride-started`.
  - CaptainHome: [`src/pages/CaptainHome.jsx`](Frontend/src/pages/CaptainHome.jsx) — emits `join` for captain, listens for `new-ride`.
  - Riding / CaptainRiding: [`src/pages/Riding.jsx`](Frontend/src/pages/Riding.jsx), [`src/pages/CaptainRiding.jsx`](Frontend/src/pages/CaptainRiding.jsx)
- Map & tracking:
  - Map component: [`src/components/LiveTracking.jsx`](Frontend/src/components/LiveTracking.jsx) — uses `navigator.geolocation` + `@react-google-maps/api`.
- UI components with placeholders (please replace hardcoded assets/strings):
  - [`src/components/WaitingForDriver.jsx`](Frontend/src/components/WaitingForDriver.jsx)
  - [`src/components/ConfirmRidePopUp.jsx`](Frontend/src/components/ConfirmRidePopUp.jsx)
  - [`src/components/RidePopUp.jsx`](Frontend/src/components/RidePopUp.jsx)
  - [`src/components/VehiclePanel.jsx`](Frontend/src/components/VehiclePanel.jsx)

## Environment
- Vite config: [`vite.config.js`](Frontend/vite.config.js) — proxy configured for `/api`.
- Tailwind + CSS: [`src/index.css`](Frontend/src/index.css)

## Socket UX (frontend)
- On authenticated pages (`Home`, `CaptainHome`) the client must emit:
  ```js
  socket.emit('join', { userId: <id>, userType: 'user'|'captain' });
  ```
  See emission in [`src/pages/Home.jsx`](Frontend/src/pages/Home.jsx) and [`src/pages/CaptainHome.jsx`](Frontend/src/pages/CaptainHome.jsx).
- The frontend listens for events:
  - `new-ride` → [`src/pages/CaptainHome.jsx`](Frontend/src/pages/CaptainHome.jsx)
  - `ride-confirmed`, `ride-started` → [`src/pages/Home.jsx`](Frontend/src/pages/Home.jsx)
  Ensure `UserDataContext` has the correct user `_id` before emitting join.

## Development notes & TODOs
- Replace hardcoded images / text placeholders in:
  - [`src/components/LiveTracking.jsx`](Frontend/src/components/LiveTracking.jsx) — remove static center coords.
  - [`src/components/WaitingForDriver.jsx`](Frontend/src/components/WaitingForDriver.jsx)
  - [`src/components/ConfirmRidePopUp.jsx`](Frontend/src/components/ConfirmRidePopUp.jsx)
  - [`src/components/VehiclePanel.jsx`](Frontend/src/components/VehiclePanel.jsx)
  - [`src/components/RidePopUp.jsx`](Frontend/src/components/RidePopUp.jsx)
- Ensure `UserContext` default value is `null` not an empty object to avoid race conditions: see [`src/context/UserContext.jsx`](Frontend/src/context/UserContext.jsx).
- Validate join flow: socket must be connected and `user._id` must be available before emitting `join` (see [`src/pages/Home.jsx`](Frontend/src/pages/Home.jsx)).

## Troubleshooting
- User `socketId` not saved in DB:
  - Confirm client emits `join` after login and after socket connects (see [`src/context/SocketContext.jsx`](Frontend/src/context/SocketContext.jsx) and [`src/pages/Home.jsx`](Frontend/src/pages/Home.jsx)).
  - Check backend logs from [`Backend/socket.js`](Backend/socket.js) to verify server received `join`.
- 500 error on ride confirm:
  - Inspect network console where frontend calls `/rides/confirm` (see [`Frontend/src/pages/CaptainHome.jsx`](Frontend/src/pages/CaptainHome.jsx)) and backend logs in [`Backend/src/controllers/ride.controller.js`](Backend/src/controllers/ride.controller.js).

## Useful links (local files)
- Frontend entry: [`Frontend/src/main.jsx`](Frontend/src/main.jsx)
- App routing: [`Frontend/src/App.jsx`](Frontend/src/App.jsx)
- API calls example: see `axios` calls in [`Frontend/src/pages/Home.jsx`](Frontend/src/pages/Home.jsx) and [`Frontend/src/pages/CaptainHome.jsx`](Frontend/src/pages/CaptainHome.jsx)
- Vite environment: [`Frontend/.env`](Frontend/.env)

## License & contribution
- This README assumes active development. Add tests, TypeScript conversion and CI when stabilizing. Contributions: open PRs, follow component separation and add unit tests for services.

```// filepath: /home/dark/Projects/RideOn/Frontend/README.md
# RideOn — Frontend

React + Vite client for RideOn. Uses Socket.IO client for realtime notifications and Google Maps for geolocation.

## Quick start
1. Copy `.env` in `/Frontend/.env` and set:
   - VITE_BASE_URL (API base) — currently `http://localhost:9000/api/v1`
   - VITE_GOOGLE_MAPS_API_KEY
2. Install & run:
   ```sh
   cd Frontend
   npm install
   npm run dev
   ```
3. App entry: [`src/main.jsx`](Frontend/src/main.jsx). Routes defined in [`src/App.jsx`](Frontend/src/App.jsx).

## Key concepts & files
- Socket provider: [`src/context/SocketContext.jsx`](Frontend/src/context/SocketContext.jsx) — exposes [`SocketContext`](Frontend/src/context/SocketContext.jsx) and the socket instance created with `io(...)`.
- User state: [`src/context/UserContext.jsx`](Frontend/src/context/UserContext.jsx) — provides [`UserDataContext`](Frontend/src/context/UserContext.jsx).
- Captain state: [`src/context/CaptainContext.jsx`](Frontend/src/context/CaptainContext.jsx).
- Main pages:
  - Home: [`src/pages/Home.jsx`](Frontend/src/pages/Home.jsx) — emits `join` and listens to `ride-confirmed` / `ride-started`.
  - CaptainHome: [`src/pages/CaptainHome.jsx`](Frontend/src/pages/CaptainHome.jsx) — emits `join` for captain, listens for `new-ride`.
  - Riding / CaptainRiding: [`src/pages/Riding.jsx`](Frontend/src/pages/Riding.jsx), [`src/pages/CaptainRiding.jsx`](Frontend/src/pages/CaptainRiding.jsx)
- Map & tracking:
  - Map component: [`src/components/LiveTracking.jsx`](Frontend/src/components/LiveTracking.jsx) — uses `navigator.geolocation` + `@react-google-maps/api`.
- UI components with placeholders (please replace hardcoded assets/strings):
  - [`src/components/WaitingForDriver.jsx`](Frontend/src/components/WaitingForDriver.jsx)
  - [`src/components/ConfirmRidePopUp.jsx`](Frontend/src/components/ConfirmRidePopUp.jsx)
  - [`src/components/RidePopUp.jsx`](Frontend/src/components/RidePopUp.jsx)
  - [`src/components/VehiclePanel.jsx`](Frontend/src/components/VehiclePanel.jsx)

## Environment
- Vite config: [`vite.config.js`](Frontend/vite.config.js) — proxy configured for `/api`.
- Tailwind + CSS: [`src/index.css`](Frontend/src/index.css)

## Socket UX (frontend)
- On authenticated pages (`Home`, `CaptainHome`) the client must emit:
  ```js
  socket.emit('join', { userId: <id>, userType: 'user'|'captain' });
  ```
  See emission in [`src/pages/Home.jsx`](Frontend/src/pages/Home.jsx) and [`src/pages/CaptainHome.jsx`](Frontend/src/pages/CaptainHome.jsx).
- The frontend listens for events:
  - `new-ride` → [`src/pages/CaptainHome.jsx`](Frontend/src/pages/CaptainHome.jsx)
  - `ride-confirmed`, `ride-started` → [`src/pages/Home.jsx`](Frontend/src/pages/Home.jsx)
  Ensure `UserDataContext` has the correct user `_id` before emitting join.

## Development notes & TODOs
- Replace hardcoded images / text placeholders in:
  - [`src/components/LiveTracking.jsx`](Frontend/src/components/LiveTracking.jsx) — remove static center coords.
  - [`src/components/WaitingForDriver.jsx`](Frontend/src/components/WaitingForDriver.jsx)
  - [`src/components/ConfirmRidePopUp.jsx`](Frontend/src/components/ConfirmRidePopUp.jsx)
  - [`src/components/VehiclePanel.jsx`](Frontend/src/components/VehiclePanel.jsx)
  - [`src/components/RidePopUp.jsx`](Frontend/src/components/RidePopUp.jsx)
- Ensure `UserContext` default value is `null` not an empty object to avoid race conditions: see [`src/context/UserContext.jsx`](Frontend/src/context/UserContext.jsx).
- Validate join flow: socket must be connected and `user._id` must be available before emitting `join` (see [`src/pages/Home.jsx`](Frontend/src/pages/Home.jsx)).

## Troubleshooting
- User `socketId` not saved in DB:
  - Confirm client emits `join` after login and after socket connects (see [`src/context/SocketContext.jsx`](Frontend/src/context/SocketContext.jsx) and [`src/pages/Home.jsx`](Frontend/src/pages/Home.jsx)).
  - Check backend logs from [`Backend/socket.js`](Backend/socket.js) to verify server received `join`.
- 500 error on ride confirm:
  - Inspect network console where frontend calls `/rides/confirm` (see [`Frontend/src/pages/CaptainHome.jsx`](Frontend/src/pages/CaptainHome.jsx)) and backend logs in [`Backend/src/controllers/ride.controller.js`](Backend/src/controllers/ride.controller.js).

## Useful links (local files)
- Frontend entry: [`Frontend/src/main.jsx`](Frontend/src/main.jsx)
- App routing: [`Frontend/src/App.jsx`](Frontend/src/App.jsx)
- API calls example: see `axios` calls in [`Frontend/src/pages/Home.jsx`](Frontend/src/pages/Home.jsx) and [`Frontend/src/pages/CaptainHome.jsx`](Frontend/src/pages/CaptainHome.jsx)
- Vite environment: [`Frontend/.env`](Frontend/.env)

## License & contribution
- This README assumes active development. Add tests, TypeScript conversion and CI when stabilizing. Contributions: open PRs, follow component separation and add unit tests for services.
