import { DragEventHandler } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { boxConstants } from "../constants";
import { api } from "@/tanstack-query/api";
import { queryKeys, constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import { EventTargetHasId } from "../types";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
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

    const target = event.target as EventTargetHasId;

    event.dataTransfer?.setData("text/plain", target.id);
  };

  const dragOverHandler: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  const dropHandler: DragEventHandler<HTMLDivElement> = (event) => {
    if (!boxIds) return;

    const draggableId = event.dataTransfer?.getData("text");
    const target = event.target as EventTargetHasId;
    const droppableId = target.id;

    const orderedBoxIds = boxIds.filter((e) => e !== draggableId);
    const droppableIdIndex = orderedBoxIds.findIndex((e) => e === droppableId);
    orderedBoxIds?.splice(droppableIdIndex, 0, draggableId);

    mutateChangeBoxPosition(orderedBoxIds);
  };

  return {
    draggableAttributes: { draggable: true, onDragStart: dragStartHandler },
    droppableAttributes: {
      onDragOver: dragOverHandler,
      onDrop: dropHandler,
    },
    isPending,
  };
};

export default useChangeBoxPosition;
