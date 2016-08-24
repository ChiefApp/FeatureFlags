"use strict";
const ApiFeatureLookup_1 = require('./ApiFeatureLookup');
class FFlipper {
    constructor(featureName, userID, config) {
        this.isOffline = false;
        this.featureLookupRepo = undefined;
        this.config = config;
        this.featureLookupRepo = this.getFeatureLookupRepo();
        this.featureName = featureName;
        this.userID = userID;
    }
    getFeature() {
        return this.featureLookupRepo.getFeature(this.featureName, this.userID);
    }
    getEnabledFeatures() {
        return this.featureLookupRepo.getEnabledFeaturesFor(this.userID);
    }
    getFeatureLookupRepo() {
        if (this.isOffline) {
            if (this.config.offlineFeatureLookup !== undefined) {
                return this.config.offlineFeatureLookup;
            }
            else {
                return;
            }
        }
        else {
            return new ApiFeatureLookup_1.ApiFeatureLookup(this.config.url, this.config.device);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FFlipper;
//# sourceMappingURL=FFlipper.js.map