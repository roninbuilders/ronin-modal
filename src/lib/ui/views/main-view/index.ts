import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"
import { styles } from "./styles"

import "./small-card/index"
import { set } from "../../../store"

@customElement("main-view")
export class MainView extends LitElement {
	static styles = styles

	close() {
		set.open(false)
	}

	render() {
		return html`
      <span id="title" >
        <img src='/Ronin_Mark_White.svg' alt='' />
        <p>Connect Wallet</p>
        <button @click="${this.close}" id="close">
          <svg class="LoginDialog_closeIcon__mmEo2" viewBox="0 0 24 24" width="24" height="24" style="fill: currentcolor;">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L12 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414L13.414 12l4.293 4.293a1 1 0 0 1-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L10.586 12 6.293 7.707a1 1 0 0 1 0-1.414Z" fill="currentColor"></path>
          </svg>
        </button>
      </span>
      <div id="card-container" >
        <small-card img="/Ronin_Mark_Blue.svg" text="Browser Extension" type="extension"></small-card>
        <small-card img="/qr1.svg" text="Mobile App" type="mobile" ></small-card>
      </div>
    `
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"main-view": MainView
	}
}
