import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { styles } from './styles';
import { set } from '../../../../store';
import { Connector, connectW3, getW3 } from '@w3vm/core';
import { INJECTED_ID, WALLETCONNECT_ID } from '../../../../w3vm/constants';

@customElement('small-card')
export class SmallCard extends LitElement {

  static styles = styles;

  @property()
  img: string = "/battle-trophy.png";
  @property()
  text?: string;
  @property()
  type?: 'extension' | 'mobile';

  changeView(){
    switch(this.type){
      case 'extension':
        set.view('extension')
        break;
      case 'mobile':
        set.view('qr-code')
        break;
      default:
        throw new Error('Invalid type in small-card element')
    }
  }

  connect(){
    if(!getW3.connectors().length) throw new Error('Connector not found - small-card')
    
    const ID = this.type === 'extension' ? INJECTED_ID : WALLETCONNECT_ID
    const connector = getW3.connectors().find(({ id })=> id === ID) as Connector
    this.changeView()
    connectW3({ connector })
  }

  render() {
    return html`
    <div @click="${this.connect}" id='card'>
      ${this.text}
      <img src="${this.img}" alt="${this.text}" />
    </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "small-card": SmallCard;
  }
}