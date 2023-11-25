import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { getAddress, openModal } from '../../utils/functions'
import { styles } from './styles'
import { watchAccount } from '@wagmi/core'
import { get } from '../../store'

@customElement('ronin-button')
export class RoninButton extends LitElement {
	static styles = styles

	@property()	
	label: string = 'Open Modal'

	private labelTemplate() {
		const address = getAddress()
		if (address) return address
		else return this.label
	}

	private _onAccountChange(){
		this.requestUpdate()
	}

	protected _unwatchAccount: ()=>void

	constructor() {
		super()
		const config = get.config()
		if(!config) throw Error("Config not found")
		this._unwatchAccount = watchAccount(config, {
			onChange: this._onAccountChange.bind(this)
		})
		this.addEventListener('click', openModal)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.removeEventListener('click', openModal)
		this._unwatchAccount()
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
