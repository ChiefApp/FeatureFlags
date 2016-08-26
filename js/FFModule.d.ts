import { Feature } from './models/Feature';
import { FeatureFlags } from './models/FeatureFlags';
import { IFeatureLookup } from './IFeatureLookup';
import { DEVICE } from './Globals';
import { FFConfig } from './FFConfig';
export declare class FFModule {
    feature: Feature;
    fflags: FeatureFlags;
    config: FFConfig;
    featureName: string;
    userID: string;
    featureLookupRepo: IFeatureLookup;
    constructor(device: DEVICE, url: string, customFeatureLookup?: IFeatureLookup);
    /**
     * Get Feature
     */
    getFeature(featureName: string, userID?: string): Promise<Feature>;
    /**
     * Get all enabled feature for a userID
     */
    getEnabledFeaturesFor(userID: any): Promise<FeatureFlags>;
    isFeatureEnabled(featureName: string, userID: string): Promise<Boolean>;
    /**
     * Decorator function to assign Feature to a property
     */
    Feature(featureName: string, userID: string): (target: any, key: string) => void;
    /**
     * Decorator function to check if a feature is enabled or disabled
     */
    FeatureFEnabled(featureName: string, userID: string): (target: any, key: string) => void;
}
