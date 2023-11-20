import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './styles'

import { set } from '../../../store'
import { Connector, connectW3, getW3, subW3 } from '@w3vm/core'
import { Status } from '../../../types'
import { WALLETCONNECT_ID } from '../../../w3vm/constants'
import { subWC } from '@w3vm/walletconnect'
import { roninBlue } from '../../../assets/roninBlue'
import { retry } from '../../../assets/try'

@customElement('mobile-view')
export class MobileView extends LitElement {
	static styles = styles

	@state() protected _status: Status
	@state() uri: string = ''

	protected _unsubscribeWait: () => void
	protected _unsubscribeUri: () => void

	protected _handleWait(wait: Status) {
		this._status = wait
	}

	goBack() {
		set.view('main')
	}

	close() {
		set.open(false)
		set.view('main')
	}

	connect() {
		const connector = getW3.connectors().find(({ id }) => id === WALLETCONNECT_ID) as Connector
		connectW3({ connector })
	}

	protected _handleUri(uri: string) {
		this.uri = uri
	}

	constructor() {
		super()
		this._status = getW3.wait()
		this._unsubscribeWait = subW3.wait(this._handleWait.bind(this))
		this._unsubscribeUri = subWC.uri(this._handleUri.bind(this))
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this._unsubscribeWait()
		this._unsubscribeUri()
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
					this.close()
					return
				}
				return html`
					<span class="description" >
						Accept the connection request in the mobile wallet.
					</span>
          <div class="button" @click="${this.connect}">${retry} Try Again</div>
        `
		}
	}

	render() {
		return html`
      <span id="title" >
        <p>Ronin Wallet</p>
        <button @click="${this.close}" id="close">
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
