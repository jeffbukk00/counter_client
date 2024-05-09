import { CounterDataType } from "../types";

export interface CounterBackDataType extends CounterDataType {
  id: string;
  bucketId: string;
}
