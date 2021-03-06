'use strict';
const FFModule_1 = require('../FFModule');
const Feature_1 = require('../models/Feature');
const FeatureFlags_1 = require('../models/FeatureFlags');
const FFConfig_1 = require('../FFConfig');
const fetchMock = require('fetch-mock');
let searchFeature = { 'featureKey': 'Search',
    'enabled': true,
    'variationName': 'v2',
    'configurationData': { 'this': 'that' } };
let fflagsJSON = {
    'featureFlags': {
        'application': 'www.appKey',
        'children': [
            {
                'feature': {
                    'featureKey': 'Search',
                    'enabled': true,
                    'variationName': 'v2',
                    'configurationData': { 'this': 'that' }
                }
            },
            {
                'featureGrouping': {
                    'featureGroupKey': 'MarketingCentre',
                    'enabled': true,
                    'children': [
                        {
                            'feature': {
                                'featureKey': 'Campaigns',
                                'enabled': true,
                                'variationName': 'v2',
                                'configurationData': { 'this': 'that' }
                            }
                        }
                    ]
                }
            }
        ] } };
describe('FFModule:', () => {
    let config;
    beforeEach(() => {
        this.config = new FFConfig_1.FFConfig('WEB', 'http://localhost:1337', undefined);
        fetchMock.mock('^http://localhost:1337/Search', JSON.stringify(searchFeature), { method: 'GET' });
        fetchMock.mock('^http://404notfoundfeature', 404, { method: 'GET' });
        fetchMock.mock('^http://localhost:1337/features', JSON.stringify(fflagsJSON), { method: 'GET' });
        fetchMock.mock('^http://localhost:1337/NonExistentFeature', JSON.stringify(fflagsJSON), { method: 'GET' });
    });
    it('should return a feature promise', (done) => {
        let fflip = new FFModule_1.FFModule('WEB', 'http://localhost:1337', undefined);
        let featurePromise = fflip.getFeature('Search', '1');
        expect(featurePromise instanceof Promise).toBe(true);
        fflip.getFeature('Search', '1').then(feature => {
            expect(feature instanceof Feature_1.Feature).toBe(true);
            done();
        });
    });
    it('should throw an error for not found url', (done) => {
        let fflip = new FFModule_1.FFModule('WEB', 'http://404notfoundfeature', undefined);
        fflip.getFeature('Search', '1').catch(err => {
            expect(err instanceof Error).toBe(true);
            done();
        });
    });
    it('should return a FeatureFlags promise', (done) => {
        let fflip = new FFModule_1.FFModule('WEB', 'http://localhost:1337', undefined);
        let featurePromise = fflip.getEnabledFeaturesFor('1');
        expect(featurePromise instanceof Promise).toBe(true);
        featurePromise.then(fflags => {
            expect(fflags instanceof FeatureFlags_1.FeatureFlags).toBe(true);
            done();
        });
    });
    describe("Is Feature Enabled:", () => {
        it('should return Promise<Boolean>', (done) => {
            let fflip = new FFModule_1.FFModule('WEB', 'http://localhost:1337', undefined);
            let isEnabled = fflip.isFeatureEnabled('Search', '1');
            expect(isEnabled instanceof Promise).toBe(true);
            isEnabled.then(enabled => {
                expect(enabled).toBe(true);
                done();
            });
        });
        it('should return Promise<false> if the feature is not available', (done) => {
            let fflip = new FFModule_1.FFModule('WEB', 'http://localhost:1337', undefined);
            let isEnabled = fflip.isFeatureEnabled('NonExistentFeature', '1');
            expect(isEnabled instanceof Promise).toBe(true);
            isEnabled.then(enabled => {
                expect(enabled).toBe(false);
                done();
            });
        });
    });
    describe('should return ', () => {
        it('should', (done) => {
            let fflip = new FFModule_1.FFModule('WEB', 'http://localhost:1337', undefined);
            let feature = fflip.Feature('Search', '1');
            // TODO: test annotation
        });
    });
});
let fflip = new FFModule_1.FFModule('WEB', 'http://localhost:1337', undefined);
//# sourceMappingURL=FFModule.spec.js.map