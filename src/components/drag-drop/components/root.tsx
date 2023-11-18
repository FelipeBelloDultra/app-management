import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";

type DragDropRootProps = DragDropContextProps & {
  children: React.ReactNode;
};

export function DragDropRoot({ children, ...rest }: DragDropRootProps) {
  return <DragDropContext {...rest}>{children}</DragDropContext>;
}
