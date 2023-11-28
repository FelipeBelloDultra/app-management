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
      };

    default:
      return state;
  }
}
