import { DEVICE } from './Globals';
import { IFeatureLookup } from './IFeatureLookup';
export declare class FFConfig {
    device: DEVICE;
    url: string;
    customFeatureLookup: IFeatureLookup;
    constructor(device: DEVICE, url: string, customFeatureLookup?: IFeatureLookup);
}
