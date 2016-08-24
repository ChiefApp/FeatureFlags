/// <reference path="../ts/_all.d.ts" />
import { IFeatureLookup } from './IFeatureLookup';
import { Feature } from './models/Feature';
import { FeatureFlags } from './models/FeatureFlags';
import 'isomorphic-fetch';
import { DEVICES } from './Globals';
export declare class ApiFeatureLookup implements IFeatureLookup {
    url: string;
    device: DEVICES;
    constructor(url: string, device: DEVICES);
    getEnabledFeaturesFor(userID: string): Promise<FeatureFlags>;
    getFeature(featureName: string, userID: string): Promise<Feature>;
    handleErrors(response: any): any;
}
