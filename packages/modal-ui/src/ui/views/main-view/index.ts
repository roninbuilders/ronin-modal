import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { styles } from './styles'

import './small-card/index'
import { roninWhite } from '../../../assets/roninWhite'
import { roninBlue } from '../../../assets/roninBlue'
import { qrImg } from '../../../assets/qr'
import { isMobile } from '../../../core/utils/mobile'
import { getCore } from '../../../core/wallet/store'

@customElement('main-view')
export class MainView extends LitElement {
	static styles = styles

  protected extensionTemplate(){
    if(!isMobile()){
      return html`<small-card text="Browser Extension" type="injected" id="ronin-white-btn">${roninWhite}</small-card>`
    }
  }

  protected waypointTemplate(){
    if(getCore.isWaypoint()){
      return html`<small-card text="Ronin Waypoint" type="waypoint">${roninBlue}</small-card>`
    }
  }

	render() {
		return html`
      <span id="title" >
        ${roninWhite}
        <title-rmc>
          Connect Wallet
        </title-rmc>
        <cross-rmc></cross-rmc>
      </span>
      <div id="card-container">
        ${this.extensionTemplate()}
        ${this.waypointTemplate()}
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
