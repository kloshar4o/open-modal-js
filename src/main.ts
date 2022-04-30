import Modal from "./Modal";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    Modal: Object;
  }
}

window.Modal = Modal;
