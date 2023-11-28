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

export function changeQueryOrderBy(payload: QueryOption): PaginationAction {
  return {
    type: PaginationActionTypes.SELECT_QUERY_ORDER_BY,
    payload,
  };
}

export function changeQuerySort(payload: QueryOption): PaginationAction {
  return {
    type: PaginationActionTypes.SELECT_QUERY_SORT,
    payload,
  };
}

export function clearQuery(): PaginationAction {
  return {
    type: PaginationActionTypes.CLEAR_QUERY,
    payload: {
      displayText: "",
      id: "",
      value: "",
    },
  };
}
