import { PageQueryParam, PageResult } from '../base';

export interface UserInfo {
}


export interface UserItem {
  id: string;
  username: string;
  nickname: string;
  mobile: string;
  gender: number;
  avatar: string;
  email: string;
  status: number;
  name: string;
  lastname: string;
  address: string;
  city: string;
  phone: string;
  roleNames: string;
  createTime: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserFormData {
  "username"?: string;
  "email"?: string;
  "name"?: string;
  "lastname"?: string;
  "password"?: string;
  "roles"?: string;
  "address"?: string;
  "city"?: string;
  "phone"?: string;

}

