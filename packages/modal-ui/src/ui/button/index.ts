import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styles } from './styles'
import { type Core_status, getCore, subCore } from '../../core/wallet'
import { openModal } from '../../core/modal'

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

	protected _onStatus(status: Core_status) {
		if (status === 'Disconnecting') {
			this.user = status
		}
	}

	protected async _onAddress(address: string | undefined) {
		this.classes = { ...this.classes, truncate: false }
		if (!address) {
			this.user = undefined
			return
		}
		this.user = address.slice(0, 4) + '...' + address.slice(-4)

		const ens = await getCore.fetchENS()?.()
		if (address && ens) this.user = ens
		this.classes = { ...this.classes, truncate: Boolean(ens) }
	}

	protected _unsubscribeAddress: () => void
	protected _unsubscribeStatus: () => void

	constructor() {
		super()
    this._onAddress(getCore.address())
    this._onStatus(getCore.status())
		this._unsubscribeAddress = subCore.address(this._onAddress.bind(this))
		this._unsubscribeStatus = subCore.status(this._onStatus.bind(this))
		this.addEventListener('click', openModal)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.removeEventListener('click', openModal)
		this._unsubscribeAddress()
		this._unsubscribeStatus()
	}

	render() {
		return html`<button class="${classMap(this.classes)}">${this.labelTemplate()}</button>`
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
