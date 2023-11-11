import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import { styles } from './styles';
import { View } from '../../types';
import { set, sub } from '../../store';

import '../views/main-view/index';
import '../views/qr-code-view/index';
import '../views/extension-view/index';

@customElement('routes-modal')
export class RotesModal extends LitElement {

  static styles = styles;

  @state() protected _view: View = 'main';

  protected unsubscribe: (()=>void);

  private async _handleView(newView: View) {
    // await this.animate(
    //   [
    //     { opacity: 1, transform: 'scale(1)' },
    //     { opacity: 0, transform: 'scale(0.95)' }
    //   ],
    //   { duration: 150, easing: 'ease', fill: 'forwards' }
    // ).finished
    this._view = newView
    // await this.animate(
    //   [
    //     { opacity: 0, transform: 'scale(0.95)' },
    //     { opacity: 1, transform: 'scale(1)' }
    //   ],
    //   { duration: 150, easing: 'ease', fill: 'forwards', delay: 50 }
    // ).finished
  }

  close(){
    set.open(false)
  }

  constructor(){
    super()
    this.unsubscribe = sub.view(this._handleView.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.unsubscribe()
  }

  getCurrentView() {
    switch(this._view){
      case 'account': 
        return html`Account View`
      case 'main':
        return html`<main-view></main-view>`
      case 'qr-code':
        return html`<qr-code></qr-code>`
      case 'extension':
        return html`<extension-view></extension-view>`
      default:
        throw new Error('View is not defined - ronin-modal')
    }
  }


  render() {
    return html`${this.getCurrentView()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "routes-modal": RotesModal;
  }
}