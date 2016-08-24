import { Feature } from './Feature';
export declare class FeatureGrouping {
    featureGroupKey: string;
    enabled: Boolean;
    children: Array<Feature | FeatureGrouping>;
    constructor(featureGroupKey: string, enabled: Boolean, children: Array<Feature | FeatureGrouping>);
    static fromJson(json: string): FeatureGrouping;
}
