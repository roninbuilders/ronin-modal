import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import { set } from '../../store';
import { isMobile } from '../../utils/mobile';
import { disconnectW3, getW3, subW3 } from '@w3vm/core';

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

  @state() protected _connected: boolean = false;

  protected _open(){
    if(isMobile()) return // We open the URI on mobile
    if(this._connected) return disconnectW3()
    set.open(true)
  }

  private labelTemplate(){
    const address = getW3.address()
    if(this._connected && address) return address.slice(0, 6) + '...' + address.slice(-6)
    else return 'Open Modal'
  }
  
  private _onAddressChange(address?: string){
    this._connected = Boolean(address)
  }

  constructor() {
    super();
    this._connected = Boolean(getW3.address());
    subW3.address(this._onAddressChange.bind(this))
    this.addEventListener('click', this._open);
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this._open)
  }

  render() {
    return html`<slot>${this.labelTemplate()}</slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "button-modal": ButtonModal;
  }
}