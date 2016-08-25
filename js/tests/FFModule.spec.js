'use strict';
const FFConfig_1 = require('../FFConfig');
const fetchMock = require('fetch-mock');
let searchFeature = { 'featureKey': 'Search',
    'enabled': true,
    'variationName': 'v2',
    'configurationData': { 'this': 'that' } };
describe('FFModule:', () => {
    let config;
    beforeEach(() => {
        this.config = new FFConfig_1.FFConfig('WEB', 'http://localhost:1337', undefined);
        fetchMock.mock('*', JSON.stringify(searchFeature), { method: 'GET' });
    });
    // it('should return a feature promise', (done) => {
    //     let fflip = new FFModule('search', '1', this.config);
    //     fflip.isOffline = false;
    //     fflip.getFeature().then(feature => {
    //         console.log(feature);
    //         expect(feature instanceof Feature).toBe(true);
    //         done();
    //     });
    // });
    // it('should return ApiFeatureLookup object if offline is false', () => {
    //     let fflip = new FFModule('search', '1', this.config);
    //     fflip.isOffline = false;
    //     let featureLookup = fflip.getFeatureLookupRepo();
    //     expect(featureLookup instanceof ApiFeatureLookup).toBe(true);
    // });
});
//# sourceMappingURL=FFModule.spec.js.map