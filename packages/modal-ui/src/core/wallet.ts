import { getName } from '@roninbuilders/rns'
import { createStore } from 'vanilla-cafe'

export type Subscriber<T> = (callback: (status: T) => void) => () => void

export type Core_status = 'Connecting' | 'Disconnecting' | 'GeneratingURI' | undefined

export interface Core_subscribers {
	subscribe_status: Subscriber<Core_status>
	subscribe_address: Subscriber<string | undefined>
	subscribe_URI: Subscriber<string>
}

export interface Core_states {
	status: Core_status
	address: string | undefined
	RNS: string | undefined
	URI: string
	extensionInstalled: () => boolean
	connectWalletConnect?: () => void
	connectExtension?: () => void
	disconnect?: () => void
}

export type CreateCore = Omit<Core_states, 'URI' | 'RNS'> & Core_subscribers

export const {
	set: setCore,
	sub: subCore,
	get: getCore,
} = createStore<Core_states>({
	status: undefined,
	address: undefined,
	URI: '',
	RNS: undefined,

	/* functions */
	extensionInstalled: () => false,
	connectWalletConnect: undefined,
	connectExtension: undefined,
	disconnect: undefined,
})

export function createCore(config: CreateCore) {
	if (typeof window === 'undefined') return

	setCore.address(config.address)
	setCore.status(config.status)

	setCore.extensionInstalled(() => config.extensionInstalled)
	setCore.connectExtension(() => config.connectExtension)
	setCore.connectWalletConnect(() => config.connectWalletConnect)
	setCore.disconnect(() => config.disconnect)

	config.subscribe_URI(setCore.URI)
	config.subscribe_address(setCore.address)
	config.subscribe_status(setCore.status)

	async function onAddress(address: string | undefined) {
		if (address) {
      try{
        const RNS = await getName(address)
        setCore.RNS(RNS)
      }catch(e){console.error("Error while getting name: ", e)}
		} else {
			setCore.RNS(undefined)
		}
	}
	subCore.address(onAddress)
}
