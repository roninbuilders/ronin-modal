import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import { styles } from './styles';

import { set } from '../../../store';
import { Connector, connectW3, getW3, subW3 } from '@w3vm/core';
import { Status } from '../../../types';
import { WALLETCONNECT_ID } from '../../../w3vm/constants';
import { subWC } from '@w3vm/walletconnect';

@customElement('mobile-view')
export class MobileView extends LitElement {

  static styles = styles;

  @state() protected _status: Status;
  @state() uri: string = "";

  protected _unsubscribeWait: (()=>void);
  protected _unsubscribeUri: ()=>void;

  protected _handleWait(wait: Status){
    this._status = wait
  }

  goBack(){
    set.view('main')
  }

  close(){
    set.open(false)
  }

  connect(){
    const connector = getW3.connectors().find(({ id })=> id === WALLETCONNECT_ID) as Connector
    connectW3({ connector })
  }

  protected _handleUri(uri: string){
    this.uri = uri
  }

  constructor(){
    super()
    this._status = getW3.wait()
    this._unsubscribeWait = subW3.wait(this._handleWait.bind(this))
    this._unsubscribeUri = subWC.uri(this._handleUri.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this._unsubscribeWait()
    this._unsubscribeUri()
  }

  private statusTemplate(){
    switch(this._status){
      case 'Connecting':
        return 'Connecting...'
      case undefined:
        if(getW3.address()){
          set.open(false)
          return
        }
        return html`
          <p>Failed to connect</p>
          <div class="button" @click="${this.connect}">Try Again</div>
        `
    }
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
      <img src='/Ronin_Mark_Blue.svg' alt='' />
      ${this.statusTemplate()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mobile-view": MobileView;
  }
}