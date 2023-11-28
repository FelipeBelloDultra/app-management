import { useCallback, useMemo, useReducer } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { paginationReducer } from "~/reducers/pagination/reducer";
import { PaginationState, QueryOption } from "~/reducers/pagination/interfaces";
import {
  changeQueryLimit,
  changeQueryPage,
  changeQueryStatus,
  clearQuery,
} from "~/reducers/pagination/actions";

const TOTAL_LIMITS = [
  {
    id: `limit-${5}`,
    value: "5",
    displayText: "5",
  },
  {
    id: `limit-${10}`,
    value: "10",
    displayText: "10",
  },
  {
    id: `limit-${15}`,
    value: "15",
    displayText: "15",
  },
  {
    id: `limit-${20}`,
    value: "20",
    displayText: "20",
  },
  {
    id: `limit-${25}`,
    value: "25",
    displayText: "25",
  },
];
const TOTAL_STATUS = [
  {
    id: "status-select",
    value: "",
    displayText: "-- Select --",
  },
  {
    id: "status-waiting",
    value: "WAITING",
    displayText: "Waiting",
  },
  {
    id: "status-doing",
    value: "DOING",
    displayText: "Doing",
  },
  {
    id: "status-finished",
    value: "FINISHED",
    displayText: "Finished",
  },
];

export function useBoardPagination(total: number) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const limit = searchParams.get("limit");
  const status = searchParams.get("status");
  const page = searchParams.get("page");

  const [state, dispatch] = useReducer(paginationReducer, {
    limit: TOTAL_LIMITS.find((l) => l.value === limit) || TOTAL_LIMITS[1],
    status: TOTAL_STATUS.find((s) => s.value === status) || TOTAL_STATUS[0],
    page: {
      id: `page-${page || 1}`,
      value: `${page || 1}`,
      displayText: `${page || 1}`,
    },
  } as PaginationState);

  const TOTAL_PAGES = useMemo(() => {
    return Array.from(
      {
        length: Math.ceil(total / Number(state.limit.value)),
      },
      (_, i) => ({
        id: `page-${i + 1}`,
        value: `${i + 1}`,
        displayText: `${i + 1}`,
      })
    );
  }, [state.limit.value, total]);

  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    params.delete("status");
    params.set("page", state.page.value);
    params.set("limit", state.limit.value);

    if (!!state.status.value) {
      params.set("status", state.status.value);
    }

    const paramsToString = params.toString();

    router.push(`${pathname}?${paramsToString}`);
  }, [
    pathname,
    router,
    searchParams,
    state.limit.value,
    state.page.value,
    state.status.value,
  ]);

  function handleClearFilters() {
    dispatch(clearQuery());
    router.push(pathname);
  }

  function handleSelectLimit(payload: QueryOption) {
    dispatch(changeQueryLimit(payload));
  }

  function handleSelectPage(payload: QueryOption) {
    dispatch(changeQueryPage(payload));
  }

  function handleSelectStatus(payload: QueryOption) {
    dispatch(changeQueryStatus(payload));
  }

  return {
    handleSelectStatus,
    handleSelectPage,
    handleSelectLimit,
    handleClearFilters,
    handleApplyFilters,
    status: state.status,
    limit: state.limit,
    page: state.page,
    TOTAL_PAGES,
    TOTAL_LIMITS,
    TOTAL_STATUS,
  };
}
