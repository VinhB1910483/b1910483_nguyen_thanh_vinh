import { PageQueryParam, PageResult } from '../base';

interface MonitorModel {
    _id: string;
    productName: string;
    productType: string;
    productPhoto: string;
    productBrand: string;
    price: number;
    screenSize: string;
    resolution: string;
    refreshRate: string;
    responseTime: string;
    panelType: string;
    ratio: string;
    updatedAt?: Date;
    createdAt?: Date;
}

export type MonitorPageResult = PageResult<MonitorModel[]>;

export type MonitorSection = [Array<MonitorModel>, Array<MonitorModel>?]

export type MonitorQuery = {
    _id?: string;
    productName?: string;
    productBrand?: string[];
    screenSize?: string[];
    resolution?: string[];
    refreshRate?: string[];
    responseTime?: string[];
    panelType?: string[];
    ratio?: string[];
}

export type MonitorQueryParams = PageQueryParam<MonitorQuery>;
