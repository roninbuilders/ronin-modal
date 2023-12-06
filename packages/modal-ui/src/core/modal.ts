import { createStore } from 'vanilla-cafe'
import { INJECTED_ID, WALLETCONNECT_ID } from './constants'
import { getCore } from './wallet'

import '../ui/ronin-modal'
import { isMobile } from './utils/mobile'

export type View = 'main' | 'qr-code' | 'extension' | 'install' | 'account'

export type ConnectorID = 'injected' | 'walletConnect'

interface Modal {
	open: boolean
	view: View
}

export const {
	set: setModal,
	sub: subModal,
	get: getModal,
} = createStore<Modal>({
	open: false,
	view: 'main',
})

export function initModal() {
	if (typeof window !== 'undefined') {

    const style = document.createElement('style')
    const css =`
    @font-face {
      font-family: 'SF Pro Rounded';
      src: url(../fonts/SF-Pro-Rounded-Regular.ttf) format('ttf');
      font-weight: 500;
      font-style: normal;
    }
    `
    style.textContent = css
    document.head.appendChild(style)

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

export function closeModal() {
	setModal.open(false), setModal.view('main')
}

export function goToMain() {
	setModal.view('main')
}

export async function connectModal(CONNECTOR_ID: ConnectorID) {
	if (CONNECTOR_ID === WALLETCONNECT_ID) getCore.connectWalletConnect()?.()
	if (CONNECTOR_ID === INJECTED_ID) getCore.connectExtension()?.()
}
