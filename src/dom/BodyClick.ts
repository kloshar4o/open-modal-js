import { ModalInterface } from "../modal/ModalController";

export default class BodyClick {
  private readonly modals: Set<ModalInterface>;
  public readonly eventHandler: OmitThisParameter<(event: MouseEvent) => void>;

  constructor() {
    this.modals = new Set<ModalInterface>();
    this.eventHandler = this.#bodyClicked.bind(this);
  }

  #bodyClicked(event: MouseEvent) {
    if (!this.modals.size) return;
    this.#closeModalHandler(event.target as HTMLElement);
  }

  #closeModalHandler(clickedTarget: HTMLElement) {
    let modalToBeClosed = null;
    for (const modal of this.modals) {
      const modalElement = modal.element;
      if (modalElement && !modalElement.contains(clickedTarget)) continue;

      const { overlayClass, closeButtonClass } = modal.config;
      const isCloseTarget = closeButtonClass && clickedTarget.classList.contains(closeButtonClass);
      const isOverlayTarget = overlayClass && clickedTarget.classList.contains(overlayClass);

      if (isCloseTarget || isOverlayTarget) modalToBeClosed = modal;
    }
    modalToBeClosed && modalToBeClosed.closeModal();
  }

  addModalToHandler(modal: ModalInterface) {
    this.modals.add(modal);
  }
}
