export type CheckoutVariant = 'control' | 'variantA' | 'variantB';

export interface FeatureFlags {
    newFeature: boolean;
    experimentalUI: boolean;
    checkoutVariant: CheckoutVariant;
}
