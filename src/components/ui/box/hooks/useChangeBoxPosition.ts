import { useState, useEffect, DragEventHandler } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { boxConstants } from "../constants";
import { api } from "@/tanstack-query/api";
import { queryKeys, constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import { EventTargetHasId } from "../types";

const changeBoxPosition = async (
  boxType: number,
  boxIds: string[] | undefined,
  bucketId?: string
) => {
  const url =
    boxType === boxConstants.boxType.counter && bucketId
      ? api.counter.changeCounterPosition(bucketId)
      : api.bucket.changeBucketPosition;

  const body =
    boxConstants.boxType.counter && bucketId
      ? { counterIds: boxIds }
      : { bucketIds: boxIds };

  return await axiosInstance.post(url, {
    headers: { "Content-Type": "application/json" },
    data: body,
  });
};

const useChangeBoxPosition = (
  boxType: number,
  boxIds: string[] | undefined,
  bucketId?: string
) => {
  const [orderedIds, setOrderedIds] = useState(boxIds);

  useEffect(() => {
    setOrderedIds(boxIds);
  }, [boxIds]);

  const dragStartHandler: DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer?.clearData();

    const target = event.target as EventTargetHasId;
    event.dataTransfer?.setData("text/plain", target.id);
  };

  const dragOverHandler: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  const dropHandler: DragEventHandler<HTMLDivElement> = (event) => {
    const draggableId = event.dataTransfer?.getData("text");
    const target = event.target as EventTargetHasId;
    const droppableId = target.id;

    return setOrderedIds((prevOrderedIds) => {
      const updatedOrderedIds = prevOrderedIds?.filter(
        (e) => e !== draggableId
      );
      const droppableIdIndex = updatedOrderedIds?.findIndex(
        (e) => e === droppableId
      );

      if (typeof droppableIdIndex === "number")
        updatedOrderedIds?.splice(droppableIdIndex, 0, draggableId);

      return updatedOrderedIds;
    });
  };

  const queryClient = useQueryClient();
  const { mutate: mutateChangeBoxPosition } = useMutation({
    mutationFn: () => changeBoxPosition(boxType, orderedIds, bucketId),
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
  });

  useEffect(() => {
    mutateChangeBoxPosition();
  }, [orderedIds, mutateChangeBoxPosition]);

  return {
    orderedIds,
    draggableAttributes: { draggable: true, onDragStart: dragStartHandler },
    droppableAttributes: {
      onDragOver: dragOverHandler,
      onDrop: dropHandler,
    },
  };
};

export default useChangeBoxPosition;
