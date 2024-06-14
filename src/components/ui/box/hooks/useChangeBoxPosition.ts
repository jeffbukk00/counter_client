import { DragEventHandler } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { boxConstants } from "../constants";
import { api } from "@/tanstack-query/api";
import { queryKeys, constantsInQueryKeys } from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// box의 위치(저장 된 배열의 인덱스, 화면 상 위치)를 업데이트하는 비동기 요청.
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

    return await axiosInstance().post(url, body);
  };
};

// box의 위치(저장 된 배열의 인덱스, 화면 상 위치)를 업데이트하는 비동기 요청을 담고 있는 커스텀 훅.
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
      // 요청이 성공했을 시,
      if (boxType === boxConstants.boxType.bucket) {
        //boxType이 bucket인 경우, 해당하는 queryKey의 비동기 요청의 캐시를 업데이트.
        queryClient.invalidateQueries({
          queryKey: [constantsInQueryKeys.buckets],
        });
      } else {
        //boxType이 counter인 경우, 해당하는 queryKey의 비동기 요청의 캐시를 업데이트.
        queryClient.invalidateQueries({
          queryKey: queryKeys.counter.useQueryCounterIds(bucketId!),
        });
      }
    },
    onError: () => {
      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("위치 변경에 실패했습니다");
    },
  });

  // drag start event에 대한 이벤트 핸들러.
  const dragStartHandler: DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer?.clearData();
    event.dataTransfer.dropEffect = "move";

    const target = event.currentTarget;

    event.dataTransfer?.setData("text/plain", target.id);
  };

  // drag over event에 대한 이벤트 핸들러.
  const dragOverHandler: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    const target = event.currentTarget;
    const isMoving = target.classList.contains("drag-enter");
    if (!isMoving) target.classList.add("drag-enter");
  };

  // drag enter event에 대한 이벤트 핸들러.
  const dragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    const target = event.currentTarget;
    target.classList.add("drag-enter");
  };

  // drag leave event에 대한 이벤트 핸들러.
  const dragLeave: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    const target = event.currentTarget;
    target.classList.remove("drag-enter");
  };

  // drop event에 대한 이벤트 핸들러.
  const dropHandler: DragEventHandler<HTMLDivElement> = (event) => {
    if (!boxIds) return;

    event.dataTransfer.effectAllowed = "move";

    const draggableId = event.dataTransfer?.getData("text");
    const target = event.currentTarget;
    target.classList.remove("drag-enter");

    const droppableId = target.id;

    if (draggableId === droppableId) return;

    // draggable에 해당하는 box가 droppable에 해당하는 box의 위치 바로 다음으로 이동.
    const updatedBoxIds = boxIds.filter((e) => e !== draggableId);
    const droppableIdIndex = updatedBoxIds.findIndex((e) => e === droppableId);
    const untilDroppable = updatedBoxIds.slice(0, droppableIdIndex + 1);
    const afterDroppbalbe = updatedBoxIds.slice(droppableIdIndex + 1);
    untilDroppable.push(draggableId);

    const orderedBoxIds = [...untilDroppable, ...afterDroppbalbe];

    // 비동기 요청 호출.
    mutateChangeBoxPosition(orderedBoxIds);
  };

  // droppable과 droppable로 여겨지기 위해 필요한 속성들을 반환.
  // 모든 box들에 이 속성들을 할당.
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
