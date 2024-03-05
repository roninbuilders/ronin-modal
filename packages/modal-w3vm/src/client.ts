import { createCore, initModal, setModal } from '@roninbuilders/modal-ui'
import { getW3, initW3 } from '@w3vm/core'
import { WalletConnect } from '@w3vm/walletconnect'
import type { RoninOptions } from './types'
import {
	getStatus,
	signMessage,
	extensionInstalled,
	connectWalletConnect,
	connectExtension,
	disconnect,
	subscribe_status,
	subscribe_address,
	subscribe_URI,
} from './utils/coreFunctions'

export function createRoninModal({ SSR, projectId, chain, darkMode, siweConfig: _siweConfig }: RoninOptions) {
	if (darkMode) setModal.darkMode(darkMode)

	initModal()

	let siweConfig
	if (_siweConfig) siweConfig = { ..._siweConfig, signMessage, getAddress: getW3.address, getChainId: getW3.chainId }

	const w3props = initW3({
		connectors: [
			new WalletConnect({
				projectId,
				showQrModal: false,
				chains: [Number(chain.chainId)],
			}),
		],
		SSR,
	})

	createCore({
		address: getW3.address(),
		status: getStatus(),
		extensionInstalled,
		connectWalletConnect,
		connectExtension,
		disconnect,
		subscribe_status,
		subscribe_address,
		subscribe_URI,
		siweConfig,
	})

	return w3props
}
