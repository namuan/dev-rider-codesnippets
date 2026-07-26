# TanStack React Router App with TypeScript

This is a simple React application built using **Vite**, **TypeScript**, and **TanStack Router**. The app demonstrates client-side routing, data loading via API calls, and type-safe route handling.

## Features

- **Routing**: Uses `@tanstack/react-router` for efficient, type-safe routing.
- **Data Loading**: Loads user data from the [DummyJSON API](https://dummyjson.com/docs/users) on route navigation.
- **Type Safety**: Full TypeScript support for loader data and components.
- **Navigation**: Supports intent-based preloading and dynamic parameterized routes (`/profile/$userId`).

## Pages

- **Home (`/`)**: Displays a list of users fetched from the API. Each user is a link to their profile.
- **Profile (`/profile/:userId`)**: Shows details of a specific user by ID. Includes error handling for invalid IDs.

## Components

- `Root`: Main layout with navigation.
- `Home`: Displays the list of users.
- `Profile`: Displays individual user details with a "Go Home" button.

## Setup

To run this app:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.
