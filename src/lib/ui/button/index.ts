import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import { set } from '../../store';
import { isMobile } from '../../utils/mobile';

@customElement('button-modal')
export class ButtonModal extends LitElement {

  open(){
    if(isMobile()) return // We open the URI on mobile
    set.open(true)
  }

  render() {
    return html`<button @click="${this.open}" >Open Modal</button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "button-modal": ButtonModal;
  }
}