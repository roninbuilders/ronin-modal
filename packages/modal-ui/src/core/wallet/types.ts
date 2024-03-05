import type { SIWEConfig } from "@roninbuilders/siwe"

export type Subscriber<T> = (callback: (status: T) => void) => () => void

export type CoreStatus = 'Connecting' | 'Disconnecting' | 'GeneratingURI' | undefined

export interface CoreSubscribers {
	subscribe_status: Subscriber<CoreStatus>
	subscribe_address: Subscriber<string | undefined>
	subscribe_URI: Subscriber<string>
}

export interface CoreStates {
	status: CoreStatus
	address: string | undefined
	RNS: string | undefined
	URI: string
  is_SIWE_enabled: boolean
	extensionInstalled: () => boolean
	connectWalletConnect?: () => void
	connectExtension?: () => void
	disconnect?: () => void
}

export type CreateCore = Omit<CoreStates, 'URI' | 'RNS' | 'is_SIWE_enabled'> & CoreSubscribers & { siweConfig?: SIWEConfig }