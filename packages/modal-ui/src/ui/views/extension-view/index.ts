import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './styles'

import { retry } from '../../../assets/try'
import { INJECTED_ID } from '../../../core/utils/constants'
import { Core_status, getCore, subCore } from '../../../core/wallet'
import { closeModal, connectModal } from '../../../core/modal'
import { roninShiny } from '../../../assets/roninShiny'

@customElement('extension-view')
export class ExtensionView extends LitElement {
	static styles = styles

	@state() protected _status: Core_status

	protected _unsubscribeStatus: () => void

	protected _onStatus(status: Core_status) {
		this._status = status
	}

	installWallet() {
		window.open('https://wallet.roninchain.com/', '_blank')
	}

	constructor() {
		super()
		this._status = getCore.status()
		this._unsubscribeStatus = subCore.status(this._onStatus.bind(this))
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this._unsubscribeStatus()
	}

	private statusTemplate() {
		if (!getCore.extensionInstalled()?.()) {
			return html`
			<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="install-extension"><path opacity="0.5" d="M23.1174 7.75H80.954C85.1689 7.75 88.5714 11.1082 88.5714 15.2334V77.7008C88.5714 80.5529 87.2643 83.2555 85.0091 85.0567L55.5616 108.576C53.5077 110.216 50.5637 110.216 48.5098 108.576L19.0623 85.0567C16.8071 83.2555 15.5 80.5529 15.5 77.7008V15.2334C15.5 11.1082 18.9026 7.75 23.1174 7.75Z" stroke="white"></path><path opacity="0.6" fill-rule="evenodd" clip-rule="evenodd" d="M71 19C74.3137 19 77 21.6479 77 24.9143V43.9913L76.9983 44.1473C76.9152 48.0379 73.7316 51.1768 69.7849 51.2598L69.6245 51.2615L69.7828 51.2631C73.7298 51.345 76.9141 54.4832 76.9983 58.3736L77 58.5317V70.4649C77 72.1626 76.2599 73.7784 74.9681 74.9012L59.896 88L59.8962 61.2653C59.8962 57.9989 57.2099 55.351 53.8962 55.351H45.1038L45.1035 88L30.0319 74.9012C28.7401 73.7784 28 72.1626 28 70.4649V24.9143C28 21.6479 30.6863 19 34 19H71ZM59.8962 27.179H45.1038V45.3544H53.8962C57.2099 45.3544 59.8962 42.7065 59.8962 39.4401V27.179Z" fill="url(#paint0_linear_3592_169378)" fill-opacity="0.4"></path><circle cx="85.4288" cy="86.1779" r="31.5714" fill="#18191B"></circle><circle opacity="0.4" cx="85.5" cy="86.5" r="25" stroke="url(#paint1_linear_3592_169378)" stroke-width="5"></circle><circle opacity="0.5" cx="85.5" cy="86.5" r="27" stroke="white"></circle><path opacity="0.5" d="M74.7998 89.1855V93.5308C74.7998 95.1877 76.143 96.5308 77.7998 96.5308H94.3308C95.9877 96.5308 97.3308 95.1877 97.3308 93.5308V89.1855" stroke="white" stroke-linecap="round"></path><path opacity="0.5" d="M86.5654 74C86.5654 73.7239 86.3416 73.5 86.0654 73.5C85.7893 73.5 85.5654 73.7239 85.5654 74L86.5654 74ZM85.7119 91.52C85.9071 91.7153 86.2237 91.7153 86.419 91.52L89.601 88.3381C89.7962 88.1428 89.7962 87.8262 89.601 87.631C89.4057 87.4357 89.0891 87.4357 88.8939 87.631L86.0654 90.4594L83.237 87.631C83.0417 87.4357 82.7252 87.4357 82.5299 87.631C82.3346 87.8262 82.3346 88.1428 82.5299 88.3381L85.7119 91.52ZM85.5654 74L85.5654 91.1665L86.5654 91.1665L86.5654 74L85.5654 74Z" fill="white"></path><defs><linearGradient id="paint0_linear_3592_169378" x1="52.5" y1="19" x2="52.5" y2="94.5957" gradientUnits="userSpaceOnUse"><stop stop-color="white"></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient><linearGradient id="paint1_linear_3592_169378" x1="57.1871" y1="51.3727" x2="81.6145" y2="116.175" gradientUnits="userSpaceOnUse"><stop stop-color="#0059FF"></stop><stop offset="0.494792" stop-color="#615EFF"></stop><stop offset="1" stop-color="#42F5FB"></stop></linearGradient></defs></svg>
			<span>Install Ronin Extension</span>
      <div class="button" @click="${this.installWallet}" >Download</div>
      `
		}
		switch (this._status) {
			case 'Connecting':
				return html`
				${roninShiny}
				<div class="text">
					<span class="status" >Requesting Connection</span>
					<span class="description" >
						Open the Ronin browser extension.
					</span>
				</div>`
			case undefined:
				if (getCore.address()) {
					closeModal()
					return
				}
				return html`
      	<span class="fail-svg">
				${roninShiny}</span>
				<div class="text">
					<span>Failed to connect</span>
					<div class="button" @click="${() => connectModal(INJECTED_ID)}">${retry} Try Again</div>
				</div>
        `
		}
	}

	render() {
		return html`
      <span id="title" >
        <back-rmc></back-rmc>
        <title-rmc>
          Browser Extension
        </title-rmc>
        <cross-rmc></cross-rmc>
      </span>
      ${this.statusTemplate()}
    `
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'extension-view': ExtensionView
	}
}
