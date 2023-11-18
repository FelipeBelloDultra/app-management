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
    <div className="w-1/3 bg-gray-100">
      {columnName}

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {children}
          </div>
        )}
      </Droppable>
    </div>
  );
}
