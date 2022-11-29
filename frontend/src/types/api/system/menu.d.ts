
export interface MenuQueryParam {
  name: string;
}

export interface MenuItem {
  id?: number;
  parentId: number;
  type?: string | 'CATEGORY' | 'MENU' | 'EXTLINK';
  createTime: string;
  updateTime: string;
  name: string;
  icon: string;
  component: string;
  sort: number;
  visible: number;
  children: MenuItem[];
}


export interface MenuFormData {
  id?: string;
  parentId: string;
  name: string;
  visible: number;
  icon?: string;
  sort: number;
  component?: string;
  path: string;
  redirect?: string;
  type: string;
}

export interface Resource {
  value: string;
  label: string;
  children: Resource[];
  perms: Permission[];
}

export interface Permission {
  value: string;
  label: string;
}
