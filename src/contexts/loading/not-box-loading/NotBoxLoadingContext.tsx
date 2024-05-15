import { createContext, useState } from "react";
import { HasChildren } from "@/shared/types";

export const NotBoxLoadingContext = createContext({
  boxCreatorIsLoading: false,
  modalIsLoading: false,
  activateBoxCreator: () => {},
  inactivateBoxCreator: () => {},
  activateModal: () => {},
  inactivateModal: () => {},
});

export const NotBoxLoadingContextProvider = ({ children }: HasChildren) => {
  const [boxCreatorIsLoading, setBoxCreatorIsLoading] = useState(false);
  const [modalIsLoading, setModalIsLoading] = useState(false);

  const activateBoxCreator = () => setBoxCreatorIsLoading(true);
  const inactivateBoxCreator = () => setBoxCreatorIsLoading(false);

  const activateModal = () => setModalIsLoading(true);
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
