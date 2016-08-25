import { DEVICES } from './Globals';
import { IFeatureLookup } from './IFeatureLookup';

export class FFConfig {
    device: DEVICES;
    url: string; // url
    customFeatureLookup: IFeatureLookup;

    constructor(device: DEVICES,
                url: string,
                customFeatureLookup?: IFeatureLookup) {
        this.device = device;
        this.url = url;
        this.customFeatureLookup = customFeatureLookup;
    }

}
