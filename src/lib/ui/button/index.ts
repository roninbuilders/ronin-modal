import {LitElement, css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import { set } from '../../store';
import { isMobile } from '../../utils/mobile';

@customElement('button-modal')
export class ButtonModal extends LitElement {

  static styles = css`
  :host{
    background-color: #FFFFFF;
    border: 1px solid #222222;
    color: #222222;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    padding: 13px;
  }
  `

  protected _open(){
    if(isMobile()) return // We open the URI on mobile
    set.open(true)
  }

  constructor() {
    super();
    this.addEventListener('click', this._open);
  }

  render() {
    return html`<slot>Open Modal</slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "button-modal": ButtonModal;
  }
}