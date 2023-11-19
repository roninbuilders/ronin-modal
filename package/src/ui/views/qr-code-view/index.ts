import { LitElement, html, svg } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styles } from './styles'
import { QrCodeUtil } from '../../../utils/qrcode'
import { subWC } from '@w3vm/walletconnect'
import { set } from '../../../store'
import { roninBlue } from '../../../assets/roninBlue'
import { Status } from '../../../types'
import { getW3, subW3 } from '@w3vm/core'

@customElement('qr-code')
export class QRCode extends LitElement {
	static styles = styles

	@property()
	size: number = 230

	@state()
	uri: string = ''

	protected unsubscribeWait: () => void

	protected _handleWait(wait: Status) {
		if (getW3.address()) {
			this.close()
			return
		}
	}

	protected _handleUri(uri: string) {
		this.uri = uri
	}

	protected _unsubscribeUri: () => void

	constructor() {
		super()
		this._unsubscribeUri = subWC.uri(this._handleUri.bind(this))
		this.unsubscribeWait = subW3.wait(this._handleWait.bind(this))
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this._unsubscribeUri()
		this.unsubscribeWait()
	}

	private svgTemplate() {
		return this.uri
			? svg`                
        <svg class="svg" height=${this.size} width=${this.size}>
          ${QrCodeUtil.generate(this.uri, this.size, this.size / 4)}
        </svg>`
			: html`<span class="qr-place-holder" ><div></div></span>`
	}

	goBack() {
		set.view('main')
	}

	close() {
		set.open(false)
		set.view('main')
	}

	render() {
		return html`
      <span id="title" >        
        <button @click="${this.goBack}" id="go-back">
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-projection-id="568">
            <path d="M8 1L1 8L8 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
        <p>Scan QR Code</p>
        <button @click="${this.close}" id="close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-projection-id="467">
            <path d="M1 13L13 1M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
          </svg>
        </button>
      </span>
      <div id="qr-code">
        ${this.svgTemplate()}
        ${roninBlue}
      </div>

    `
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'qr-code': QRCode
	}
}
