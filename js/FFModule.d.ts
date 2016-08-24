import { DEVICES } from './Globals';
import { Feature } from './models/Feature';
import { FeatureFlags } from './models/FeatureFlags';
export declare namespace FFModule {
    function config(device?: DEVICES, url?: string, offlineFeatureLookup?: any): void;
    function isFeatureEnabled(featureName: string, userID: string): Promise<Boolean>;
    function getFeature(featureName: string, userID?: string): Promise<Feature>;
    function getEnabledFeaturesFor(featureName: string, userID?: string): Promise<FeatureFlags>;
    /**
     * Convenience decorator for projects using typescript
     */
    function Feature(featureName: string, userID: string): (target: any, key: string) => void;
    function FeatureFEnabled(featureName: string, userID: string): (target: any, key: string) => void;
}
