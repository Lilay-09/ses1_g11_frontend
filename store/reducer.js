import { ACITONS } from "./Actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case ACITONS.AUTH:
      return { ...state, auth: action.payload };
    case ACITONS.NOTIFY:
      return { ...state, notify: action.payload };
    case ACITONS.MODAL:
      return { ...state, modal: action.payload };
    default:
      return state;
  }
};
