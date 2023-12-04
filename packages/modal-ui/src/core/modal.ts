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
		const fontEl = document.createElement('link')
		fontEl.rel = 'stylesheet'
		fontEl.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap'

		document.head.appendChild(fontEl)

		const fontPreload = document.createElement('link')
		fontPreload.rel = 'preload'
		fontPreload.as = 'font'
		fontPreload.crossOrigin = 'true'
		fontPreload.type = 'font/woff2'
		fontPreload.href = 'https://fonts.gstatic.com/s/worksans/v19/QGYsz_wNahGAdqQ43Rh_fKDp.woff2'

		document.head.appendChild(fontPreload)

		const modal = document.createElement('ronin-modal')
		document.body.insertAdjacentElement('beforeend', modal)
		document.body.style.width = '100%'
	}
}

export function openModal() {
	if (getCore.address()) return getCore.disconnect()?.()
	if (isMobile()) getCore.connectWalletConnect()?.()
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
