import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { styles } from './styles'

import './small-card/index'
import { roninWhite } from '../../../assets/roninWhite'
import { roninBlue } from '../../../assets/roninBlue'
import { qrImg } from '../../../assets/qr'

@customElement('main-view')
export class MainView extends LitElement {
	static styles = styles

	render() {
		return html`
      <span id="title" >
        ${roninWhite}
        <title-rmc>
          Connect Wallet
        </title-rmc>
        <cross-rmc></cross-rmc>
      </span>
      <div id="card-container" >
        <small-card text="Browser Extension" type="injected">${roninBlue}</small-card>
        <small-card text="Mobile Wallet" type="walletConnect" >${qrImg}</small-card>
      </div>
    `
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'main-view': MainView
	}
}
