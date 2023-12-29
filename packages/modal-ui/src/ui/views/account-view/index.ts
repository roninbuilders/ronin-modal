import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styles } from './styles'

import { roninWhite } from '../../../assets/roninWhite'
import { closeModal, setModal } from '../../../core/modal'

import { blo } from 'blo'
import { disconnectImg } from '../../../assets/disconnect'
import { copyImg } from '../../../assets/copy'
import { getCore, subCore } from '../../../core/wallet'

@customElement('account-view')
export class AccountView extends LitElement {
	static styles = styles

	@property() user: string | undefined
	@state() _copy: string = 'Copy'

	protected copyAddress() {
		const address = getCore.address()
		if (!address) return
		navigator?.clipboard.writeText(address)
		this._copy = 'Copied!'
		setTimeout(()=>{this._copy = 'Copy'}, 1400)
	}

	protected profileTemplate() {
		const address = getCore.address()
		if (address)
			return html`
    <img
      alt=""
      src="${blo(address as '0x${string}', 30)}"
    />
    `
	}

	protected _onAddress(address: string | undefined) {
		if (address) {
			this.user = address.slice(0, 4) + '...' + address.slice(-4)
		} else {
			this.user = undefined
		}
	}

	protected _onRNS(RNS: string | undefined) {
		if (RNS) this.user = RNS
	}

	protected handleDisconnect() {
		getCore.disconnect()?.()
		setModal.open(false)
		setModal.view('main')
	}

	protected _unsubscribeAddress: () => void
	protected _unsubscribeRNS: () => void

	constructor() {
		super()
		const RNS = getCore.RNS()
		const _address = getCore.address()
		const address = _address ? _address.slice(0, 4) + '...' + _address.slice(-4) : _address
		this.user = RNS ? RNS : address
		this._unsubscribeAddress = subCore.address(this._onAddress.bind(this))
		this._unsubscribeRNS = subCore.status(this._onRNS.bind(this))
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this._unsubscribeAddress()
	}

	render() {
		return html`
      <span id="title" >
        ${roninWhite}
        <p>Connected</p>
        <button @click="${closeModal}" id="close">
          <svg class="LoginDialog_closeIcon__mmEo2" viewBox="0 0 24 24" width="24" height="24" style="fill: currentcolor;">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L12 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414L13.414 12l4.293 4.293a1 1 0 0 1-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L10.586 12 6.293 7.707a1 1 0 0 1 0-1.414Z" fill="currentColor"></path>
          </svg>
        </button>
      </span>
      <div id="card-container" >
        <div class="pfp-border" >
          <div class="pfp" >
            ${this.profileTemplate()}
          </div>
        </div>
        ${this.user}
        <div class="btn-group" >
          <button class="button" @click="${this.copyAddress}" >${copyImg} ${this._copy}</button>
          <button class="button" @click="${this.handleDisconnect}" >${disconnectImg} Disconnect</button>
        </div>
      </div>
    `
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'account-view': AccountView
	}
}
