import { Config, Storage } from '@wagmi/core'
import { Chain, Transport } from 'viem'

export type Callback<T> = (status: T) => void

export type WagmiStore = {
	config?: Config
}

export type CreateRoninModalOptions = {
	projectId: string
	chain: Chain
	metadata?: {
		name: string
		description: string
		url: string
		icons: string[]
	}
	darkMode?: boolean
	waypoint?: {
		clientId: string
	}
	
	transport?: Transport
	storage?: Storage
	ssr?: boolean
}

declare global {
	interface Window {
		ronin?: {
			provider: unknown
			roninEvent: EventTarget
		}
	}
}
