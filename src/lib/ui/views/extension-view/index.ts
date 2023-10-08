import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import { styles } from './styles';

import './svg/index'
import { set } from '../../../store';

@customElement('extension-view')
export class ExtensionView extends LitElement {

  static styles = styles;

  goBack(){
    set.view('main')
  }

  close(){
    set.open(false)
  }

  render() {
    return html`
      <span id="title" >        
        <button @click="${this.goBack}" id="go-back">
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-projection-id="568">
            <path d="M8 1L1 8L8 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
        <p>Ronin Wallet</p>
        <button @click="${this.close}" id="close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-projection-id="467">
            <path d="M1 13L13 1M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
          </svg>
        </button>
      </span>
      <logo-svg></logo-svg>
      <p>Requesting Connection</p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "extension-view": ExtensionView;
  }
}