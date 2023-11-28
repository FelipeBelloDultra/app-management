export enum PaginationActionTypes {
  SELECT_QUERY_LIMIT = "SELECT_QUERY_LIMIT",
  SELECT_QUERY_STATUS = "SELECT_QUERY_STATUS",
  SELECT_QUERY_PAGE = "SELECT_QUERY_PAGE",
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
}

export interface PaginationAction {
  type: PaginationActionTypes;
  payload: QueryOption;
}
