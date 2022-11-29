import { PageQueryParam, PageResult } from '../base';

interface RamModel {
    _id: string;
    productName: string;
    productType: string;
    productPhoto: string;
    productBrand: string;
    price: number;
    capacity: number;
    speed: number;
    standard: string;
    latency: number;
    module: string;
    cas: number;
    pricePerGb: number;
    color: string;
}

export type RamPageResult = PageResult<RamModel[]>;

export type RamSection = [Array<RamModel>, Array<RamModel>?]

export type RamQuery = {
    _id?: string;
    productName?: string;
    productBrand?: string[];
    capacity?: string[];
    speed?: string[];
    standard?: string[];
    module?: string[];
    color?: string[];
    latency?: string[];
    cas?: string[];
    pricePerGb?: string[];
}

export type RamQueryParams = PageQueryParam<RamQuery>;
