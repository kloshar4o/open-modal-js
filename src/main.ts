import ModalController, { ModalCallback, ModalConfig, ModalEvent } from "./ModalController";
import BodyClick from "./BodyClick";
import BodyScroll from "./BodyScroll";

const bodyClick = new BodyClick();
const bodyScroll = new BodyScroll();

document.addEventListener("opening:modal", (event: ModalEvent) => {
  // Removes overflow hidden from the body
  bodyScroll.lock(event.detail);
});

document.addEventListener("closed:modal", (event: ModalEvent) => {
  // Sets overflow hidden to the body
  bodyScroll.unlock(event.detail);
});

document.addEventListener("DOMContentLoaded", () => {
  // BodyClick class uses single event listener, no meter how many modals we have
  document.body.addEventListener("click", bodyClick.eventHandler);
});

class Modal extends ModalController {
  constructor(modalId: string, config?: ModalConfig, callback?: ModalCallback) {
    super(modalId, config, callback);

    // Add modal to closeModalHandler for overlay and close button clicks
    bodyClick.addModalToHandler(this);
  }
}

// Since this is vanilla JS, we are adding the Modal class globally
window.Modal = Modal;
