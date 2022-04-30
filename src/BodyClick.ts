import { ModalInterface } from "./Modal";

function closeModalHandler(
  clickedTarget: HTMLElement,
  modals: Set<ModalInterface>
) {
  let modalToBeClosed = null;
  for (const modal of modals) {
    const modalElement = document.getElementById(modal.modalId);
    if (modalElement && !modalElement.contains(clickedTarget)) continue;
    const isCloseTarget = clickedTarget.classList.contains("modal-close");
    const isOverlayTarget = clickedTarget.classList.contains("modal-overlay");
    if (isCloseTarget || isOverlayTarget) modalToBeClosed = modal;
  }
  modalToBeClosed && modalToBeClosed.closeModal();
}

class BodyClick {
  private readonly modals: Set<ModalInterface>;
  public readonly eventHandler: OmitThisParameter<(event: MouseEvent) => void>;

  constructor() {
    this.modals = new Set<ModalInterface>();
    this.eventHandler = this.bodyClicked.bind(this);
  }

  bodyClicked(event: MouseEvent) {
    if (!this.modals.size) return;
    closeModalHandler(event.target as HTMLElement, this.modals);
  }

  addModalToHandler(modal: ModalInterface) {
    this.modals.add(modal);
  }
}

const bodyClick = new BodyClick();
document.body.addEventListener("click", bodyClick.eventHandler);
export default bodyClick;
