import ModalController from "./modal/ModalController";
import BodyClick from "./dom/BodyClick";
import BodyScroll from "./dom/BodyScroll";
import { ModalCallback, ModalConfig, ModalEventMap } from "./interfaces";

const bodyClick = new BodyClick();
const bodyScroll = new BodyScroll();

document.addEventListener("opening:modal", (event) => {
  // Removes overflow hidden from the body
  bodyScroll.lock(event.detail);
});
document.addEventListener("closed:modal", (event) => {
  // Sets overflow hidden to the body
  bodyScroll.unlock(event.detail);
});
document.addEventListener("DOMContentLoaded", () => {
  // BodyClick class uses single event listener, no meter how many modals we have
  document.body.addEventListener("click", bodyClick.eventHandler);
});

class OpenModalJs extends ModalController {
  constructor(modalId: string, config?: ModalConfig, callback?: ModalCallback) {
    super(modalId, config, callback);

    // Add modal to closeModalHandler for overlay and close button clicks
    bodyClick.addModalToHandler(this);
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    OpenModalJs: typeof OpenModalJs;
  }
  interface Document {
    addEventListener<K extends keyof ModalEventMap>(
      type: K,
      listener: (this: Document, ev: ModalEventMap[K]) => void
    ): void;
  }
}

export { ModalController, BodyClick, BodyScroll };
export default OpenModalJs;
window.OpenModalJs = OpenModalJs;
