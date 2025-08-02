# React + TypeScript + Vite with Feature Flags

This project demonstrates a simple and effective **feature flag system** that enables **gradual feature rollout** based on user ID. It is implemented using:

- A lightweight hashing function to convert user IDs into numeric values
- A percentage-based rollout strategy to determine if a feature should be enabled
- React state to dynamically show/hide features based on the current user

---

## 🔧 Feature Flag Logic

The core logic is implemented in [`src/featureFlags.ts`](src/featureFlags.ts) with two functions:

1. **`simpleHash(str: string, maxValue: number): number`**  
   Generates a deterministic numeric hash in the range `[0, maxValue - 1]` from a string input.

2. **`isFeatureEnabled(userId: string, rolloutPercentage: number): boolean`**  
   Uses `simpleHash` to determine whether a feature should be enabled for a given user, based on the rollout percentage.

**How it works:**

- User ID → `simpleHash` → value between 0–99  
- If the value < `rolloutPercentage`, the feature is enabled  
- This ensures consistent behavior per user and supports gradual feature rollout

---

## 🚀 Getting Started

1. **Clone the repository**
```bash
   git clone https://your-repo-url
   cd your-project
````

2. **Install dependencies**

```bash
   npm install
```

3. **Start the development server**

```bash
   npm run dev
```

---

## 🧪 How to Use the Demo

1. Launch the app and enter a **User ID**
2. The app computes:

   * A hash value using `simpleHash`
   * Whether the feature should be **enabled**
3. You’ll see:

   * Your User ID
   * The computed hash value (0–99)
   * The current rollout percentage
   * Whether the feature is enabled for the entered User ID

Try different user IDs to observe how the feature flag behaves for various users!

---

## 📁 File Overview

* **`src/App.tsx`** – UI and feature flag check logic
* **`src/featureFlags.ts`** – Contains `simpleHash` and `isFeatureEnabled` functions

---

## 🎯 Example Use Case

Want to release a new feature to just 10% of your users?
Update the `rolloutPercentage` value in `App.tsx` and you're good to go.

This is a scalable way to test new features in production without exposing them to your entire user base.
