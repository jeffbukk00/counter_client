import { useParams } from "react-router-dom";

import Counters from "@/components/counter/Counters";

const CountersPage = () => {
  const { bucketId } = useParams();

  return <Counters bucketId={bucketId!} />;
};

export default CountersPage;
