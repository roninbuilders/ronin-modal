import { Core_status, WALLETCONNECT_ID, createCore, initModal, setCore } from '@roninbuilders/modal-ui'
import type { Callback, CreateRoninModalOptions, WagmiStore } from './types'
import { createStore } from 'vanilla-cafe'
import {
	connect,
	createConfig,
	disconnect as _disconnect,
	getAccount,
	getConnectors,
	http,
	watchAccount,
	GetAccountReturnType,
} from '@wagmi/core'
import { walletConnect } from '@wagmi/connectors'
import { RONIN_RDNS } from '@roninbuilders/modal-ui'

const { set: setWagmi, get: getWagmi } = createStore<WagmiStore>({
	config: undefined,
})

export function createRoninModal({ projectId, chain, metadata, transport }: CreateRoninModalOptions) {
	initModal()

	if (!projectId) throw Error('Project ID is undefined')

	const connectors = [walletConnect({ projectId, showQrModal: false, metadata })]

	const defaultRPC = chain.rpcUrls.default.http[0]
	const config = createConfig({
		chains: [chain],
		connectors,
		transports: {
			[chain.id]: transport ? transport : http(defaultRPC),
		},
	})
	setWagmi.config(config)

	createCore({
		address: getAccount(config).address,
		status: getStatus(),
		extensionInstalled,
		connectWalletConnect,
		connectExtension,
		disconnect,
		fetchRNS,
		subscribe_status,
		subscribe_address,
		subscribe_URI,
	})

	return config
}

function getConfig() {
	const config = getWagmi.config()
	if (!config) throw new Error('Config not found in getStatus function')

	return config
}

function getStatus() {
	const config = getConfig()
	const account = getAccount(config)
	if (account.isConnecting || account.isReconnecting) return 'Connecting'
}

function extensionInstalled() {
	return typeof window !== 'undefined' ? Boolean(window.ronin) : false
}

async function connectWalletConnect() {
	const config = getConfig()
	const connector = getConnectors(config).find(({ id }) => id === WALLETCONNECT_ID)

	if (!connector) throw Error('Connector not found')
	setCore.status('GeneratingURI')
	await connect(config, { connector })
}

async function connectExtension() {
	const config = getConfig()
	const connector = getConnectors(config).find(({ id }) => id === RONIN_RDNS)

	if (!connector) throw Error('Connector not found')
	await connect(config, { connector })
}

function disconnect() {
	const config = getConfig()
	_disconnect(config)
}

async function fetchRNS() {
	try {
		let RNS = (await import('@wehmoen/rnsts')).default
		if (
			typeof RNS !== 'function' &&
			// @ts-expect-error This import error is not visible to TypeScript
			typeof RNS.default === 'function'
		) {
			RNS = (RNS as unknown as { default: typeof RNS }).default
		}
		const rns = new RNS()
		const config = getConfig()
		const { address } = getAccount(config)
		if (!address) throw Error('User is not connected - unable to fetch ENS')
		const result = await rns.getName(address)

		return result
	} catch (e) {
		console.error(e)
	}
}

function subscribe_status(callback: Callback<Core_status>) {
	const config = getConfig()

	function sub(account: GetAccountReturnType) {
		if (account.isConnecting || account.isReconnecting) return callback('Connecting')
		callback(undefined)
	}

	return watchAccount(config, {
		onChange: sub,
	})
}

function subscribe_address(callback: Callback<string | undefined>) {
	const config = getConfig()

	function sub({ address }: GetAccountReturnType) {
		callback(address)
	}

	return watchAccount(config, {
		onChange: sub,
	})
}

function subscribe_URI(callback: Callback<string>) {
	const config = getConfig()

	function sub({ type, data }: { type: string; data?: unknown }) {
		if (type === 'display_uri') {
			callback(data as string)
			setCore.status('Connecting')
		}
	}

	const connector = getConnectors(config).find(({ id }) => id === WALLETCONNECT_ID)
	if (!connector) throw Error('WalletConnect Connector not found in subscribe_URI')

	connector.emitter.on('message', sub)

	return () => connector.emitter.off('message', sub)
}