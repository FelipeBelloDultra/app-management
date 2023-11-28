export enum PaginationActionTypes {
  SELECT_QUERY_LIMIT = "SELECT_QUERY_LIMIT",
  SELECT_QUERY_STATUS = "SELECT_QUERY_STATUS",
  SELECT_QUERY_PAGE = "SELECT_QUERY_PAGE",
  SELECT_QUERY_ORDER_BY = "SELECT_QUERY_ORDER_BY",
  SELECT_QUERY_SORT = "SELECT_QUERY_SORT",
  CLEAR_QUERY = "CLEAR_QUERY",
}

export interface QueryOption {
  id: string;
  value: string;
  displayText: string;
}

export interface ActionType {
  type: PaginationActionTypes;
  payload: QueryOption;
}

export interface PaginationState {
  limit: QueryOption;
  page: QueryOption;
  status: QueryOption;
  orderBy: QueryOption;
  sort: QueryOption;
}

export interface PaginationAction {
  type: PaginationActionTypes;
  payload: QueryOption;
}
