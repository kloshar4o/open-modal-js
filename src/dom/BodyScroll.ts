import { ModalInterface } from "../types";

export default class BodyScroll {
  readonly #state: {
    locked: boolean;
    openModals: Set<ModalInterface>;
    savedPosition: { X: number; Y: number };
    lockBodyStyles: {
      overflow: string;
      position: string;
      height: string;
      width: string;
      left: string;
      top: string;
    };
  };

  constructor() {
    this.#state = {
      openModals: new Set(),
      locked: false,
      savedPosition: { X: 0, Y: 0 },
      lockBodyStyles: {
        overflow: "",
        position: "",
        height: "",
        width: "",
        left: "",
        top: "",
      },
    };
  }

  get locked() {
    return this.#state.locked;
  }

  lock(modal: ModalInterface) {
    this.#state.openModals.add(modal);
    if (this.locked) return;
    this.#state.locked = true;
    this.#state.savedPosition.Y = window.scrollY;
    this.#state.savedPosition.X = window.scrollX;
    const bodyComputedStyles = window.getComputedStyle(document.body);
    const computedTop = parseInt(bodyComputedStyles.top) || 0;
    const computedLeft = parseInt(bodyComputedStyles.left) || 0;
    const calculateTop = this.#state.savedPosition.Y - computedTop;
    const calculateLeft = this.#state.savedPosition.X - computedLeft;
    const { lockBodyStyles } = this.#state;
    lockBodyStyles.top = `-${calculateTop}px`;
    lockBodyStyles.left = `-${calculateLeft}px`;
    lockBodyStyles.width = bodyComputedStyles.width;
    lockBodyStyles.height = bodyComputedStyles.height;
    lockBodyStyles.position = "fixed";
    lockBodyStyles.overflow = "hidden";

    for (const [styleName, styleValue] of Object.entries(lockBodyStyles)) {
      document.body.style.setProperty(styleName, styleValue);
    }
  }

  unlock(modal: ModalInterface) {
    this.#state.openModals.delete(modal);
    if (this.#state.openModals.size) return;

    for (const lockBodyStyle in this.#state.lockBodyStyles) {
      document.body.style.removeProperty(lockBodyStyle);
    }
    window.scrollTo(this.#state.savedPosition.X, this.#state.savedPosition.Y);
    this.#state.locked = false;
  }
}
