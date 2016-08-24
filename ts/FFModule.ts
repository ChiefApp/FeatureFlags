import FFlipper from './FFlipper';
import { FFConfig } from './FFConfig';
import { DEVICES} from './Globals';
import { Feature } from './models/Feature';
import { FeatureFlags } from './models/FeatureFlags';

export namespace FFModule {
    let ffconfig: FFConfig;

    export function config(device: DEVICES = 'WEB', url = 'http://localhost', offlineFeatureLookup = null) {
        this.ffconfig = new FFConfig(device, url, offlineFeatureLookup);
    }

    export function isFeatureEnabled (
        featureName: string,
        userID: string): Promise<Boolean>
    {
        let fflipper = new FFlipper(featureName, userID, this.FFConfig);
        let featurePromise  = fflipper.getFeature();
        return featurePromise.then(feature => {
                return (feature !== undefined && feature.enabled) ? true : false;
            });
    }

    export function getFeature(
        featureName: string,
        userID?: string): Promise<Feature> {
        let fflipper = new FFlipper(featureName, userID, this.FFConfig);
        return fflipper.getFeature();
    }

    export function getEnabledFeaturesFor(
        featureName: string,
        userID?: string): Promise<FeatureFlags> {
        let fflipper = new FFlipper(featureName, userID, this.FFConfig);
        return fflipper.getEnabledFeatures();
    }

    /**
     * Convenience decorator for projects using typescript
     */

    export function Feature(featureName: string, userID: string) {
        return function (target: any, key: string) {
             let _value = target[key];

          function getter() {
            return _value;
          }

          function setter(newValue) {
            _value = getFeature(featureName, userID);
          }

          if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                set: setter
            });
          }
        };
    }

    export function FeatureFEnabled(featureName: string, userID: string) {
        return function (target: any, key: string) {
             let _value = target[key];

          function getter() {
            return _value;
          }

          function setter(newValue) {
            _value = isFeatureEnabled(featureName, userID);
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


