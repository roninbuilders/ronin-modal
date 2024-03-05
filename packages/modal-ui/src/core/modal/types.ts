export type View = 'main' | 'qr-code' | 'extension' | 'install' | 'account' | 'SIWE'

export type ConnectorID = 'injected' | 'walletConnect'

export interface ModalStore {
	open: boolean
	view: View
	darkMode: boolean
}