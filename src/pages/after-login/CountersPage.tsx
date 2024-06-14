import { useParams } from "react-router-dom";

import Counters from "@/components/counter/Counters";

// /main/:id/counters
// counter들에 대한 페이지.
const CountersPage = () => {
  const { bucketId } = useParams();

  return <Counters bucketId={bucketId!} />;
};

export default CountersPage;
