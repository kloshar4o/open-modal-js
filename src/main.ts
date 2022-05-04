import Modal from "./Modal";
import bodyClick from "./BodyClick";

document.addEventListener("DOMContentLoaded", init, false);
function init() {
  document.body.addEventListener("click", bodyClick.eventHandler);
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    Modal: Object;
  }
}

window.Modal = Modal;
