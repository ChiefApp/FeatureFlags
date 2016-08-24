"use strict";
class Feature {
    constructor(featureKey, enabled, variationName, configurationData, children) {
        this.featureKey = featureKey;
        this.enabled = enabled;
        this.variationName = variationName;
        this.configurationData = configurationData;
        this.children = children;
    }
    static fromJson(json) {
        let data = JSON.parse(json);
        let children = [];
        if (data.featureKey == undefined
            || data.enabled == undefined
            || data.variationName == undefined
            || data.configurationData == undefined) {
            return;
        }
        return new Feature(data.featureKey, data.enabled, data.variationName, data.configurationData, children);
    }
}
exports.Feature = Feature;
//# sourceMappingURL=Feature.js.map