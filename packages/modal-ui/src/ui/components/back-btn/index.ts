import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { goToMain } from '../../../core/modal'
import { modal } from '../../css/global'

@customElement('back-rmc')
export class BackButton extends LitElement {
	static styles = css`
    button{
      background: none;
      border: none;
      color: ${modal.color};
      padding: 0;
      margin: 0;
      cursor: pointer;
    
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all .2s ease;
    }

    button:hover{
      transform: scale(1.1);
    }
  `

	render() {
		return html`        
    <button @click="${goToMain}">
      <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-projection-id="568">
        <path d="M8 1L1 8L8 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </button>`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'back-rmc': BackButton
	}
}
