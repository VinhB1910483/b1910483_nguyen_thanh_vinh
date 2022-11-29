import { PageQueryParam, PageResult } from '../base';
import type {
    CpuQuery,
    MainboardQuery,
    MonitorQuery,
    MouseQuery,
    RamQuery,
    StorageDriveQuery,
    VideoCardQuery,
} from './';
import type {
    CpuModel,
    MainboardModel,
    MonitorModel,
    MouseModel,
    RamModel,
    StorageDriveModel,
    VideoCardModel,
} from './';

export interface Product {
    _id: string;
    productName: string;
    productBrand: string;
    productPhoto: string;
    productType: string;
    discount?: double;
    price: double;
    inStock: number;
    updatedAt?: string;
    createdAt?: string;
    deletedAt?: string;
    review?: {
        rate?: number;
        total?: number;
    };
}

export type ProductPageResult = PageResult<Product[]>;

export type ProductSection = [Array<Product>, Array<Product>?]

export type ProductQuery = {
    _id?: string,
    productType?: string,
    productName?: string,
    productBrand?: string,
}
export type ProductParams = PageQueryParam<ProductQuery>;

export type ProductDetail = CpuModel | MainboardModel | VideoCardModel | StorageDriveModel | RamModel | MouseModel | MonitorModel | null

export type ProductFilterQuery = CpuQuery | MainboardQuery | VideoCardQuery | StorageDriveQuery | RamQuery | MouseQuery | MonitorQuery | null

export type ProductFilterParams = PageQueryParam<ProductFilterQuery>;