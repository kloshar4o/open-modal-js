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

export interface ModalCallback {
  onOpening?: Function;
  onOpened?: Function;
  onClosing?: Function;
  onClosed?: Function;
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
