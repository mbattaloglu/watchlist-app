import { createContext, useState } from "react";

type ModalContextProps = {
  modal: { title: string; description: string } | null;
  setModal: (title: string, description: string) => void;
  closeModal: () => void;
};

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalContext = createContext<ModalContextProps>({
  modal: null,
  setModal: () => {
    throw new Error("ModalContext not initialized.");
  },
  closeModal: () => {
    throw new Error("ModalContext not initialized.");
  },
});

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const createModal = (title: string, description: string) => {
    setModal({ title, description });
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ modal, setModal: createModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
