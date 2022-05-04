import { ModalEventMap } from "./modal/ModalController";

declare global {
  interface Document {
    addEventListener<K extends keyof ModalEventMap>(
      type: K,
      listener: (this: Document, ev: ModalEventMap[K]) => void
    ): void;
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    Modal: Object;
  }
}
