export interface PageQueryParam<T> {
  pageSize: number,
  page: number,
  query: T;
}

export interface PageResult<T> {
  data: T;
  meta: {
    totalPage: number;
    totalItems: number;
    currentPage: number;
    pageSize: number;
  }
}
