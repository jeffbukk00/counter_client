import { useParams } from "react-router-dom";
const CountersPage = () => {
  const { bucketId } = useParams();

  return <h1>Counters {bucketId}</h1>;
};

export default CountersPage;
