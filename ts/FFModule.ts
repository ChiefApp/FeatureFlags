'use strict';
import { Feature } from './models/Feature';
import { FeatureGrouping } from './models/FeatureGrouping';
import { FeatureFlags } from './models/FeatureFlags';
import { IFeatureLookup } from './IFeatureLookup';
import { ApiFeatureLookup } from './ApiFeatureLookup';
import { DEVICES }  from './Globals';
import { FFConfig } from './FFConfig';

export class FFModule {
    feature: Feature;
    fflags: FeatureFlags;
    isOffline: boolean = false;
    config: FFConfig;
    featureName: string;
    userID: string;
    featureLookupRepo: IFeatureLookup = undefined;

    // test
    constructor(device: DEVICES, url: string, customFeatureLookup?: IFeatureLookup) {
        this.config = new FFConfig(device, url, customFeatureLookup);
    }

    getFeature(
        featureName: string,
        userID?: string): Promise<Feature> {
        // check for custom feature lookup
        let apiFeatureLookup = new ApiFeatureLookup(this.config.url, this.config.device);
        if (this.config.customFeatureLookup !== undefined) {
            let feature = this.config.customFeatureLookup.getFeature(this.featureName, this.userID);
            feature.then(f => {
                return apiFeatureLookup.getFeature(this.featureName, this.userID);
            }).catch(err => {
                console.error('Error when trying to get a feature from CustomFeatureLookup class ' + err);
            });
        } else {
            return apiFeatureLookup.getFeature(this.featureName, this.userID);
        }
    }

    getEnabledFeaturesFor(userID): Promise<FeatureFlags> {
        let apiFeatureLookup = new ApiFeatureLookup(this.config.url, this.config.device);
        return apiFeatureLookup.getEnabledFeaturesFor(userID);
    }

    isFeatureEnabled (
        featureName: string,
        userID: string): Promise<Boolean> {
        let featurePromise  = this.getFeature(featureName, userID);
        return featurePromise.then(feature => {
            return (feature !== undefined && feature.enabled) ? true : false;
        });
    }

     Feature(featureName: string, userID: string) {
        return function (target: any, key: string) {
             let _value = target[key];

          function getter() {
            return _value;
          }

          function setter(newValue) {
            _value = this.getFeature(featureName, userID);
          }

          if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                set: setter
            });
          }
        };
    }

    FeatureFEnabled(featureName: string, userID: string) {
        return function (target: any, key: string) {
             let _value = target[key];

          function getter() {
            return _value;
          }

          function setter(newValue) {
            _value = this.isFeatureEnabled(featureName, userID);
          }

          if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                set: setter
            });
          }
        };
    }
}
