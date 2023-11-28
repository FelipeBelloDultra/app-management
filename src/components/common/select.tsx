"use client";

import { Listbox, Transition } from "@headlessui/react";
import { ChevronsUpDown } from "lucide-react";

interface SelectData {
  value: string;
  displayText: string;
  id: string;
}

type SelectProps = {
  onSelect: (data: SelectData) => void;
  data: SelectData[];
  label: string;
  defaultValue: SelectData;
};

export function Select({ defaultValue, label, data, onSelect }: SelectProps) {
  return (
    <Listbox
      as="div"
      className="space-y-1"
      value={defaultValue}
      onChange={onSelect}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm leading-5 font-medium text-gray-900">
            {label}
          </Listbox.Label>
          <div className="relative">
            <span className="inline-block w-full rounded">
              <Listbox.Button className="cursor-pointer relative w-full rounded border border-gray-200 bg-white pl-3 pr-10 py-2 text-left transition">
                <span className="block truncate">
                  {defaultValue.displayText}
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronsUpDown size={20} className="text-gray-900" />
                </span>
              </Listbox.Button>
            </span>

            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              className="absolute mt-1 w-full rounded bg-white shadow-lg z-30"
            >
              <Listbox.Options
                static
                className="max-h-60 rounded py-1 text-base leading-6 shadow overflow-auto"
              >
                {data.map((d) => (
                  <Listbox.Option key={d.id} value={d}>
                    {({ selected, active }) => (
                      <div
                        className={`${
                          active ? "text-white bg-cyan-500" : "text-gray-900"
                        } cursor-pointer select-none relative py-2 pl-4 pr-4`}
                      >
                        <span
                          className={`block truncate font-medium ${
                            selected ? "underline" : ""
                          }`}
                        >
                          {d.displayText}
                        </span>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
