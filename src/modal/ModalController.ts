export interface ModalConfig {
  openClass?: string;
  openOnInit?: boolean;
  overlayClass?: string;
  closeButtonClass?: string;
}

export interface ModalInterface {
  modalId: string;
  isOpen: boolean;
  element: HTMLElement | null;
  config: ModalConfig;
  openModal(): void;
  closeModal(): void;
}

export interface ModalEvent extends CustomEvent {
  detail: ModalInterface;
}

export interface ModalEventMap {
  "closing:modal": ModalEvent;
  "closed:modal": ModalEvent;
  "opening:modal": ModalEvent;
  "opened:modal": ModalEvent;
}

export interface ModalCallback {
  onOpen?: Function;
  onOpened?: Function;
  onClosing?: Function;
  onClosed?: Function;
}

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
    document.dispatchEvent(new CustomEvent("closing:modal", event));
    this.callback.onClosing && this.callback.onClosing(this);

    const closedHandler = () => {
      document.dispatchEvent(new CustomEvent("closed:modal", event));
      this.callback.onClosed && this.callback.onClosed(this);
    };

    modal.addEventListener("transitionend", closedHandler, { once: true });
  }

  openModal() {
    const modal = this.element;
    if (!modal || !this.config.openClass) return;
    modal.classList.add(this.config.openClass);

    this.#state.isOpen = true;
    this.callback.onOpen && this.callback.onOpen(this);

    const event = { detail: this };
    document.dispatchEvent(new CustomEvent("opening:modal", event));

    const openedHandler = () => {
      document.dispatchEvent(new CustomEvent("opened:modal", event));
      this.callback.onOpened && this.callback.onOpened(this);
    };

    modal.addEventListener("transitionend", openedHandler, { once: true });
  }
}
