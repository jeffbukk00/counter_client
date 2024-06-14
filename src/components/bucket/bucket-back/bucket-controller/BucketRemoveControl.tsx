import useMutationRemoveBucket from "./hooks/http/useMutationRemoveBucket";

import Control from "@/components/ui/control/Control";
import RemoveControlVector from "../../../ui/control/assets/RemoveControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

// bucket의 controller의 control들 중, bucket 제거에 대한 control.
const BucketRemoveControl = ({ bucketId }: { bucketId: string }) => {
  // bucket 제거에 대한 비동기 요청을 담은 커스텀 훅.
  const { mutateRemoveBucket } = useMutationRemoveBucket(bucketId);

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  return (
    <Control
      title="삭제"
      action={() => {
        // bucket 제거에 대한 비동기 요청이 호출 될 때, 유저 피드백을 위해 호출.
        activate(bucketId);
        // bucket 제거에 대한 비동기 요청 호출.
        mutateRemoveBucket();
      }}
    >
      <RemoveControlVector classes="w-5 h-5 inline-block" />
    </Control>
  );
};

export default BucketRemoveControl;
