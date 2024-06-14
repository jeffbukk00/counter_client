import useMutationDuplicateBucket from "./hooks/http/useMutationDuplicateBucket";

import Control from "@/components/ui/control/Control";
import DuplicateControlVector from "../../../ui/control/assets/DuplicateControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

// bucket의 controller의 control들 중, bucket의 복제를 담당하는 control.
const BucketDuplicateControl = ({ bucketId }: { bucketId: string }) => {
  // bucket의 복제에 대한 비동기 요청을 보내는 커스텀 훅.
  const { mutateDuplicateBucket } = useMutationDuplicateBucket(bucketId);

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  return (
    <Control
      title="복제"
      action={() => {
        // bucket 복제에 대한 비동기 요청이 호출 되었을 때, 로딩 상태에 따른 유저 피드백을 화면에 표시.
        activate(bucketId);
        // bucket 복제에 대한 비동기 요청 호출.
        mutateDuplicateBucket();
      }}
    >
      <DuplicateControlVector classes="w-5 h-5 inline-block" />
    </Control>
  );
};

export default BucketDuplicateControl;
