'use strict';
const FFlipper_1 = require('../FFlipper');
const Feature_1 = require('../models/Feature');
const FFConfig_1 = require('../FFConfig');
const ApiFeatureLookup_1 = require('../ApiFeatureLookup');
const fetchMock = require('fetch-mock');
let searchFeature = { 'featureKey': 'Search',
    'enabled': true,
    'variationName': 'v2',
    'configurationData': { 'this': 'that' } };
describe('FFlipper:', () => {
    let config;
    beforeEach(() => {
        this.config = new FFConfig_1.FFConfig('WEB', 'http://localhost:1337', undefined);
        fetchMock.mock('*', JSON.stringify(searchFeature), { method: 'GET' });
    });
    it('should return a feature promise', (done) => {
        let fflip = new FFlipper_1.default('search', '1', this.config);
        fflip.isOffline = false;
        fflip.getFeature().then(feature => {
            console.log(feature);
            expect(feature instanceof Feature_1.Feature).toBe(true);
            done();
        });
    });
    it('should return ApiFeatureLookup object if offline is false', () => {
        let fflip = new FFlipper_1.default('search', '1', this.config);
        fflip.isOffline = false;
        let featureLookup = fflip.getFeatureLookupRepo();
        expect(featureLookup instanceof ApiFeatureLookup_1.ApiFeatureLookup).toBe(true);
    });
});
//# sourceMappingURL=FFlipper.spec.js.map