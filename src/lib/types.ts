import { RoninModal } from "./ui/ronin-modal";

export type View = 'main' | 'qr-code' | 'extension' | 'install' | 'account'

export type Status = 'Initializing' | 'Connecting' | 'Disconnecting' | 'Loading' | undefined

declare global {
  interface HTMLElementTagNameMap {
    'ronin-modal': RoninModal;
  }
}