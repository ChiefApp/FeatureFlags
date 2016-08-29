import { DEVICE } from './Globals';
import { IFeatureLookup } from './IFeatureLookup';

export class FFConfig {
    device: DEVICE;
    url: string; // url
    customFeatureLookup: IFeatureLookup;

    constructor(device: DEVICE,
                url: string,
                customFeatureLookup?: IFeatureLookup) {
        this.device = device;
        this.url = url;
        this.customFeatureLookup = customFeatureLookup;
    }

}
