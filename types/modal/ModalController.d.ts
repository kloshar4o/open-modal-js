import { ModalCallback, ModalConfig, ModalInterface } from "../interfaces";
export default class ModalController implements ModalInterface {
    #private;
    readonly modalId: string;
    private callback;
    config: ModalConfig;
    constructor(modalId: string, config?: ModalConfig, callback?: ModalCallback);
    get isOpen(): boolean;
    set isOpen(isOpen: boolean);
    get element(): HTMLElement | null;
    closeModal(): void;
    openModal(): void;
}
//# sourceMappingURL=ModalController.d.ts.map