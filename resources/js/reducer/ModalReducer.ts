import { ModalState, OpenModal } from "@/context/ModalContext";

export type ModalAction<T = any> =
  | ({
      type: "OPEN";
    } & OpenModal<T>)
  | {
      type: "CLOSE";
    };

export const ModalReducer = (state: ModalState, action: ModalAction) => {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        view: action.view,
        size: action.size,
        payload: action.payload,
        isOpen: true,
      };

    case "CLOSE":
      return {
        ...state,
        view: undefined,
        size: undefined,
        payload: undefined,
        isOpen: false,
      };
  }
};
