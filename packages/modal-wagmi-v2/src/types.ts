import { Chain, Transport } from "viem"

export type View = 'main' | 'qr-code' | 'extension' | 'install' | 'account'

export type Status = 'Initializing' | 'Connecting' | 'Disconnecting' | 'Loading' | undefined

export type ConnectorID = 'injected' | 'walletConnect'

export type CreateRoninModalOptions = {
  projectId: string
  chain: Chain
  metadata?: {
    name: string
    description: string
    url: string
    icons: string[]
  }
  transport?: Transport
}

declare global {
	interface Window {
		ronin?: {
			provider: unknown
			roninEvent: EventTarget
		}
	}
}