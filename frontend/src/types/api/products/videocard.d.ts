import { PageQueryParam, PageResult } from '../base';

interface VideoCardModel {
    _id: string;
    productName: string;
    productType: string;
    productPhoto: string;
    productBrand: string;
    price: number;
    chipsetName: string;
    coreClock: number;
    boostClock: number;
    color: string;
    length: number;
    memory: number;
    updatedAt?: Date;
    createdAt?: Date;
}

export type VideoCardPageResult = PageResult<VideoCardModel[]>;

export type VideoCardSection = [Array<VideoCardModel>, Array<VideoCardModel>?]

export type VideoCardQuery = {
    _id?: string;
    productName?: string;
    productBrand?: string[];
    chipsetName?: string[];
    coreClock?: string[];
    boostClock?: string[];
    color?: string[];
    length?: string[];
    memory?: string[];
}

export type VideoCardQueryParams = PageQueryParam<VideoCardQuery>;
