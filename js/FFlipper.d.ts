import { Feature } from './models/Feature';
import { FeatureFlags } from './models/FeatureFlags';
import { IFeatureLookup } from './IFeatureLookup';
import { FFConfig } from './FFConfig';
export default class FFlipper {
    feature: Feature;
    fflags: FeatureFlags;
    isOffline: boolean;
    config: FFConfig;
    featureName: string;
    userID: string;
    featureLookupRepo: IFeatureLookup;
    constructor(featureName: string, userID: string, config: FFConfig);
    getFeature(): Promise<Feature>;
    getEnabledFeatures(): Promise<FeatureFlags>;
    getFeatureLookupRepo(): IFeatureLookup;
}
