import { DragEventHandler } from "react";

export interface EventTargetHasId extends EventTarget {
  id: string;
}

export interface BoxPropsType {
  boxType: number;
  boxId: string;
  draggableAttributes: {
    draggable: boolean;
    onDragStart: DragEventHandler<HTMLDivElement>;
  };
  droppableAttributes: {
    onDragOver: DragEventHandler<HTMLDivElement>;
    onDrop: DragEventHandler<HTMLDivElement>;
  };
  bucketId?: string;
}
