import ModalController from "./modal/ModalController";
import BodyClick from "./dom/BodyClick";
import BodyScroll from "./dom/BodyScroll";
import { ModalCallback, ModalConfig, ModalEventMap } from "./interfaces";
declare class OpenModalJs extends ModalController {
    constructor(modalId: string, config?: ModalConfig, callback?: ModalCallback);
}
declare global {
    interface Window {
        OpenModalJs: typeof OpenModalJs;
    }
    interface Document {
        addEventListener<K extends keyof ModalEventMap>(type: K, listener: (this: Document, ev: ModalEventMap[K]) => void): void;
    }
}
export { ModalController, BodyClick, BodyScroll };
export default OpenModalJs;
//# sourceMappingURL=main.d.ts.map