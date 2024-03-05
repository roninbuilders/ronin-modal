import { LitElement, html, svg } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styles } from './styles'
import { QrCodeUtil } from '../../../core/utils/qrcode'
import { roninBlue } from '../../../assets/roninBlue'
import { closeModal } from '../../../core/modal'
import { getCore, subCore } from '../../../core/wallet/store'

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
        <back-rmc></back-rmc>
        <title-rmc>
          Ronin Wallet
        </title-rmc>
        <cross-rmc></cross-rmc>
      </span>
      <div id="qr-code">
        ${this.svgTemplate()}
        ${roninBlue}
      </div>
			<span class="description">
				Scan with your Ronin Wallet
			</span>
    `
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'qr-code': QRCode
	}
}
