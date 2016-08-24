/// <reference path="../_all.d.ts"/>
'use strict';

import {Feature} from '../models/Feature';
import { ApiFeatureLookup } from '../ApiFeatureLookup';
import { FFConfig } from '../FFConfig';
import * as fetchMock from 'fetch-mock';
import 'isomorphic-fetch';
import FFModule from '../FFModule';

describe('Feature Module(FFModule)', () => {

    it('should assign a feature to a property', (done) => {
        let ffLookup = new ApiFeatureLookup('http://nonexistenturl', 'WEB');
        let contents = ffLookup.getFeature('dashboard.search', '1');
        @FFModule.Feature('dsa', '2');
        let feature: Promise<Feature>;

        // TODO://
        // feature.then(f => {
        //     console.log(f);
        //     expect(true).toBe(true);
        //     done();
        // });
    });

});
