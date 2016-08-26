import {DEVICE} from '../Globals';
import { Feature } from './Feature';

export class FeatureGrouping {
    featureGroupKey: string;
    enabled: Boolean;
    children: Array<Feature | FeatureGrouping>;

    constructor(
        featureGroupKey: string,
        enabled: Boolean,
        children: Array<Feature | FeatureGrouping>)
    {
        this.featureGroupKey = featureGroupKey;
        this.enabled = enabled;
        this.children = children;
    }

    static fromJson(json: string): FeatureGrouping {
       let data = JSON.parse(json);

       let children: Array<Feature | FeatureGrouping> = new Array();
        for (let child of data['children']) {
            if (child['feature'] != undefined) {
               let feature1 = Feature.fromJson(JSON.stringify(child['feature']));
               children.push(feature1);
            }
        }

        return new FeatureGrouping(
            data.featureGroupKey,
            data.enabled,
            children
            );
    }
}

