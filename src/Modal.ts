import bodyClick from "./BodyClick";

export interface ModalInterface {
  modalId: string;
  openModal(): void;
  closeModal(): void;
}

class Modal implements ModalInterface {
  public modalId: string;
  private state: { isOpen: boolean };

  constructor(modalId: string, isOpen = false) {
    this.modalId = modalId;
    this.state = { isOpen };
    bodyClick.addModalToHandler(this);
    if (isOpen) this.openModal();
  }

  get isOpen() {
    return this.state.isOpen;
  }

  set isOpen(isOpen: boolean) {
    if (isOpen) this.openModal();
    else this.closeModal();
  }

  closeModal() {
    const modal = document.getElementById(this.modalId);
    if (!modal) return;
    modal.classList.remove("open");
    this.state.isOpen = false;
  }

  openModal() {
    const modal = document.getElementById(this.modalId);
    if (modal) modal.classList.add("open");
    this.state.isOpen = true;
  }
}

export default Modal;
