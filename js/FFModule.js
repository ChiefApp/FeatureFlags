"use strict";
const FFlipper_1 = require('./FFlipper');
const FFConfig_1 = require('./FFConfig');
var FFModule;
(function (FFModule) {
    let ffconfig;
    function config(device = 'WEB', url = 'http://localhost', offlineFeatureLookup = null) {
        this.ffconfig = new FFConfig_1.FFConfig(device, url, offlineFeatureLookup);
    }
    FFModule.config = config;
    function isFeatureEnabled(featureName, userID) {
        let fflipper = new FFlipper_1.default(featureName, userID, this.FFConfig);
        let featurePromise = fflipper.getFeature();
        return featurePromise.then(feature => {
            return (feature !== undefined && feature.enabled) ? true : false;
        });
    }
    FFModule.isFeatureEnabled = isFeatureEnabled;
    function getFeature(featureName, userID) {
        let fflipper = new FFlipper_1.default(featureName, userID, this.FFConfig);
        return fflipper.getFeature();
    }
    FFModule.getFeature = getFeature;
    function getEnabledFeaturesFor(featureName, userID) {
        let fflipper = new FFlipper_1.default(featureName, userID, this.FFConfig);
        return fflipper.getEnabledFeatures();
    }
    FFModule.getEnabledFeaturesFor = getEnabledFeaturesFor;
    /**
     * Convenience decorator for projects using typescript
     */
    function Feature(featureName, userID) {
        return function (target, key) {
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
    FFModule.Feature = Feature;
    function FeatureFEnabled(featureName, userID) {
        return function (target, key) {
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
    FFModule.FeatureFEnabled = FeatureFEnabled;
})(FFModule = exports.FFModule || (exports.FFModule = {}));
//# sourceMappingURL=FFModule.js.map