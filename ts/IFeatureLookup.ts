import { Feature } from './models/Feature';
import { FeatureFlags } from './models/FeatureFlags';

export interface IFeatureLookup {
    getFeature(featureName: string, userID: string): Promise<Feature>;
    getEnabledFeaturesFor(userID): Promise<FeatureFlags>;
}
