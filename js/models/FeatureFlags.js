"use strict";
const FeatureGrouping_1 = require('./FeatureGrouping');
const Feature_1 = require('./Feature');
class FeatureFlags {
    constructor(application, children) {
        this.application = application;
        this.children = children;
    }
    static fromJSON(json) {
        let data = JSON.parse(json)['featureFlags'];
        let children = [];
        for (let child of data['children']) {
            // console.log(child);
            if (child['feature'] != undefined) {
                let feature = Feature_1.Feature.fromJson(JSON.stringify(child['feature']));
                // console.log(feature);
                children.push(feature);
            }
            else if (child['featureGrouping'] != undefined) {
                let featureGroup = FeatureGrouping_1.FeatureGrouping.fromJson(JSON.stringify(child['featureGrouping']));
                children.push(featureGroup);
            }
        }
        return new FeatureFlags(data.application, children);
    }
}
exports.FeatureFlags = FeatureFlags;
//# sourceMappingURL=FeatureFlags.js.map