
export interface DeptQueryParam {
  name: string | undefined;
  status: number | undefined;
}

export interface DeptItem {
  id: string;
  name: string;
  parentId: string;
  treePath: string;
  sort: number;
  status: number;
  leader?: string;
  mobile?: string;
  email?: string;
  children: DeptItem[];
}

export interface DeptFormData {
  id?: string;
  parentId: string;
  name: string;
  sort: number;
  status: number;
}
