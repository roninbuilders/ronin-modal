export type View = 'main' | 'qr-code' | 'extension' | 'install' | 'account'

export type Status = 'Initializing' | 'Connecting' | 'Disconnecting' | 'Loading' | undefined

export type ConnectorID = 'injected' | 'walletConnect'