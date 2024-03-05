import { INJECTED_ID, WALLETCONNECT_ID } from '../utils/constants'
import { isMobile } from '../utils/mobile'
import { getCore } from '../wallet/store'
import { setModal } from './store'
import { ConnectorID } from './types'

export async function initModal() {
	if (typeof window !== 'undefined') {
		await import('../../ui/ronin-modal')
		const modal = document.createElement('ronin-modal')
		document.body.insertAdjacentElement('beforeend', modal)
		document.body.style.width = '100%'
	}
}

export function openModal() {
	const address = getCore.address()
	if (address) {
		setModal.view('account')
		setModal.open(true)
		return
	}
	if (isMobile() && !address) getCore.connectWalletConnect()?.()
	setModal.open(true)
}

export async function closeModal() {
	setModal.open(false), setModal.view('main')
  
  if(getCore.is_SIWE_enabled() && getCore.address()){
    const { getSIWE } = await import('@roninbuilders/siwe')
    const getSession = getSIWE.getSession()

    const isValid = await getSession?.()
    if(!isValid){
      getCore.disconnect()?.()
    }
  }
}

export function goToMain() {
	setModal.view('main')
}

export async function connectModal(CONNECTOR_ID: ConnectorID) {
	if (CONNECTOR_ID === WALLETCONNECT_ID) getCore.connectWalletConnect()?.()
	if (CONNECTOR_ID === INJECTED_ID) getCore.connectExtension()?.()
}

export async function onConnect(){
  if (getCore.address()) {
    if(getCore.is_SIWE_enabled()){
      setModal.view('SIWE')
      return
    }
    closeModal()
    return
  }
}