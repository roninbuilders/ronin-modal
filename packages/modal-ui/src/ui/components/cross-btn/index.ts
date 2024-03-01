import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { closeModal } from '../../../core/modal'
import { modal } from '../../css/global'

@customElement('cross-rmc')
export class CrossButton extends LitElement {
	static styles = css`
    button{
      background: none;
      border: none;
      color: ${modal.color};
      padding: 9px;
      border-radius: 7px;
      margin: 0;
      cursor: pointer;
    
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all .1s ease;
      
      transition: transform .2s ease;
    }
    
    button:hover{
      transform: scale(1.1);
    }
  `

	render() {
		return html`<button @click="${closeModal}">
      <svg class="cross-svg" viewBox="0 0 24 24" width="24" height="24" style="fill: currentcolor;">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L12 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414L13.414 12l4.293 4.293a1 1 0 0 1-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L10.586 12 6.293 7.707a1 1 0 0 1 0-1.414Z" fill="currentColor"></path>
      </svg>
    </button>`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'cross-rmc': CrossButton
	}
}
