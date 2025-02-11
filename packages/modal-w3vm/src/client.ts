import { createCore, initModal, setModal, WAYPOINT_ID } from '@roninbuilders/modal-ui'
import { Connector, EIP1193Provider, getW3, initW3, Injected } from '@w3vm/core'
import { WalletConnect } from '@w3vm/walletconnect'
import type { RoninOptions } from './types'
import {
	getStatus,
	signMessage,
	extensionInstalled,
	connectWalletConnect,
	connectExtension,
	connectWaypoint,
	disconnect,
	subscribe_status,
	subscribe_address,
	subscribe_URI,
} from './utils/coreFunctions'
import { WaypointProvider } from '@sky-mavis/waypoint'

export function createRoninModal({ SSR, projectId, chain, darkMode, siweConfig: _siweConfig, waypoint }: RoninOptions) {
	if (darkMode) setModal.darkMode(darkMode)

	initModal()

	let siweConfig
	if (_siweConfig) siweConfig = { ..._siweConfig, signMessage, getAddress: getW3.address, getChainId: getW3.chainId }

	let connectors: Connector[] = [
		new WalletConnect({
			projectId,
			showQrModal: false,
			chains: [Number(chain.chainId)],
		}),
	]

	if (waypoint) {
		const provider = WaypointProvider.create({
			clientId: waypoint.clientId,
			chainId: Number(chain.chainId),
		}) as EIP1193Provider

		connectors.push(
			new Injected({
				id: WAYPOINT_ID,
				name: 'Ronin Waypoint',
				getProvider: () => provider,
			}),
		)
	}
	const w3props = initW3({
		connectors,
		SSR,
	})

	createCore({
		address: getW3.address(),
		status: getStatus(),
		extensionInstalled,
		connectWalletConnect,
		connectExtension,
		connectWaypoint,
		disconnect,
		subscribe_status,
		subscribe_address,
		subscribe_URI,
		siweConfig,
	})

	return w3props
}
