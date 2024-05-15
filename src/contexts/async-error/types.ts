export interface AsyncErrorContextType {
  asyncErrorState: { isError: boolean; message: string };
  openAsyncError: (message: string) => void;
  closeAsyncError: () => void;
}
