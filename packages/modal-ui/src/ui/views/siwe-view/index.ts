import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { styles } from './styles'

import { blo } from 'blo'
import { getCore } from '../../../core/wallet'
import { roninBlue } from '../../../assets/roninBlue'

@customElement('siwe-view')
export class SIWEView extends LitElement {
	static styles = styles

	private signIn() {}

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
        <cross-rmc/>
        <title-rmc>
          Sign In With Ronin
        </title-rmc>
        <cross-rmc/>
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
		'siwe-view': SIWEView
	}
}
