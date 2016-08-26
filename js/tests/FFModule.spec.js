'use strict';
const FFModule_1 = require('../FFModule');
const Feature_1 = require('../models/Feature');
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
    it('should return a feature promise', (done) => {
        let fflip = new FFModule_1.FFModule('WEB', 'http://localhost:1337', undefined);
        fflip.getFeature('Search', '1').then(feature => {
            console.log(feature);
            expect(feature instanceof Feature_1.Feature).toBe(true);
            done();
        });
    });
});
//# sourceMappingURL=FFModule.spec.js.map