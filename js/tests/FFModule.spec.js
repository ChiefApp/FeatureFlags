/// <reference path="../_all.d.ts"/>
'use strict';
const ApiFeatureLookup_1 = require('../ApiFeatureLookup');
require('isomorphic-fetch');
describe('Feature Module(FFModule)', () => {
    it('should assign a feature to a property', (done) => {
        let ffLookup = new ApiFeatureLookup_1.ApiFeatureLookup('http://nonexistenturl', 'WEB');
        let contents = ffLookup.getFeature('dashboard.search', '1');
        ;
        let feature;
        // TODO://
        // feature.then(f => {
        //     console.log(f);
        //     expect(true).toBe(true);
        //     done();
        // });
    });
});
//# sourceMappingURL=FFModule.spec.js.map