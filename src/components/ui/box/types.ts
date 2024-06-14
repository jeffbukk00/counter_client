/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

import { DragEventHandler } from "react";

import { HasChildren } from "@/shared/types";

export interface BoxesContainerPropsType extends HasChildren {
  isFetching: boolean;
  isOneLine: boolean | undefined;
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
