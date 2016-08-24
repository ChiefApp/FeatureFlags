import {FeatureGrouping} from './FeatureGrouping';

export class Feature {
    featureKey: string;
    enabled: Boolean;
    variationName: string;
    configurationData: any;
    children: Array<Feature | FeatureGrouping>;

    constructor(
        featureKey: string,
        enabled: Boolean,
        variationName: string,
        configurationData: any,
        children: Array<Feature | FeatureGrouping>) {
        this.featureKey = featureKey;
        this.enabled = enabled;
        this.variationName = variationName;
        this.configurationData = configurationData;
        this.children = children;
    }

    static fromJson(json: string) {
        let data = JSON.parse(json);
        let children: Array<Feature | FeatureGrouping> = [];

        if(data.featureKey == undefined
            || data.enabled == undefined
            || data.variationName == undefined
            || data.configurationData == undefined
            ){
                return
            }

        return new Feature(
            data.featureKey,
            data.enabled,
            data.variationName,
            data.configurationData,
            children
        );
    }
}

