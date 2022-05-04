import ModalController from "./modal/ModalController";
import BodyClick from "./dom/BodyClick";
import BodyScroll from "./dom/BodyScroll";
import { ModalCallback, ModalConfig, ModalEvent } from "./types";

const bodyClick = new BodyClick();
const bodyScroll = new BodyScroll();

document.addEventListener("opening:modal", (event: ModalEvent) => {
  // Removes overflow hidden from the body
  console.log("opening:modal");
  bodyScroll.lock(event.detail);
});

document.addEventListener("closed:modal", (event: ModalEvent) => {
  console.log("closed:modal");
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
