import {
  PaginationAction,
  PaginationActionTypes,
  QueryOption,
} from "./interfaces";

export function changeQueryStatus(payload: QueryOption): PaginationAction {
  return {
    type: PaginationActionTypes.SELECT_QUERY_STATUS,
    payload,
  };
}

export function changeQueryPage(payload: QueryOption): PaginationAction {
  return {
    type: PaginationActionTypes.SELECT_QUERY_PAGE,
    payload,
  };
}

export function changeQueryLimit(payload: QueryOption): PaginationAction {
  return {
    type: PaginationActionTypes.SELECT_QUERY_LIMIT,
    payload,
  };
}

// [TODO]: FIX THIS TYPE RETURN
export function clearQuery(): PaginationAction {
  return {
    type: PaginationActionTypes.CLEAR_QUERY,
    payload: {} as QueryOption,
  };
}
