import { FeatureGrouping } from './FeatureGrouping';
export declare class Feature {
    featureKey: string;
    enabled: Boolean;
    variationName: string;
    configurationData: any;
    children: Array<Feature | FeatureGrouping>;
    constructor(featureKey: string, enabled: Boolean, variationName: string, configurationData: any, children: Array<Feature | FeatureGrouping>);
    static fromJson(json: string): Feature;
}
