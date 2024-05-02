export interface UserContextType {
  email?: string;
  username?: string;
  profilePictureUrl?: string;
  unreadPositivePopupIds?: number[];
  isLoading: boolean;
}

export interface UserDataType {
  userData?: {
    email: string;
    username: string;
    profilePictureUrl: string;
    unreadPositivePopupIds: number[];
  };
}
