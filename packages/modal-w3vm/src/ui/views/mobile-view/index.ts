import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './styles'

import { getW3, subW3 } from '@w3vm/core'
import { roninBlue } from '../../../assets/roninBlue'
import { retry } from '../../../assets/try'
import { closeModal, connectModal } from '../../../utils/functions'
import { WALLETCONNECT_ID } from '../../../w3vm/constants'
import { getWC } from '@w3vm/walletconnect'
import { isAndroid } from '../../../utils/mobile'

@customElement('mobile-view')
export class MobileView extends LitElement {
	static styles = styles

	@state() protected _status: ReturnType<typeof getW3.status> | 'ReadyToConnect'

	protected _unsubscribeStatus: () => void

	protected _handleStatus(status: ReturnType<typeof getW3.status>){
    if(status === 'Connecting'){
      this._status = 'ReadyToConnect'
      return
    }
		this._status = status
	}

  private handleConnectIOS(){
    this._status = 'Connecting'
    const uri = getWC.uri()
    if(uri) window.open(
			`https://wallet.roninchain.com/auth-connect?uri=${encodeURIComponent(uri)}`,
			'_self',
			'noreferrer noopener',
		)
    else throw Error('Uri was undefined while trying to connect on mobile')
  }
  
  private handleConnectAndroid(){
    this._status = 'Connecting'
    const uri = getWC.uri()
    if(uri) window.open(
			`https://wallet.roninchain.com/auth-connect?uri=${encodeURIComponent(uri)}`,
			'_self',
			'noreferrer noopener',
		)
    else throw Error('Uri was undefined while trying to connect on mobile')
  }

	constructor() {
		super()
    const status = getW3.status()
		this._status = status === 'Connecting' ? 'ReadyToConnect' : status 
		this._unsubscribeStatus = subW3.status(this._handleStatus.bind(this))
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this._unsubscribeStatus()
	}

	private statusTemplate() {
		switch (this._status) {
      case 'GeneratingURI':
      case 'ReadyToConnect':
        if(isAndroid()){
          return html`
          <button class="button" ?disabled="${Boolean(this._status === 'GeneratingURI')}" @click="${this.handleConnectAndroid}" >
            <span>${this._status === 'GeneratingURI' ? 'Loading' : 'Connect'}</span>
          </button>`
        }
				return html`
        <button class="button" ?disabled="${Boolean(this._status === 'GeneratingURI')}" @click="${this.handleConnectIOS}" >
          <span>${this._status === 'GeneratingURI' ? 'Loading' : 'Connect'}</span>
        </button>
			`
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
