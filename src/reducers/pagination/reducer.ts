import {
  ActionType,
  PaginationActionTypes,
  PaginationState,
} from "./interfaces";

export function paginationReducer(state: PaginationState, action: ActionType) {
  const { type, payload } = action;
  switch (type) {
    case PaginationActionTypes.SELECT_QUERY_LIMIT:
      return {
        ...state,
        limit: payload,
        page: {
          id: "page-1",
          value: "1",
          displayText: "1",
        },
      };

    case PaginationActionTypes.SELECT_QUERY_STATUS:
      return {
        ...state,
        status: payload,
        page: {
          id: "page-1",
          value: "1",
          displayText: "1",
        },
      };

    case PaginationActionTypes.SELECT_QUERY_PAGE:
      return {
        ...state,
        page: payload,
      };

    case PaginationActionTypes.SELECT_QUERY_ORDER_BY:
      return {
        ...state,
        orderBy: payload,
      };

    case PaginationActionTypes.SELECT_QUERY_SORT:
      return {
        ...state,
        sort: payload,
      };

    case PaginationActionTypes.CLEAR_QUERY:
      return {
        page: {
          id: "page-1",
          value: "1",
          displayText: "1",
        },
        status: {
          id: "status-select",
          value: "",
          displayText: "-- Select --",
        },
        limit: {
          id: "limit-10",
          value: "10",
          displayText: "10",
        },
        orderBy: {
          id: "order-by-created_at",
          value: "created_at",
          displayText: "Created at",
        },
        sort: {
          id: "sort-desc",
          value: "desc",
          displayText: "Desc",
        },
      };

    default:
      return state;
  }
}
