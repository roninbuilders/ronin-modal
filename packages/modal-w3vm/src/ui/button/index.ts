import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { getAddress, openModal } from '../../utils/functions'
import { subW3 } from '@w3vm/core'
import { styles } from './styles'

@customElement('ronin-button')
export class RoninButton extends LitElement {
	static styles = styles

	@property() label: string = 'Open Modal'

	protected labelTemplate() {
		const address = getAddress()
		if (address) return address
		else return this.label
	}

	protected _onAddressChange() {
		this.requestUpdate()
	}

	protected _unsubscribeAddress: ()=>void

	constructor() {
		super()
		this._unsubscribeAddress = subW3.address(this._onAddressChange.bind(this))
		this.addEventListener('click', openModal)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.removeEventListener('click', openModal)
		this._unsubscribeAddress()
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
