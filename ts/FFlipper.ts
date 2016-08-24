import { Feature } from './models/Feature';
import { FeatureGrouping } from './models/FeatureGrouping';
import { FeatureFlags } from './models/FeatureFlags';
import { IFeatureLookup } from './IFeatureLookup';
import { ApiFeatureLookup } from './ApiFeatureLookup';
import { DEVICES }  from './Globals';
import { FFConfig } from './FFConfig';

export default class FFlipper {
    feature: Feature;
    fflags: FeatureFlags;
    isOffline: boolean = false;
    config: FFConfig;
    featureName: string;
    userID: string;
    featureLookupRepo: IFeatureLookup = undefined;

    constructor(featureName: string, userID: string, config: FFConfig) {
        this.config = config;
        this.featureLookupRepo = this.getFeatureLookupRepo();
        this.featureName = featureName;
        this.userID = userID;
    }

    getFeature(): Promise<Feature> {
        return this.featureLookupRepo.getFeature(this.featureName, this.userID);
    }

    getEnabledFeatures(): Promise<FeatureFlags> {
        return this.featureLookupRepo.getEnabledFeaturesFor(this.userID);
    }

    getFeatureLookupRepo(): IFeatureLookup {
        if (this.isOffline) {
            if (this.config.offlineFeatureLookup !== undefined) {
                return this.config.offlineFeatureLookup;
            } else {
                return;
            }
        } else {
            return new ApiFeatureLookup(this.config.url, this.config.device);
        }
    }
}
