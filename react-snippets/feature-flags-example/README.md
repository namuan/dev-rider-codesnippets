# Feature Flags Example

A React TypeScript application demonstrating how to implement feature flags using environment variables and React Context.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd feature-flags-example
```

2. Install dependencies
```bash
npm install
```

3. Create environment configuration files
```bash
mkdir config
```

4. Create your environment files (see Configuration section below)

5. Start the development server
```bash
npm run dev
```

## Configuration

### Environment Files

Create environment files in the `config/` directory:

#### `config/.env.development`
```env
VITE_FEATURE_FLAGS_NEW_FEATURE=true
VITE_FEATURE_FLAGS_EXPERIMENTAL_UI=false
VITE_FEATURE_FLAGS_CHECKOUT_VARIANT=variantA
```

#### `config/.env.production`
```env
VITE_FEATURE_FLAGS_NEW_FEATURE=false
VITE_FEATURE_FLAGS_EXPERIMENTAL_UI=false
VITE_FEATURE_FLAGS_CHECKOUT_VARIANT=control
```

#### `config/.env.staging`
```env
VITE_FEATURE_FLAGS_NEW_FEATURE=true
VITE_FEATURE_FLAGS_EXPERIMENTAL_UI=true
VITE_FEATURE_FLAGS_CHECKOUT_VARIANT=variantB
```

### Environment Variable Naming Convention

All feature flag environment variables must:
- Start with `VITE_FEATURE_FLAGS_` prefix
- Use UPPER_SNAKE_CASE naming
- Have corresponding TypeScript definitions

## Usage

### Basic Feature Flag Usage

```tsx
import { useFeatureFlag } from './context/FeatureFlagContext';

const MyComponent = () => {
  const isNewFeatureEnabled = useFeatureFlag('newFeature');
  
  return (
    <div>
      {isNewFeatureEnabled ? (
        <NewFeatureComponent />
      ) : (
        <OldFeatureComponent />
      )}
    </div>
  );
};
```

### Variant Testing

```tsx
import { useFeatureFlag } from './context/FeatureFlagContext';

const CheckoutComponent = () => {
  const checkoutVariant = useFeatureFlag('checkoutVariant');
  
  switch (checkoutVariant) {
    case 'variantA':
      return <CheckoutVariantA />;
    case 'variantB':
      return <CheckoutVariantB />;
    default:
      return <CheckoutControl />;
  }
};
```

### Multiple Flags

```tsx
import { useFeatureFlag } from './context/FeatureFlagContext';

const Dashboard = () => {
  const showNewFeature = useFeatureFlag('newFeature');
  const showExperimentalUI = useFeatureFlag('experimentalUI');
  const checkoutVariant = useFeatureFlag('checkoutVariant');
  
  return (
    <div className={showExperimentalUI ? 'experimental-layout' : 'standard-layout'}>
      <h1>Dashboard</h1>
      {showNewFeature && <NewDashboardWidget />}
      <CheckoutButton variant={checkoutVariant} />
    </div>
  );
};
```

## Adding New Feature Flags

### 1. Update TypeScript Types

Add your new flag to `src/types/FeatureFlags.ts`:

```typescript
export interface FeatureFlags {
  newFeature: boolean;
  experimentalUI: boolean;
  checkoutVariant: CheckoutVariant;
  // Add your new flag here
  myNewFlag: boolean;
  anotherVariant: 'option1' | 'option2' | 'option3';
}
```

### 2. Update Context Configuration

Add the environment variable mapping in `src/context/FeatureFlagContext.tsx`:

```typescript
const featureFlags: FeatureFlags = {
  newFeature: import.meta.env.VITE_FEATURE_FLAGS_NEW_FEATURE === "true",
  experimentalUI: import.meta.env.VITE_FEATURE_FLAGS_EXPERIMENTAL_UI === "true",
  checkoutVariant: import.meta.env.VITE_FEATURE_FLAGS_CHECKOUT_VARIANT as CheckoutVariant,
  // Add your new flag mapping
  myNewFlag: import.meta.env.VITE_FEATURE_FLAGS_MY_NEW_FLAG === "true",
  anotherVariant: import.meta.env.VITE_FEATURE_FLAGS_ANOTHER_VARIANT as 'option1' | 'option2' | 'option3',
};
```

### 3. Add Environment Variables

Update your environment files:

```env
# Add to all your .env files
VITE_FEATURE_FLAGS_MY_NEW_FLAG=true
VITE_FEATURE_FLAGS_ANOTHER_VARIANT=option1
```

### 4. Use in Components

```tsx
const MyComponent = () => {
  const myNewFlag = useFeatureFlag('myNewFlag');
  const anotherVariant = useFeatureFlag('anotherVariant');
  
  // Use your flags...
};
```

## Project Structure

```
src/
├── components/
│   ├── FeatureToggle.tsx     # Example component using feature flags
│   ├── NewFeature.tsx        # Component shown when flag is enabled
│   └── OldFeature.tsx        # Component shown when flag is disabled
├── context/
│   └── FeatureFlagContext.tsx # React Context and custom hook
├── types/
│   └── FeatureFlags.ts       # TypeScript type definitions
├── App.tsx                   # Main application component
└── main.tsx                  # Application entry point
```

## Best Practices

### 1. Naming Conventions
- Use descriptive, kebab-case names for flags: `new-checkout-flow`, `experimental-search`
- Environment variables should be UPPER_SNAKE_CASE: `VITE_FEATURE_FLAGS_NEW_CHECKOUT_FLOW`

### 2. Flag Lifecycle
- Start with flags disabled in production
- Enable in development/staging for testing
- Gradually roll out to production
- Remove flags and old code paths after full rollout

### 3. Testing
- Test both enabled and disabled states
- Use data-testid attributes for reliable testing
- Mock feature flags in unit tests

### 4. Documentation
- Document the purpose and expected behavior of each flag
- Include rollout timeline and success criteria
- Note any dependencies between flags

## Testing

### Running Tests
```bash
npm test
```

### Testing with Different Flag States

Create test utilities to mock feature flags:

```typescript
// test-utils.tsx
import { FeatureFlagProvider } from '../src/context/FeatureFlagContext';

export const renderWithFlags = (component, flagOverrides = {}) => {
  const mockFlags = {
    newFeature: false,
    experimentalUI: false,
    checkoutVariant: 'control',
    ...flagOverrides,
  };
  
  return render(
    <FeatureFlagProvider value={mockFlags}>
      {component}
    </FeatureFlagProvider>
  );
};
```

## Build and Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Environment-Specific Builds

Set the NODE_ENV or create environment-specific build scripts:

```json
{
  "scripts": {
    "build:staging": "NODE_ENV=staging npm run build",
    "build:production": "NODE_ENV=production npm run build"
  }
}
```

## Troubleshooting

### Common Issues

1. **Feature flag not updating**: Ensure environment variables start with `VITE_` prefix
2. **TypeScript errors**: Check that flag names match between types and context
3. **Build fails**: Verify all environment files exist and have required variables

### Debug Mode

Add logging to see current flag values:

```typescript
// In development only
if (import.meta.env.DEV) {
  console.log('Feature Flags:', featureFlags);
}
```
