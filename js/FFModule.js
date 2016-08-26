'use strict';
const ApiFeatureLookup_1 = require('./ApiFeatureLookup');
const FFConfig_1 = require('./FFConfig');
class FFModule {
    // test
    constructor(device, url, customFeatureLookup) {
        this.isOffline = false;
        this.featureLookupRepo = undefined;
        this.config = new FFConfig_1.FFConfig(device, url, customFeatureLookup);
    }
    /**
     * Get Feature
     */
    getFeature(featureName, userID) {
        // check for custom feature lookup
        let apiFeatureLookup = new ApiFeatureLookup_1.ApiFeatureLookup(this.config.url, this.config.device);
        if (this.config.customFeatureLookup !== undefined) {
            let feature = this.config.customFeatureLookup.getFeature(this.featureName, this.userID);
            feature.then(f => {
                return apiFeatureLookup.getFeature(this.featureName, this.userID);
            }).catch(err => {
                console.error('Error when trying to get a feature from CustomFeatureLookup class ' + err);
            });
        }
        else {
            return apiFeatureLookup.getFeature(this.featureName, this.userID);
        }
    }
    /**
     * Get all enabled feature for a userID
     */
    getEnabledFeaturesFor(userID) {
        let apiFeatureLookup = new ApiFeatureLookup_1.ApiFeatureLookup(this.config.url, this.config.device);
        return apiFeatureLookup.getEnabledFeaturesFor(userID);
    }
    isFeatureEnabled(featureName, userID) {
        let featurePromise = this.getFeature(featureName, userID);
        return featurePromise.then(feature => {
            return (feature !== undefined && feature.enabled) ? true : false;
        });
    }
    /**
     * Decorator function to assign Feature to a property
     */
    Feature(featureName, userID) {
        return (target, key) => {
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
    FeatureFEnabled(featureName, userID) {
        return (target, key) => {
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
exports.FFModule = FFModule;
//# sourceMappingURL=FFModule.js.map