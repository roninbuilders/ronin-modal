import { isMobile } from './mobile'
import { get, set } from '../store'
import { ConnectorID } from '../types'
import { Connector, connect, disconnect, getAccount, getConnectors } from '@wagmi/core'
import { INJECTED_ID, RONIN_RDNS, WALLETCONNECT_ID } from './constants'
import RNS from '@wehmoen/rnsts'

const rns = new RNS()

export function openModal() {
	const config = get.config()
	if (!config) throw Error('Config not found')

	if (getAccount(config).isConnected) return disconnect(config)

	const connector = getConnectors(config).find(({ id }) => id === WALLETCONNECT_ID)
	if (isMobile()) {
		if (!connector) throw 'WalletConnect connector not found'
		connect(config, { connector })
	}
	set.open(true)
}

export function closeModal() {
	set.open(false), set.view('main')
}

export function goToMain() {
	set.view('main')
}

export async function loadENS() {
	try {
		const config = get.config()
		if (!config) throw Error('Config not found')
		const { address } = getAccount(config)
		if (!address) throw Error('User is not connected - unable to fetch ENS')
		const result = await rns.getName(address)
		if (result) set.ens(result)
	} catch (e) {
		console.error(e)
	}
}

export async function connectModal(CONNECTOR_ID: ConnectorID) {
	const config = get.config()
	if (!config) throw Error('Config not found')

	let connector: Connector | undefined

	if (CONNECTOR_ID === INJECTED_ID) connector = getConnectors(config).find(({ id }) => id === RONIN_RDNS)
	else if (CONNECTOR_ID === WALLETCONNECT_ID)
		connector = getConnectors(config).find(({ id }) => id === WALLETCONNECT_ID)

	if (!connector) throw Error('Connector not found')
	await connect(config, { connector })
}
