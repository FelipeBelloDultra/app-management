import { Droppable } from "react-beautiful-dnd";

type DragDropColumnProps = {
  children: React.ReactNode;
  droppableId: string;
  columnName: string;
};

export function DragDropColumn({
  columnName,
  droppableId,
  children,
}: DragDropColumnProps) {
  return (
    <div className="w-full overflow-auto">
      <div className="bg-slate-100 p-4 border rounded">
        <h3 className="font-medium text-lg text-gray-700 mb-4">{columnName}</h3>

        <div className="h-auto overflow-hidden">
          <Droppable droppableId={droppableId}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {children}

                <span className="hidden">{provided.placeholder}</span>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
}
