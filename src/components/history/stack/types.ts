export interface CountHistoryType {
  _id: string;
  offset: number;
  updatedCurrentCount: number;
  isPositive: boolean;
  isResetHistory: boolean;
  comment: string;
  timestamp: Date;
}
