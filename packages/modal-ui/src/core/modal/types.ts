export type View = 'main' | 'qr-code' | 'extension' | 'install' | 'account' | 'SIWE' | 'waypoint'

export type ConnectorID = 'injected' | 'walletConnect' | 'waypoint'

export interface ModalStore {
	open: boolean
	view: View
	darkMode: boolean
}
