import Modal from "@/components/Modal";
import Preferences from "@/components/modals/Preferences";
import { ModalAction, ModalReducer } from "@/reducer/ModalReducer";
import { createContext, useContext, useReducer } from "react";

export type ModalViews = "PREFERENCES";
export type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl";
export type OpenModal<T = any> = {
  view?: ModalViews;
  size?: ModalSize;
  payload?: T;
};

export type ModalState<T = any> = {
  view?: ModalViews;
  size?: ModalSize;
  data?: T;
  isOpen: boolean;
  openModal: <T>({ view, size, payload }: OpenModal<T>) => void;
  closeModal: () => void;
};

const ModalInitialState: ModalState = {
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
};

const ModalContext = createContext<ModalState>(ModalInitialState);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within ModalContext");
  }

  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispacth] = useReducer<React.Reducer<ModalState, ModalAction>>(
    ModalReducer,
    ModalInitialState,
  );

  const openModal = ({ view, size, payload }: OpenModal) =>
    dispacth({
      type: "OPEN",
      view: view,
      size: size,
      payload: payload,
    });

  const closeModal = () =>
    dispacth({
      type: "CLOSE",
    });

  const values = {
    ...state,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={values}>
      {children}
      <ModalChildren />
    </ModalContext.Provider>
  );
};

export const ModalChildren = () => {
  const { isOpen, openModal, closeModal, size, view } = useModalContext();

  return (
    <Modal show={isOpen} onClose={closeModal} maxWidth={size}>
      {view === "PREFERENCES" && <Preferences />}
    </Modal>
  );
};
