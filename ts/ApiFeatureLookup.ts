/// <reference path="./_all.d.ts"/>
import { IFeatureLookup } from './IFeatureLookup';
import { Feature } from './models/Feature';
import { FeatureFlags } from './models/FeatureFlags';
import 'isomorphic-fetch';
import {DEVICE}  from './Globals';

export class ApiFeatureLookup implements IFeatureLookup {
    url: string;
    device: DEVICE;

    constructor(url: string, device: DEVICE) {
        this.url = url;
        this.device = device;
    }

    getEnabledFeaturesFor(userID: string): Promise<FeatureFlags> {
        let apiURL = this.url + `/features?enabled=true&device=${this.device}&user_id=${userID}`;
        return fetch(apiURL, { method: 'get' })
           .then(this.handleErrors)
           .then(function(response) {
               let res = response.json();
               return res;
           }).then(function(res) {
                let fflags = FeatureFlags.fromJSON(JSON.stringify(res));
                return fflags;
           }).catch(function(ex){
                console.log('Failed to fetch feature flags. ' + ex);
                throw Error(ex);
           });
    }

    getFeature(featureName: string, userID: string): Promise<Feature> {
        let apiURL = this.url + `/${featureName}?device=${this.device}&user_id=${userID}`;
        return fetch(apiURL, {  method: 'get', cache: 'no-cache'})
                .then(this.handleErrors)
                .then(function(response) {
                   let res = response.json();
                   return res;
                }).then(function(res) {
                   let feature = Feature.fromJson(JSON.stringify(res));
                   return feature;
                }).catch(function(ex){
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
