import { Draggable } from "react-beautiful-dnd";

type DragDropColumnItemProps = {
  index: number;
  draggableId: string;
  children: React.ReactNode;
};

export function DragDropColumnItem({
  children,
  draggableId,
  index,
}: DragDropColumnItemProps) {
  return (
    <Draggable index={index} draggableId={draggableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}
