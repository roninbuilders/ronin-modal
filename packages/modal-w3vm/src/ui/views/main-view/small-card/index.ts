import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styles } from './styles'
import { set } from '../../../../store'
import { connectModal } from '../../../../utils/functions'
import { ConnectorID } from '../../../../types'
import { INJECTED_ID, WALLETCONNECT_ID } from '../../../../w3vm/constants'

@customElement('small-card')
export class SmallCard extends LitElement {
	static styles = styles

	@property()
	text?: string
	@property()
	type?: ConnectorID

	changeView() {
		if (this.type) connectModal(this.type)
		switch (this.type) {
			case INJECTED_ID:
				set.view('extension')
				break
			case WALLETCONNECT_ID:
				set.view('qr-code')
				break
			default:
				throw new Error('Invalid type in small-card element')
		}
	}

	render() {
		return html`
    <div @click="${this.changeView}" id='card'>
      ${this.text}
      <slot></slot>
    </div>
    `
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'small-card': SmallCard
	}
}
