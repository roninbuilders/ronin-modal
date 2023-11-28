import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { loadENS, openModal } from '../../utils/functions'
import { styles } from './styles'
import { GetAccountReturnType, watchAccount } from '@wagmi/core'
import { get, sub } from '../../store'

@customElement('ronin-button')
export class RoninButton extends LitElement {
	static styles = styles

	@property()
	label: string = 'Open Modal'
	@property() user: string | undefined

	protected labelTemplate() {
		if (this.user) return this.user
		else return this.label
	}

	protected onAddress({ address }: GetAccountReturnType) {
		if (!address) {
			this.user = undefined
			return
		}
		this.user = address.slice(0, 6) + '...' + address.slice(-6)
		loadENS()
	}

	protected onENS(ens: string | undefined) {
		if (ens) {
			this.user = ens
		}
	}

	protected _unwatchAccount: () => void
	protected _unsubscribeENS: () => void

	constructor() {
		super()
		const config = get.config()
		if (!config) throw Error('Config not found')
		this._unwatchAccount = watchAccount(config, {
			onChange: this.onAddress.bind(this),
		})
		this._unsubscribeENS = sub.ens(this.onENS.bind(this))
		this.addEventListener('click', openModal)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.removeEventListener('click', openModal)
		this._unwatchAccount()
		this._unsubscribeENS()
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
			'ronin-button': Pick<RoninButton, 'label'> | object
		}
	}
}
