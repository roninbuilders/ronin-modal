import { connectW3, disconnectW3, getW3 } from '@w3vm/core'
import { isMobile } from './mobile'
import { WALLETCONNECT_ID } from '../w3vm/constants'
import { set } from '../store'
import { ConnectorID } from '../types'

export function openModal() {
	if (getW3.address()) return disconnectW3()
	if (isMobile()) {
		const connector = getW3.connectors().find(({ id }) => id === WALLETCONNECT_ID)
		if (connector) connectW3({ connector })
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
    let RNS = (await import('@wehmoen/rnsts')).default
    if (
      typeof RNS !== 'function' &&
      // @ts-expect-error This import error is not visible to TypeScript
      typeof RNS.default === 'function'
    ){
      RNS = (RNS as unknown as { default: typeof RNS }).default
    }    
    const rns = new RNS()

		const address = getW3.address()
		if (!address) throw Error('User is not connected - unable to fetch ENS')
		const result = await rns.getName(address)
		if (result){
      set.ens(result)
      return true
    }
	} catch (e) {
		console.error(e)
	}
}

export async function connectModal(CONNECTOR_ID: ConnectorID) {
	const connector = getW3.connectors().find(({ id }) => id === CONNECTOR_ID)
	if (connector) connectW3({ connector })
}
