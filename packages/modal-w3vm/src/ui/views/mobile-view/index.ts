import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './styles'

import { getW3, subW3 } from '@w3vm/core'
import { Status } from '../../../types'
import { roninBlue } from '../../../assets/roninBlue'
import { retry } from '../../../assets/try'
import { closeModal, connectModal } from '../../../utils/functions'
import { WALLETCONNECT_ID } from '../../../w3vm/constants'

@customElement('mobile-view')
export class MobileView extends LitElement {
	static styles = styles

	@state() protected _status: Status

	protected _unsubscribeWait: () => void

	protected _handleWait(wait: Status) {
		this._status = wait
	}

	constructor() {
		super()
		this._status = getW3.wait()
		this._unsubscribeWait = subW3.wait(this._handleWait.bind(this))
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this._unsubscribeWait()
	}

	private statusTemplate() {
		switch (this._status) {
			case 'Connecting':
				return html`
				<span>Connecting...</span>
				<span class="description" >
					Accept the connection request in the mobile wallet.
				</span>
			`
			case undefined:
				if (getW3.address()) {
					closeModal()
					return
				}
				return html`
					<span class="description" >
						Failed to connect
					</span>
          <div class="button" @click="${() => connectModal(WALLETCONNECT_ID)}">${retry} Try Again</div>
        `
		}
	}

	render() {
		return html`
      <span id="title" >
        <p>Ronin Wallet</p>
        <button @click="${closeModal}" id="close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-projection-id="467">
            <path d="M1 13L13 1M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
          </svg>
        </button>
        </button>
      </span>
			${roninBlue}
			<div class="text">
				${this.statusTemplate()}
			</div>
    `
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'mobile-view': MobileView
	}
}
