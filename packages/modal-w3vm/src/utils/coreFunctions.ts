import { CoreStatus, RONIN_RDNS, WALLETCONNECT_ID } from '@roninbuilders/modal-ui'
import { connectW3, disconnectW3, getW3, subW3 } from '@w3vm/core'
import { Callback } from '../types'
import { subWC } from '@w3vm/walletconnect'

export async function signMessage(message: string) {
	const provider = getW3.walletProvider()
	const address = getW3.address()

	const signature = await provider?.request({
		method: 'personal_sign',
		params: [message, address],
	})

	return signature as string
}

export function getStatus() {
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

export function extensionInstalled() {
	return typeof window !== 'undefined' ? Boolean(window.ronin) : false
}

export async function connectWalletConnect() {
	const connector = getW3.connectors().find(({ id }) => id === WALLETCONNECT_ID)
	if (connector) connectW3({ connector })
}

export async function connectExtension() {
	const connector = getW3.connectors().find(({ id }) => id === RONIN_RDNS)
	if (connector) connectW3({ connector })
}

export function disconnect() {
	disconnectW3()
}

export function subscribe_status(callback: Callback<CoreStatus>) {
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

export function subscribe_address(callback: Callback<string | undefined>) {
	function sub(address: string | undefined) {
		callback(address)
	}
	return subW3.address(sub)
}

export function subscribe_URI(callback: Callback<string>) {
	function sub(uri: string) {
		callback(uri)
	}
	return subWC.uri(sub)
}
