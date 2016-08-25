'use strict';

import {FFModule} from '../FFModule';
import {Feature} from '../models/Feature';
import {FFConfig} from '../FFConfig';
import {ApiFeatureLookup} from '../ApiFeatureLookup';
import * as fetchMock from 'fetch-mock';


let searchFeature = {'featureKey': 'Search',
                            'enabled': true,
                            'variationName': 'v2',
                            'configurationData': { 'this': 'that' }};
describe('FFModule:', () => {
    let config: FFConfig;

    beforeEach(() => {
        this.config = new FFConfig(
                        'WEB',
                        'http://localhost:1337',
                        undefined);
        fetchMock.mock('*',
                JSON.stringify(searchFeature),
                            { method: 'GET'});
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
