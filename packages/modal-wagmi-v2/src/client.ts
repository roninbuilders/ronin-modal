import {
	CoreStatus,
	WALLETCONNECT_ID,
	WAYPOINT_ID,
	createCore,
	initModal,
	setCore,
	setModal,
} from '@roninbuilders/modal-ui'
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
	injected,
} from '@wagmi/core'
import { walletConnect } from '@wagmi/connectors'
import { RONIN_RDNS } from '@roninbuilders/modal-ui'
import { WaypointProvider } from '@sky-mavis/waypoint'
import { EIP1193Provider } from 'viem'

const { set: setWagmi, get: getWagmi } = createStore<WagmiStore>({
	config: undefined,
})

export function createRoninModal({
	projectId,
	chain,
	metadata,
	transport,
	darkMode,
	waypoint,
	ssr,
	storage
}: CreateRoninModalOptions): ReturnType<typeof createConfig> {
	if (darkMode) setModal.darkMode(darkMode)

	initModal()

	if (!projectId) throw Error('Project ID is undefined')

	const waypointConnector = waypoint
		? injected({
				target() {
					return {
						id: 'waypoint',
						name: 'Ronin Waypoint',
						provider: WaypointProvider.create({
							clientId: waypoint.clientId,
							chainId: chain.id,
						}) as EIP1193Provider,
					}
				},
			})
		: undefined
	const connectors = waypointConnector
		? [walletConnect({ projectId, showQrModal: false, metadata }), waypointConnector]
		: [walletConnect({ projectId, showQrModal: false, metadata })]

	const defaultRPC = chain.rpcUrls.default.http[0]

	const config = createConfig({
		chains: [chain],
		connectors: connectors,
		transports: {
			[chain.id]: transport ? transport : http(defaultRPC),
		},
		ssr,
		storage
	})
	setWagmi.config(config)

	createCore({
		address: getAccount(config).address,
		status: getStatus(),
		extensionInstalled,
		connectWalletConnect,
		connectExtension,
		connectWaypoint,
		disconnect,
		subscribe_status,
		subscribe_address,
		subscribe_URI,
		isWaypoint: Boolean(waypoint)
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

async function connectWaypoint() {
	const config = getConfig()
	const connector = getConnectors(config).find(({ id }) => id === WAYPOINT_ID)

	if (!connector) throw Error('Connector not found')
	await connect(config, { connector })
}

function disconnect() {
	const config = getConfig()
	_disconnect(config)
}

function subscribe_status(callback: Callback<CoreStatus>) {
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
