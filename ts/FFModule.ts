'use strict';
import { Feature } from './models/Feature';
import { FeatureGrouping } from './models/FeatureGrouping';
import { FeatureFlags } from './models/FeatureFlags';
import { IFeatureLookup } from './IFeatureLookup';
import { ApiFeatureLookup } from './ApiFeatureLookup';
import { DEVICE }  from './Globals';
import { FFConfig } from './FFConfig';

export class FFModule {
    feature: Feature;
    fflags: FeatureFlags;
    config: FFConfig;
    featureName: string;
    userID: string;
    featureLookupRepo: IFeatureLookup = undefined;

    constructor(device: DEVICE, url: string, customFeatureLookup?: IFeatureLookup) {
        this.config = new FFConfig(device, url, customFeatureLookup);
    }

    /**
     * Get Feature
     */
    getFeature(
        featureName: string,
        userID?: string): Promise<Feature> {
        // check for custom feature lookup
        let apiFeatureLookup = new ApiFeatureLookup(this.config.url, this.config.device);

        if (this.config.customFeatureLookup !== undefined) {
            let feature = this.config.customFeatureLookup.getFeature(featureName, this.userID);
            feature.then(f => {
                return apiFeatureLookup.getFeature(featureName, userID);
            }).catch(err => {
                console.error('Error when trying to get a feature from CustomFeatureLookup class ' + err);
            });
        } else {
            return apiFeatureLookup.getFeature(featureName, userID);
        }
    }

    /**
     * Get all enabled feature for a userID
     */
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

    /**
     * Decorator function to assign Feature to a property
     */
    Feature(featureName: string, userID: string) {
        return (target: any, key: string) => {
          let _value = target[key];

          // if there is no value assigned by default then assign a default
          if (_value === '' || _value === undefined) {
            _value = this.getFeature(featureName, userID);
          }

          function getter() {
            return _value;
          }

          function setter(newValue) {
            _value = newValue;
          }

          if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                set: setter
            });
          }
        };
    }

    /**
     * Decorator function to check if a feature is enabled or disabled
     */
    FeatureFEnabled(featureName: string, userID: string) {
        return (target: any, key: string) => {
          let _value = target[key];

          if (_value === '' || _value === undefined) {
            _value = this.getFeature(featureName, userID);
          }

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
