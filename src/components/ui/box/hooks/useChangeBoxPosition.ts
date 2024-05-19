import { DragEventHandler } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { boxConstants } from "../constants";
import { api } from "@/tanstack-query/api";
import { queryKeys, constantsInQueryKeys } from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const changeBoxPosition = (boxType: number, bucketId?: string) => {
  const url =
    boxType === boxConstants.boxType.counter && bucketId
      ? api.counter.changeCounterPosition(bucketId)
      : api.bucket.changeBucketPosition;

  return async (boxIds: string[]) => {
    const body =
      boxConstants.boxType.counter && bucketId
        ? { counterIds: boxIds }
        : { bucketIds: boxIds };

    return await axiosInstance.post(url, body);
  };
};

const useChangeBoxPosition = (
  boxType: number,
  boxIds: string[] | undefined,
  bucketId?: string
) => {
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateChangeBoxPosition, isPending } = useMutation({
    mutationFn: changeBoxPosition(boxType, bucketId),
    onSuccess: () => {
      if (boxType === boxConstants.boxType.bucket) {
        queryClient.invalidateQueries({
          queryKey: [constantsInQueryKeys.buckets],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: queryKeys.counter.useQueryCounterIds(bucketId!),
        });
      }
    },
    onError: () => {
      openAsyncError("위치 변경에 실패했습니다");
    },
  });

  const dragStartHandler: DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer?.clearData();
    event.dataTransfer.dropEffect = "move";

    const target = event.currentTarget;

    event.dataTransfer?.setData("text/plain", target.id);
  };

  const dragOverHandler: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    const target = event.currentTarget;
    const isMoving = target.classList.contains("drag-enter");
    if (!isMoving) target.classList.add("drag-enter");
  };

  const dragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    const target = event.currentTarget;
    target.classList.add("drag-enter");
  };

  const dragLeave: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    const target = event.currentTarget;
    target.classList.remove("drag-enter");
  };

  const dropHandler: DragEventHandler<HTMLDivElement> = (event) => {
    if (!boxIds) return;

    event.dataTransfer.effectAllowed = "move";

    const draggableId = event.dataTransfer?.getData("text");
    const target = event.currentTarget;
    target.classList.remove("drag-enter");

    const droppableId = target.id;

    if (draggableId === droppableId) return;

    const updatedBoxIds = boxIds.filter((e) => e !== draggableId);
    const droppableIdIndex = updatedBoxIds.findIndex((e) => e === droppableId);
    const untilDroppable = updatedBoxIds.slice(0, droppableIdIndex + 1);
    const afterDroppbalbe = updatedBoxIds.slice(droppableIdIndex + 1);
    untilDroppable.push(draggableId);

    const orderedBoxIds = [...untilDroppable, ...afterDroppbalbe];

    mutateChangeBoxPosition(orderedBoxIds);
  };

  return {
    draggableAttributes: { draggable: true, onDragStart: dragStartHandler },
    droppableAttributes: {
      onDragEnter: dragEnter,
      onDragLeave: dragLeave,
      onDragOver: dragOverHandler,
      onDrop: dropHandler,
    },
    isPending,
  };
};

export default useChangeBoxPosition;
