import { Feature } from './models/Feature';
import { FeatureFlags } from './models/FeatureFlags';
import { IFeatureLookup } from './IFeatureLookup';
import { DEVICES } from './Globals';
import { FFConfig } from './FFConfig';
export declare class FFModule {
    feature: Feature;
    fflags: FeatureFlags;
    isOffline: boolean;
    config: FFConfig;
    featureName: string;
    userID: string;
    featureLookupRepo: IFeatureLookup;
    constructor(device: DEVICES, url: string, customFeatureLookup?: IFeatureLookup);
    getFeature(featureName: string, userID?: string): Promise<Feature>;
    getEnabledFeaturesFor(userID: any): Promise<FeatureFlags>;
    isFeatureEnabled(featureName: string, userID: string): Promise<Boolean>;
    Feature(featureName: string, userID: string): (target: any, key: string) => void;
    FeatureFEnabled(featureName: string, userID: string): (target: any, key: string) => void;
}
