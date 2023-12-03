import { LitElement, html, svg } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styles } from './styles'
import { QrCodeUtil } from '../../../core/utils/qrcode'
import { roninBlue } from '../../../assets/roninBlue'
import { getCore, subCore } from '../../../core/wallet'
import { closeModal, goToMain } from '../../../core/modal'

@customElement('qr-code')
export class QRCode extends LitElement {
	static styles = styles

	@property()
	size: number = 230

	@state()
	uri: string = ''

	protected _unsubscribeStatus: () => void

	protected _handleStatus() {
		if (getCore.address()) closeModal()
	}

	protected _handleUri(uri: string) {
		this.uri = uri
	}

	protected _unsubscribeUri: () => void

	constructor() {
		super()
		this._unsubscribeUri = subCore.URI(this._handleUri.bind(this))
		this._unsubscribeStatus = subCore.status(this._handleStatus.bind(this))
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this._unsubscribeUri()
		this._unsubscribeStatus()
	}

	private svgTemplate() {
		return this.uri
			? svg`                
        <svg class="svg" height=${this.size} width=${this.size}>
          ${QrCodeUtil.generate(this.uri, this.size, this.size / 4)}
        </svg>`
			: html`<span class="qr-place-holder" ><div></div></span>`
	}

	render() {
		return html`
      <span id="title" >        
        <button @click="${goToMain}" id="go-back">
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-projection-id="568">
            <path d="M8 1L1 8L8 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
        <span class="title" >Ronin Wallet</span>
        <button @click="${closeModal}" id="close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-projection-id="467">
            <path d="M1 13L13 1M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
          </svg>
        </button>
      </span>
      <div id="qr-code">
        ${this.svgTemplate()}
        ${roninBlue}
      </div>
			<span class="description">
				Scan this QR Code with your phone
			</span>
    `
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'qr-code': QRCode
	}
}
