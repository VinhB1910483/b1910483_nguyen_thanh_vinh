import { PageQueryParam, PageResult } from '../base';
import type { Product } from './product';

interface MainboardModel extends Product {
    _id: string;
    productName: string;
    productType: string;
    productPhoto: string;
    productBrand: string;
    chipset: string;
    form: string;
    socket: string;
    ramCap: number;
    ramStandard: string;
    color: string;
    ramSlot: number;
    price: number;
    updatedAt?: Date;
    createdAt?: Date;
    deletedAt?: Date;
}
export type MainboardPageResult = PageResult<MainboardModel[]>;

export type MainboardSection = [Array<MainboardModel>, Array<MainboardModel>?]

export type MainboardQuery = {
    _id?: string;
    productName?: string;
    productBrand?: string[];
    chipset?: string[];
    socket?: string[];
    ramStandard?: string[];
    form?: string[];
    color?: string[];
    ramCap?: string[];
    ramSlot?: string[];
}

export type MainboardQueryParams = PageQueryParam<MainboardQuery>;
