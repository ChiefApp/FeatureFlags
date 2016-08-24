import { DEVICES } from './Globals';
import { IFeatureLookup } from './IFeatureLookup';
export declare class FFConfig {
    device: DEVICES;
    url: string;
    offlineFeatureLookup: IFeatureLookup;
    constructor(device: DEVICES, url: string, offlineFeatureLookup?: IFeatureLookup);
}
