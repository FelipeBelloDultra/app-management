"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { TaskItem } from "./task-item";
import { Button, Select } from "../common";

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

const LIMITS = [
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
const STATUS = [
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

export function TaskBoard({ tasks, total }: BoardProps) {
  const [selectedLimit, setSelectedLimit] = useState(LIMITS[1]);
  const [selectedStatus, setSelectedStatus] = useState(STATUS[0]);
  const [selectedPage, setSelectedPage] = useState({
    id: "page-1",
    value: "1",
    displayText: "1",
  });

  const PAGES = useMemo(() => {
    return Array.from(
      {
        length: Math.ceil(total / Number(selectedLimit.value)),
      },
      (_, i) => ({
        id: `page-${i + 1}`,
        value: `${i + 1}`,
        displayText: `${i + 1}`,
      })
    );
  }, [selectedLimit, total]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSelectedPage(PAGES[0]);
  }, [PAGES]);

  function handleApplyFilters() {
    const params = new URLSearchParams(searchParams);

    params.delete("status");
    params.set("page", selectedPage.value);
    params.set("limit", selectedLimit.value);

    if (!!selectedStatus.value) {
      params.set("status", selectedStatus.value);
    }

    const paramsToString = params.toString();

    router.push(`${pathname}?${paramsToString}`);
  }

  function handleClearFilters() {
    router.push(pathname);
  }

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
          defaultValue={selectedPage}
          data={PAGES}
          onSelect={setSelectedPage}
        />

        <Select
          label="Per page"
          defaultValue={selectedLimit}
          data={LIMITS}
          onSelect={setSelectedLimit}
        />

        <Select
          label="Status"
          defaultValue={selectedStatus}
          data={STATUS}
          onSelect={setSelectedStatus}
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
