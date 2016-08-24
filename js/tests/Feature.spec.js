'use strict';
const Feature_1 = require('../models/Feature');
describe('Feature model', () => {
    // load json
    it('should return a feature object', () => {
        let json = {
            'enabled': true,
            'featureKey': 'Search',
            'variationName': 'VariationA',
            'configurationData': {}
        };
        let jsonString = JSON.stringify(json);
        // use fromJson
        let feature = Feature_1.Feature.fromJson(jsonString);
        expect(feature instanceof Feature_1.Feature).toEqual(true);
        expect(feature.enabled).toBe(true);
        expect(feature.featureKey).toBe('Search');
        expect(feature.variationName).toBe('VariationA');
    });
    it('should return an empty object if one object is not available', () => {
        let json = {
            'featureKey': 'NewSearch',
            'variationName': 'VariationA',
            'configurationData': {}
        };
        let jsonString = JSON.stringify(json);
        let feature = Feature_1.Feature.fromJson(jsonString);
        console.log(feature);
        expect(feature === undefined).toEqual(true);
    });
});
//# sourceMappingURL=Feature.spec.js.map