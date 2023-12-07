import { Core_status, RONIN_RDNS, WALLETCONNECT_ID, createCore, initModal } from '@roninbuilders/modal-ui'
import { getW3, connectW3, initW3, disconnectW3, subW3 } from '@w3vm/core'
import { WalletConnect, subWC } from '@w3vm/walletconnect'
import { Callback, RoninOptions } from './types'

export function createRoninModal({ SSR, projectId, chain }: RoninOptions) {
	initModal()

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
	})

	return w3props
}

function getStatus() {
	const status = getW3.status()
	switch (status) {
		case 'GeneratingURI':
		case 'Disconnecting':
		case 'Connecting':
			return status
		default:
			return undefined
	}
}

function extensionInstalled() {
	return typeof window !== 'undefined' ? Boolean(window.ronin) : false
}

async function connectWalletConnect() {
	const connector = getW3.connectors().find(({ id }) => id === WALLETCONNECT_ID)
	if (connector) connectW3({ connector })
}

async function connectExtension() {
	const connector = getW3.connectors().find(({ id }) => id === RONIN_RDNS)
	if (connector) connectW3({ connector })
}

function disconnect() {
	disconnectW3()
}

function subscribe_status(callback: Callback<Core_status>) {
	function sub(status: ReturnType<typeof getW3.status>) {
		switch (status) {
			case 'GeneratingURI':
			case 'Disconnecting':
			case 'Connecting':
				callback(status)
				break
			default:
				callback(undefined)
				break
		}
	}
	return subW3.status(sub)
}

function subscribe_address(callback: Callback<string | undefined>) {
	function sub(address: string | undefined) {
		callback(address)
	}
	return subW3.address(sub)
}

function subscribe_URI(callback: Callback<string>) {
	function sub(uri: string) {
		callback(uri)
	}
	return subWC.uri(sub)
}
