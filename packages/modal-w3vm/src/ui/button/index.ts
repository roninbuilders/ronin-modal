import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { loadENS, openModal } from '../../utils/functions'
import { subW3 } from '@w3vm/core'
import { styles } from './styles'
import { sub } from '../../store'

subW3.status(console.log)
@customElement('ronin-button')
export class RoninButton extends LitElement {
	static styles = styles

	@property() label: string = 'Open Modal'
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
		this.user = address.slice(0, 6) + '...' + address.slice(-6)
		const ens = await loadENS()
    this.classes = { ...this.classes, truncate: Boolean(ens) }
	}

	protected onENS(ens: string | undefined) {
		if (ens) {
			this.user = ens
		}
	}

	protected _unsubscribeAddress: () => void
	protected _unsubscribeENS: () => void

	constructor() {
		super()
		this._unsubscribeAddress = subW3.address(this.onAddress.bind(this))
		this._unsubscribeENS = sub.ens(this.onENS.bind(this))
		this.addEventListener('click', openModal)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.removeEventListener('click', openModal)
		this._unsubscribeAddress()
		this._unsubscribeENS()
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
