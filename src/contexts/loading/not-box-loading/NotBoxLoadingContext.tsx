import { createContext, useState } from "react";
import { HasChildren } from "@/shared/types";

// box-creator, modal에서의 비동기 요청이 로딩 상태 일 떄 띄워야하는 유저 피드백을 관리하는 context.
export const NotBoxLoadingContext = createContext({
  boxCreatorIsLoading: false,
  modalIsLoading: false,
  activateBoxCreator: () => {},
  inactivateBoxCreator: () => {},
  activateModal: () => {},
  inactivateModal: () => {},
});

// context provider.
export const NotBoxLoadingContextProvider = ({ children }: HasChildren) => {
  // box-creator에서의 비동기 요청이 로딩 상태인지 여부를 관리하는 상태.
  const [boxCreatorIsLoading, setBoxCreatorIsLoading] = useState(false);

  // modal에서의 비동기 요청이 로딩 상태인지 여부를 관리하는 상태.
  const [modalIsLoading, setModalIsLoading] = useState(false);

  // box-creator에서의 비동기 요청의 로딩 상태가 활성화 되었음을 업데이트.
  const activateBoxCreator = () => setBoxCreatorIsLoading(true);
  // box-creator에서의 비동기 요청의 로딩 상태가 비활성화 되었음을 업데이트.
  const inactivateBoxCreator = () => setBoxCreatorIsLoading(false);

  // modal에서의 비동기 요청의 로딩 상태가 활성화 되었음을 업데이트.
  const activateModal = () => setModalIsLoading(true);
  // modal에서의 비동기 요청의 로딩 상태가 비활성화 되었음을 업데이트.
  const inactivateModal = () => setModalIsLoading(false);

  const contextValue = {
    boxCreatorIsLoading,
    modalIsLoading,
    activateBoxCreator,
    inactivateBoxCreator,
    activateModal,
    inactivateModal,
  };

  return (
    <NotBoxLoadingContext.Provider value={contextValue}>
      {children}
    </NotBoxLoadingContext.Provider>
  );
};
