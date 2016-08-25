import { DEVICES } from './Globals';
import { IFeatureLookup } from './IFeatureLookup';
export declare class FFConfig {
    device: DEVICES;
    url: string;
    customFeatureLookup: IFeatureLookup;
    constructor(device: DEVICES, url: string, customFeatureLookup?: IFeatureLookup);
}
