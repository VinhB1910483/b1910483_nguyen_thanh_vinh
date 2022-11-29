import { PageQueryParam, PageResult } from '../base';

interface MouseModel {
    _id: string;
    productName: string;
    productType: string;
    productPhoto: string;
    productBrand: string;
    price: number;
    trackingMethod: string;
    connectType: string;
    dpi: number;
    hand: string;
    color: string;
    updatedAt?: Date;
    createdAt?: Date;
}

export type MousePageResult = PageResult<MouseModel[]>;

export type MouseSection = [Array<MouseModel>, Array<MouseModel>?]

export type MouseQuery = {
    _id?: string;
    productName?: string;
    productBrand?: string[];
    trackingMethod?: string[];
    connectType?: string[];
    dpi?: string[];
    hand?: string[];
    color?: string[];
}

export type MouseQueryParams = PageQueryParam<MouseQuery>;
