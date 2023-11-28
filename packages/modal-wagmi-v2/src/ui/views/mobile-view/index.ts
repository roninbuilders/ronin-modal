import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './styles'
import { roninBlue } from '../../../assets/roninBlue'
import { retry } from '../../../assets/try'
import { closeModal, connectModal } from '../../../utils/functions'
import { GetAccountReturnType, getAccount, getConnectors, watchAccount } from '@wagmi/core'
import { WALLETCONNECT_ID } from '../../../utils/constants'
import { get } from '../../../store'

@customElement('mobile-view')
export class MobileView extends LitElement {
	static styles = styles

	@state() protected _status: GetAccountReturnType['status']
	@state() uri: string = ''

	protected _handleStatus({ status }: { status: GetAccountReturnType['status'] }) {
		this._status = status
	}

	protected _unwatchAccount: () => void

	protected _handleUri({ type, data }: { type: string; data?: unknown }) {
		if (type === 'display_uri') {
			this.uri = data as string
		}
	}

	constructor() {
		super()
		const config = get.config()
		if (!config) throw Error('Config not found')
		this._status = getAccount(config).status
		this._unwatchAccount = watchAccount(config, {
			onChange: this._handleStatus.bind(this),
		})
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this._unwatchAccount()
		const config = get.config()
		if (!config) throw Error('Config not found')
		const wc = getConnectors(config).find(({ id }) => id === WALLETCONNECT_ID)
		wc?.emitter.off('message', this._handleUri.bind(this))
	}

	private statusTemplate() {
		switch (this._status) {
			case 'connecting':
			case 'reconnecting':
				return html`
				<span>Connecting...</span>
				<span class="description" >
					Accept the connection request in the mobile wallet.
				</span>
			`
			case 'connected':
				closeModal()
				return
			case 'disconnected':
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
