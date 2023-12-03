import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styles } from './styles'
import { getCore, subCore } from '../../core/wallet'
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

	protected async onAddress(address: string | undefined) {
    this.classes = { ...this.classes, truncate: false }
		if (!address) {
			this.user = undefined
			return
		}
		this.user = address.slice(0, 4) + '...' + address.slice(-4)
    
		const ens = await getCore.fetchENS()?.()
    if(ens) this.user = ens
    this.classes = { ...this.classes, truncate: Boolean(ens) }
	}

	protected _unsubscribeAddress: () => void

	constructor() {
		super()
		this._unsubscribeAddress = subCore.address(this.onAddress.bind(this))
		this.addEventListener('click', openModal)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.removeEventListener('click', openModal)
		this._unsubscribeAddress()
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
