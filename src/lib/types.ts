import { RoninModal } from "./ui/ronin-modal";

export type View = 'main' | 'qr-code' | 'extension' | 'install' | 'account'

declare global {
  interface HTMLElementTagNameMap {
    "ronin-modal": RoninModal;
  }
}