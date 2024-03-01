import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { styles } from './styles'

import { closeModal, goToMain } from '../../../core/modal'
import { blo } from 'blo'
import { getCore } from '../../../core/wallet'
import { roninBlue } from '../../../assets/roninBlue'

@customElement('siwe-view')
export class MobileConnectView extends LitElement {
	static styles = styles

  private signIn(){

  }

  protected profileTemplate() {
		const address = getCore.address()
		if (address)
			return html`
    <img
      alt=""
      src="${blo(address as '0x${string}', 30)}"
    />
    `
	}

	private svgTemplate() {
		return html`
    <div class="images-container" >
      <div class="pfp-border" >
        <div class="pfp" >
          ${this.profileTemplate()}
        </div>
      </div>
			${roninBlue}
    </div>
    `
	}

	render() {
		return html`
      <span id="title" >        
        <button @click="${goToMain}" id="go-back">
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-projection-id="568">
            <path d="M8 1L1 8L8 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
        <span class="title" >Sign In With Ronin</span>
        <button @click="${closeModal}" id="close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-projection-id="467">
            <path d="M1 13L13 1M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
          </svg>
        </button>
      </span>
			<hr/>
      ${this.svgTemplate()}
			<div class="text">
        Sign this message to prove you own this wallet and proceed.
			</div>
      <button class="button secondary" @click="${this.signIn}">Sign In</button>
    `
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'siwe-view': MobileConnectView
	}
}
