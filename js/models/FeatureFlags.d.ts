import { FeatureGrouping } from './FeatureGrouping';
import { Feature } from './Feature';
export declare class FeatureFlags {
    application: string;
    children: Array<Feature | FeatureGrouping>;
    constructor(application: string, children: Array<Feature | FeatureGrouping>);
    static fromJSON(json: string): FeatureFlags;
}
