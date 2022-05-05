var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _state, _bodyClicked, bodyClicked_fn, _closeModalHandler, closeModalHandler_fn, _state2;
class ModalController {
  constructor(modalId, config = {}, callback = {}) {
    __privateAdd(this, _state, void 0);
    __publicField(this, "modalId");
    __publicField(this, "callback");
    __publicField(this, "config");
    this.modalId = modalId;
    __privateSet(this, _state, { isOpen: false });
    this.callback = callback;
    this.config = {
      openClass: config.overlayClass || "open",
      closeButtonClass: config.closeButtonClass || "modal-close",
      overlayClass: config.overlayClass || "modal-overlay",
      openOnInit: config.openOnInit || false
    };
    if (this.config.openOnInit)
      this.openModal();
  }
  get isOpen() {
    return __privateGet(this, _state).isOpen;
  }
  set isOpen(isOpen) {
    if (isOpen)
      this.openModal();
    else
      this.closeModal();
  }
  get element() {
    return document.getElementById(this.modalId);
  }
  closeModal() {
    const modal = this.element;
    if (!modal || !this.config.openClass)
      return;
    modal.classList.remove(this.config.openClass);
    __privateGet(this, _state).isOpen = false;
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
    if (!modal || !this.config.openClass)
      return;
    modal.classList.add(this.config.openClass);
    __privateGet(this, _state).isOpen = true;
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
_state = new WeakMap();
class BodyClick {
  constructor() {
    __privateAdd(this, _bodyClicked);
    __privateAdd(this, _closeModalHandler);
    __publicField(this, "modals");
    __publicField(this, "eventHandler");
    this.modals = /* @__PURE__ */ new Set();
    this.eventHandler = __privateMethod(this, _bodyClicked, bodyClicked_fn).bind(this);
  }
  addModalToHandler(modal) {
    this.modals.add(modal);
  }
}
_bodyClicked = new WeakSet();
bodyClicked_fn = function(event) {
  if (!this.modals.size)
    return;
  __privateMethod(this, _closeModalHandler, closeModalHandler_fn).call(this, event);
};
_closeModalHandler = new WeakSet();
closeModalHandler_fn = function(event) {
  const clickedTarget = event.target;
  let modalToBeClosed = null;
  for (const modal of this.modals) {
    const modalElement = modal.element;
    if (!modalElement || !modalElement.contains(clickedTarget))
      continue;
    const { overlayClass, closeButtonClass } = modal.config;
    const isCloseTarget = closeButtonClass && clickedTarget.classList.contains(closeButtonClass);
    const isOverlayTarget = overlayClass && clickedTarget.classList.contains(overlayClass);
    if (isCloseTarget || isOverlayTarget)
      modalToBeClosed = modal;
  }
  if (modalToBeClosed) {
    modalToBeClosed.closeModal();
    event.preventDefault();
  }
};
class BodyScroll {
  constructor() {
    __privateAdd(this, _state2, void 0);
    __privateSet(this, _state2, {
      openModals: /* @__PURE__ */ new Set(),
      locked: false,
      savedPosition: { X: 0, Y: 0 },
      lockBodyStyles: {
        overflow: "",
        position: "",
        height: "",
        width: "",
        left: "",
        top: ""
      }
    });
  }
  get locked() {
    return __privateGet(this, _state2).locked;
  }
  lock(modal) {
    __privateGet(this, _state2).openModals.add(modal);
    if (this.locked)
      return;
    __privateGet(this, _state2).locked = true;
    __privateGet(this, _state2).savedPosition.Y = window.scrollY;
    __privateGet(this, _state2).savedPosition.X = window.scrollX;
    const bodyComputedStyles = window.getComputedStyle(document.body);
    const computedTop = parseInt(bodyComputedStyles.top) || 0;
    const computedLeft = parseInt(bodyComputedStyles.left) || 0;
    const calculateTop = __privateGet(this, _state2).savedPosition.Y - computedTop;
    const calculateLeft = __privateGet(this, _state2).savedPosition.X - computedLeft;
    const { lockBodyStyles } = __privateGet(this, _state2);
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
  unlock(modal) {
    __privateGet(this, _state2).openModals.delete(modal);
    if (__privateGet(this, _state2).openModals.size)
      return;
    for (const lockBodyStyle in __privateGet(this, _state2).lockBodyStyles) {
      document.body.style.removeProperty(lockBodyStyle);
    }
    window.scrollTo(__privateGet(this, _state2).savedPosition.X, __privateGet(this, _state2).savedPosition.Y);
    __privateGet(this, _state2).locked = false;
  }
}
_state2 = new WeakMap();
const bodyClick = new BodyClick();
const bodyScroll = new BodyScroll();
document.addEventListener("opening:modal", (event) => {
  bodyScroll.lock(event.detail);
});
document.addEventListener("closed:modal", (event) => {
  bodyScroll.unlock(event.detail);
});
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", bodyClick.eventHandler);
});
class OpenModalJs extends ModalController {
  constructor(modalId, config, callback) {
    super(modalId, config, callback);
    bodyClick.addModalToHandler(this);
  }
}
window.OpenModalJs = OpenModalJs;
export { BodyClick, BodyScroll, ModalController, OpenModalJs as default };
