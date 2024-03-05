import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styles } from './styles'

import { roninWhite } from '../../../assets/roninWhite'

import { blo } from 'blo'
import { disconnectImg } from '../../../assets/disconnect'
import { copyImg } from '../../../assets/copy'
import { getCore, subCore } from '../../../core/wallet/store'
import { setModal } from '../../../core/modal/store'

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
		setTimeout(() => {
			this._copy = 'Copy'
		}, 1400)
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
        <title-rmc>
          Connected
        </title-rmc>
        <cross-rmc></cross-rmc>
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
