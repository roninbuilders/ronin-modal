import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styles } from './styles'
import { openModal } from '../../core/modal'
import type { CoreStatus } from '../../core/wallet/types'
import { getCore, subCore } from '../../core/wallet/store'

@customElement('ronin-button')
export class RoninButton extends LitElement {
	static styles = styles

	@property() label: string = 'Connect Wallet'
	@property() user: string | undefined
	@property()
	classes = { truncate: false, button: true }

	protected labelTemplate() {
		if (this.user) return this.user
		else return this.label
	}

	protected _onStatus(status: CoreStatus) {
		if (status === 'Disconnecting') {
			this.user = status
		}
	}

	protected _onAddress(address: string | undefined) {
		this.classes = { ...this.classes, truncate: false }
		if (!address) {
			this.user = undefined
			return
		}
		this.user = address.slice(0, 4) + '...' + address.slice(-4)
	}

	protected _onRNS(RNS: string | undefined) {
		if (RNS) this.user = RNS
		this.classes = { ...this.classes, truncate: Boolean(RNS) }
	}

	protected _unsubscribeAddress: () => void
	protected _unsubscribeStatus: () => void
	protected _unsubscribeRNS: () => void

	constructor() {
		super()
		this._onAddress(getCore.address())
		this._onStatus(getCore.status())
		this._unsubscribeRNS = subCore.RNS(this._onRNS.bind(this))
		this._unsubscribeAddress = subCore.address(this._onAddress.bind(this))
		this._unsubscribeStatus = subCore.status(this._onStatus.bind(this))
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this._unsubscribeAddress()
		this._unsubscribeStatus()
		this._unsubscribeRNS()
	}

	render() {
		return html`<button @click="${openModal}" class="${classMap(this.classes)}">${this.labelTemplate()}</button>`
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
