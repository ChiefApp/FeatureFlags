"use strict";
const Feature_1 = require('./models/Feature');
const FeatureFlags_1 = require('./models/FeatureFlags');
require('isomorphic-fetch');
class ApiFeatureLookup {
    constructor(url, device) {
        this.url = url;
        this.device = device;
    }
    getEnabledFeaturesFor(userID) {
        let apiURL = this.url + `/features?enabled=true&device=${this.device}&user_id=${userID}`;
        return fetch(apiURL, { method: 'get' })
            .then(this.handleErrors)
            .then(function (response) {
            let res = response.json();
            return res;
        }).then(function (res) {
            let fflags = FeatureFlags_1.FeatureFlags.fromJSON(JSON.stringify(res));
            return fflags;
        }).catch(function (ex) {
            console.log('Failed to fetch feature flags. ' + ex);
            throw Error(ex);
        });
    }
    getFeature(featureName, userID) {
        let apiURL = this.url + `/${featureName}?device=${this.device}&user_id=${userID}`;
        return fetch(apiURL, { method: 'get', cache: 'no-cache' })
            .then(this.handleErrors)
            .then(function (response) {
            let res = response.json();
            return res;
        }).then(function (res) {
            let feature = Feature_1.Feature.fromJson(JSON.stringify(res));
            return feature;
        }).catch(function (ex) {
            console.log('Failed to fetch feature. ' + ex);
            throw Error(ex);
        });
    }
    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}
exports.ApiFeatureLookup = ApiFeatureLookup;
//# sourceMappingURL=ApiFeatureLookup.js.map