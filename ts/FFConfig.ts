import { DEVICES } from './Globals';
import { IFeatureLookup } from './IFeatureLookup';

export class FFConfig {
    device: DEVICES;
    url: string; // url
    offlineFeatureLookup: IFeatureLookup;

    constructor(device: DEVICES = 'WEB',
                url: string,
                offlineFeatureLookup?: IFeatureLookup) {
        this.device = device;
        this.url = url;
        this.offlineFeatureLookup = offlineFeatureLookup;
    }

}
