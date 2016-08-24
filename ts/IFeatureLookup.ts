import { Feature } from './models/Feature';
import { FeatureGrouping } from './models/FeatureGrouping';
import { FeatureFlags } from './models/FeatureFlags';
import { DEVICES }  from './Globals';

export interface IFeatureLookup {
    getFeature(featureName: string, userID: string): Promise<Feature>;
    getEnabledFeaturesFor(userID): Promise<FeatureFlags>;
}
