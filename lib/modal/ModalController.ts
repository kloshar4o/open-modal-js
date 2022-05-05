import { ModalCallback, ModalConfig, ModalInterface } from "../interfaces";

export default class ModalController implements ModalInterface {
  #state: { isOpen: boolean };
  public readonly modalId: string;
  private callback: ModalCallback;
  public config: ModalConfig;

  constructor(modalId: string, config: ModalConfig = {}, callback: ModalCallback = {}) {
    this.modalId = modalId;
    this.#state = { isOpen: false };
    this.callback = callback;

    this.config = {
      openClass: config.overlayClass || "open",
      closeButtonClass: config.closeButtonClass || "modal-close",
      overlayClass: config.overlayClass || "modal-overlay",
      openOnInit: config.openOnInit || false,
    };

    if (this.config.openOnInit) this.openModal();
  }

  get isOpen() {
    return this.#state.isOpen;
  }

  set isOpen(isOpen: boolean) {
    if (isOpen) this.openModal();
    else this.closeModal();
  }

  get element(): HTMLElement | null {
    return document.getElementById(this.modalId);
  }

  closeModal() {
    const modal = this.element;
    if (!modal || !this.config.openClass) return;
    modal.classList.remove(this.config.openClass);

    this.#state.isOpen = false;

    const event = { detail: this };

    const closingHandler = () => {
      modal.removeEventListener("transitionstart", closingHandler);
      document.dispatchEvent(new CustomEvent("closing:modal", event));
      this.callback.onClosing && this.callback.onClosing(this);
    };

    const closedHandler = () => {
      modal.removeEventListener("transitionend", closedHandler);
      modal.removeEventListener("transitioncancel", closedHandler);
      document.dispatchEvent(new CustomEvent("closed:modal", event));
      this.callback.onClosed && this.callback.onClosed(this);
    };

    modal.addEventListener("transitionstart", closingHandler, { once: true });
    modal.addEventListener("transitioncancel", closedHandler, { once: true });
    modal.addEventListener("transitionend", closedHandler, { once: true });

    if (getComputedStyle(modal).transitionDuration === "0s") {
      closingHandler();
      closedHandler();
    }
  }

  openModal() {
    const modal = this.element;
    if (!modal || !this.config.openClass) return;
    modal.classList.add(this.config.openClass);

    this.#state.isOpen = true;

    const event = { detail: this };
    const openingHandler = () => {
      modal.removeEventListener("transitionstart", openingHandler);
      document.dispatchEvent(new CustomEvent("opening:modal", event));
      this.callback.onOpening && this.callback.onOpening(this);
    };

    const openedHandler = () => {
      modal.removeEventListener("transitionend", openedHandler);
      modal.removeEventListener("transitioncancel", openedHandler);
      document.dispatchEvent(new CustomEvent("opened:modal", event));
      this.callback.onOpened && this.callback.onOpened(this);
    };

    modal.addEventListener("transitionstart", openingHandler, { once: true });
    modal.addEventListener("transitioncancel", openedHandler, { once: true });
    modal.addEventListener("transitionend", openedHandler, { once: true });

    if (getComputedStyle(modal).transitionDuration === "0s") {
      openedHandler();
      openingHandler();
    }
  }
}
