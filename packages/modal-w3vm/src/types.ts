import { Chain, Provider } from '@w3vm/core'

export type RoninOptions = {
	SSR?: boolean
	projectId: string
	chain: Chain
	darkMode?: boolean
}

export type Callback<T> = (status: T) => void

declare global {
	interface Window {
		ronin?: {
			provider: Provider
			roninEvent: EventTarget
		}
	}
}
