"use strict";
const Feature_1 = require('./Feature');
class FeatureGrouping {
    constructor(featureGroupKey, enabled, children) {
        this.featureGroupKey = featureGroupKey;
        this.enabled = enabled;
        this.children = children;
    }
    static fromJson(json) {
        let data = JSON.parse(json);
        let children = new Array();
        for (let child of data['children']) {
            if (child['feature'] != undefined) {
                let feature1 = Feature_1.Feature.fromJson(JSON.stringify(child['feature']));
                children.push(feature1);
            }
        }
        return new FeatureGrouping(data.featureGroupKey, data.enabled, children);
    }
}
exports.FeatureGrouping = FeatureGrouping;
//# sourceMappingURL=FeatureGrouping.js.map