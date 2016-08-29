import {DEVICE} from '../Globals';
import {FeatureGrouping} from './FeatureGrouping';
import {Feature} from './Feature';

export class FeatureFlags {
    application: string;
    children: Array<Feature | FeatureGrouping>;

    constructor(
        application: string,
        children: Array<Feature | FeatureGrouping>)
    {
        this.application = application;
        this.children = children;
    }

    static fromJSON(json: string): FeatureFlags {
        let data = JSON.parse(json)['featureFlags'];

        let children: Array<Feature | FeatureGrouping> = [];
        for (let child of data['children']) {
                    // console.log(child);
            if (child['feature'] != undefined) {
               let feature = Feature.fromJson(JSON.stringify(child['feature']));
              // console.log(feature);

               children.push(feature);
            } else if (child['featureGrouping'] != undefined) {
               let featureGroup = FeatureGrouping.fromJson(JSON.stringify(child['featureGrouping']));
               children.push(featureGroup);
            }
        }
        return new FeatureFlags(data.application, children);
    }
}
