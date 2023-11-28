"use client";

import { Button, Select } from "../common";
import { TaskItem } from "./task-item";

import { useBoardPagination } from "~/hooks/use-board-pagination";

interface BoardProps {
  tasks: {
    id: string;
    name: string;
    descriptions: string | null;
    status: "WAITING" | "DOING" | "FINISHED";
    expires_at: Date;
    created_at: Date;
    updated_at: Date;
    board_id: string;
  }[];
  total: number;
}

export function TaskBoard({ tasks, total }: BoardProps) {
  const {
    handleSelectStatus,
    handleSelectPage,
    handleSelectLimit,
    handleSelectOrderBy,
    handleSelectSort,
    handleClearFilters,
    handleApplyFilters,
    limit,
    page,
    status,
    sort,
    orderBy,
    TOTAL_PAGES,
    TOTAL_LIMITS,
    TOTAL_STATUS,
    TOTAL_SORT,
    TOTAL_ORDER_BY,
  } = useBoardPagination(total);

  return (
    <div className="flex gap-4 h-full">
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex flex-col gap-2 overflow-y-scroll pt-2 px-2 pb-6">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded self-start px-4 py-4 w-64 flex flex-col gap-4">
        <Select
          label="Page"
          defaultValue={page}
          data={TOTAL_PAGES}
          onSelect={handleSelectPage}
        />

        <Select
          label="Per page"
          defaultValue={limit}
          data={TOTAL_LIMITS}
          onSelect={handleSelectLimit}
        />

        <Select
          label="Sort by"
          defaultValue={sort}
          data={TOTAL_SORT}
          onSelect={handleSelectSort}
        />

        <Select
          label="Order by"
          defaultValue={orderBy}
          data={TOTAL_ORDER_BY}
          onSelect={handleSelectOrderBy}
        />

        <Select
          label="Status"
          defaultValue={status}
          data={TOTAL_STATUS}
          onSelect={handleSelectStatus}
        />

        <div className="flex flex-col gap-2">
          <Button onClick={handleApplyFilters}>Apply Filters</Button>

          <Button color="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
