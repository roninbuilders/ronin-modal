import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './styles'

import { retry } from '../../../assets/try'
import { INJECTED_ID } from '../../../core/utils/constants'
import { closeModal, connectModal } from '../../../core/modal'
import { roninShiny } from '../../../assets/roninShiny'
import { installImg } from '../../../assets/install'
import type { CoreStatus } from '../../../core/wallet/types'
import { getCore, subCore } from '../../../core/wallet/store'

@customElement('extension-view')
export class ExtensionView extends LitElement {
	static styles = styles

	@state() protected _status: CoreStatus

	protected _unsubscribeStatus: () => void

	protected _onStatus(status: CoreStatus) {
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
			${installImg}
      <span class="install-description">Install Ronin Wallet</span>
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
