/// <reference path="../_all.d.ts"/>
'use strict';

import {Feature} from '../models/Feature';
import {FeatureFlags} from '../models/FeatureFlags';
import { ApiFeatureLookup } from '../ApiFeatureLookup';
import {DEVICES }  from '../Globals';
import { FFConfig } from '../FFConfig';
import * as sinon from 'sinon';
import * as fetchMock from 'fetch-mock';
import 'isomorphic-fetch';

let dashboardFeature = {'featureKey': 'Search',
                            'enabled': true,
                            'variationName': 'v2',
                            'configurationData': { 'this': 'that' }};
let fflags = {
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
            ]}};

describe('APIFeatureLookup -', () => {
    let config: FFConfig;

    beforeEach(() => {
        this.config = new FFConfig('WEB', 'http://localhost:1337', undefined);
        fetchMock.mock('^http://localhost:1337',
                        JSON.stringify(dashboardFeature),
                        { method: 'GET'})
                .mock('^http://fflags',
                        JSON.stringify(fflags),
                        { method: 'GET'})
                .mock('*',
                      500,
                      { method: 'GET'});
    });

    afterEach(() => {
           fetchMock.restore();
    });

    describe('Get feature', () => {
        // it("should return a feature", (done)=> {
        //     let ffLookup = new ApiFeatureLookup(this.config.url)
        //     //   let contents = ffLookup.getFeature()
        //     let featurePromise = Promise.resolve(new Feature("Campaigns",
        //                             true,
        //                             "v2",
        //                             { "template": "templatev2"},
        //                             []
        //     ))
        //     let stub = sinon.stub(ffLookup, 'getFeature')
        //     //.withArgs("Dashboard", "1")
        //     .returns(featurePromise)
        //     let contents = ffLookup.getFeature("Dashboard", "1")
        //   //  expect(spy.calledOnce).toBe(true);
        //     contents.then(v => {
        //         expect(v).toEqual(true);
        //         done();
        //     });
        // })


    it('should return a Feature object as a promise', (done) => {
            let ffLookup = new ApiFeatureLookup(this.config.url, 'WEB');
            let contents = ffLookup.getFeature('dashboard.search', '1');
            contents.then(v => {
                expect(v).toEqual(new Feature('Search', true, 'v2', { 'this': 'that' }, []));
                done();
            });
    });

    // enable this if you would like to test the server
    it('should throw error if the fetch fails', (done) => {
        let ffLookup = new ApiFeatureLookup('http://nonexistenturl', 'WEB');
        let contents = ffLookup.getFeature('dashboard.search', '1');
        contents.catch(err => {
            expect(err instanceof Error).toBe(true);
            done();
        });
    });
 });


 describe('Get all enabled features for', () => {
     it('should return a Feature Flag promise', (done) => {
        let ffLookup = new ApiFeatureLookup('http://fflags', 'WEB');
        let contents = ffLookup.getEnabledFeaturesFor('1');
        contents.then(res => {
            expect(res instanceof FeatureFlags).toEqual(true);
            done();
        });
     });

     it('should throw error if the fetch fails', (done) => {
        let ffLookup = new ApiFeatureLookup('http://unknownurl', 'WEB');
        let contents = ffLookup.getEnabledFeaturesFor('1');
        contents.catch(err => {
            expect(err instanceof Error).toBe(true);
            done();
        });
     });
 });


});
