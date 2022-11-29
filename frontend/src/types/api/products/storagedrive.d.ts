import { PageQueryParam, PageResult } from '../base';

interface StorageDriveModel {
    _id: string;
    productName: string;
    productType: string;
    productPhoto: string;
    productBrand: string;
    price: number;
    type: string;
    pricePerGb: number;
    capacity: string;
    cache: string;
    form: string;
    interface: string;
    maxRead: string;
    maxWrite: string;
    updatedAt?: Date;
    createdAt?: Date;

}

export type StorageDrivePageResult = PageResult<StorageDriveModel[]>;

export type StorageDriveSection = [Array<StorageDriveModel>, Array<StorageDriveModel>?]

export type StorageDriveQuery = {
    _id?: string;
    productName?: string;
    productBrand?: string[];
    type?: string[];
    capacity?: string[];
    maxRead?: string[];
    maxWrite?: string[];
    cache?: string[];
    form?: string[];
    interface?: string[];
    pricePerGb?: string[];
}

export type StorageDriveQueryParams = PageQueryParam<StorageDriveQuery>;
