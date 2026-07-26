# Tanstack React Query Product Viewer

## Application Overview

This application demonstrates a product viewer using React, TypeScript, and Vite, with data fetched from the DummyJSON API. It includes authentication via token-based login using predefined credentials, and leverages React Query for data fetching and state management.

Key features:

- Token-based authentication using `@tanstack/react-query`
- Protected API requests with Bearer tokens
- Automatic token refresh on 401 errors
- Product navigation with previous/next controls
- Detailed product display including reviews and metadata

### Authentication Flow

The app uses hardcoded credentials (`emilys` / `emilyspass`) to authenticate and retrieve a token from `/auth/login`. This token is then used in subsequent requests to fetch product data.

### Components

- `App`: Main component with navigation controls
- `ProductDetail`: Displays full product information
- `TokenProvider`: Context provider for authentication state
- `useProduct`: Custom hook for fetching product data with authentication

### Hooks

- `useProduct`: Fetches product by ID using React Query
- `useToken`: Handles token retrieval and caching

### API Client

The `apiClient` in `src/api/apiClient.ts` is configured with an interceptor that automatically invalidates the token query on 401 responses, triggering a refresh.
