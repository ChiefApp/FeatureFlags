'use strict';

import {FFModule} from '../FFModule';
import {Feature} from '../models/Feature';
import {FFConfig} from '../FFConfig';
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

    it('should return a feature promise', (done) => {
        let fflip = new FFModule('WEB',  'http://localhost:1337', undefined);
        fflip.getFeature('Search', '1').then(feature => {
            console.log(feature);
            expect(feature instanceof Feature).toBe(true);
            done();
        });
    });

});
