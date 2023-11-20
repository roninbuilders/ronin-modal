import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { set } from '../../store'
import { Connector, connectW3, disconnectW3, getW3, setW3, subW3 } from '@w3vm/core'
import { isMobile } from '../../utils/mobile'
import { WALLETCONNECT_ID } from '../../w3vm/constants'

@customElement('ronin-button')
export class RoninButton extends LitElement {
	static styles = css`
  :host{
		font-weight: 500;
		user-select: none;
    background-color: #2662d9;
    color: #e2e4e9;
		font-family: -apple-system,BlinkMacSystemFont,Inter,system-ui,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    border-radius: 10px;
    cursor: pointer;
    padding: 13px;

		transition: cubic-bezier(0.25,0.1,0.25,1) 250ms all;
  }

	:host(:hover){
		background-color: #0f2757;
	}
  `

	@state() protected _connected: boolean = false
	@property() label: string = 'Open Modal'

	protected _open() {
		if (this._connected) return disconnectW3()
		if(isMobile()){
			const connector = getW3.connectors().find(({ id }) => id === WALLETCONNECT_ID) as Connector
			connectW3({ connector })
		}
		set.open(true)
	}

	private labelTemplate() {
		const address = getW3.address()
		if (this._connected && address) return address.slice(0, 6) + '...' + address.slice(-6)
		else return this.label
	}

	private _onAddressChange(address?: string) {
		this._connected = Boolean(address)
	}

	constructor() {
		super()
		this._connected = Boolean(getW3.address())
		subW3.address(this._onAddressChange.bind(this))
		this.addEventListener('click', this._open)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.removeEventListener('click', this._open)
	}

	render() {
		return html`<slot>${this.labelTemplate()}</slot>`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ronin-button': RoninButton
	}
	namespace JSX {
		interface IntrinsicElements {
			'ronin-button': Pick<RoninButton, 'label'> | {}
		}
	}
}
