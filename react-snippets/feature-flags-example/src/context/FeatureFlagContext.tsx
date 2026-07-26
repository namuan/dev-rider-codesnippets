import {createContext, useContext} from "react";
import type {CheckoutVariant, FeatureFlags} from "../types/FeatureFlags.ts";

const featureFlags: FeatureFlags = {
    newFeature: import.meta.env.VITE_FEATURE_FLAGS_NEW_FEATURE === "true",
    experimentalUI: import.meta.env.VITE_FEATURE_FLAGS_EXPERIMENTAL_UI === "true",
    checkoutVariant: import.meta.env.VITE_FEATURE_FLAGS_CHECKOUT_VARIANT as CheckoutVariant,
};

const FeatureFlagContext = createContext<FeatureFlags>(featureFlags);

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({children}) =>
    (
        <FeatureFlagContext.Provider value={featureFlags}>
            {children}
        </FeatureFlagContext.Provider>
    );

export const useFeatureFlag = <T extends keyof FeatureFlags>(flagName: T): FeatureFlags[T] => {
    const flags = useContext(FeatureFlagContext);
    return flags[flagName];
}