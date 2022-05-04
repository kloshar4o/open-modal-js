class BodyScroll {
  private locked: boolean;
  private savedPosition: { X: number; Y: number };
  private readonly lockBodyStyles: {
    overflow: string;
    position: string;
    height: string;
    width: string;
    left: string;
    top: string;
  };

  constructor() {
    this.locked = false;
    this.savedPosition = { X: 0, Y: 0 };
    this.lockBodyStyles = {
      overflow: "",
      position: "",
      height: "",
      width: "",
      left: "",
      top: "",
    };
  }

  lock() {
    if (this.locked) return;
    this.locked = true;
    this.savedPosition.Y = window.scrollY;
    this.savedPosition.X = window.scrollX;
    const bodyComputedStyles = window.getComputedStyle(document.body);
    const computedTop = parseInt(bodyComputedStyles.top) || 0;
    const computedLeft = parseInt(bodyComputedStyles.left) || 0;
    const calculateTop = this.savedPosition.Y - computedTop;
    const calculateLeft = this.savedPosition.X - computedLeft;
    this.lockBodyStyles.top = `-${calculateTop}px`;
    this.lockBodyStyles.left = `${calculateLeft}px`;
    this.lockBodyStyles.width = bodyComputedStyles.width;
    this.lockBodyStyles.height = bodyComputedStyles.height;
    this.lockBodyStyles.position = "fixed";
    this.lockBodyStyles.overflow = "hidden";

    for (const [styleName, styleValue] of Object.entries(this.lockBodyStyles)) {
      document.body.style.setProperty(styleName, styleValue);
    }
  }

  unlock() {
    for (const lockBodyStyle in this.lockBodyStyles) {
      document.body.style.removeProperty(lockBodyStyle);
    }
    window.scrollTo(this.savedPosition.X, this.savedPosition.Y);
    this.locked = false;
  }
}

export default new BodyScroll();
