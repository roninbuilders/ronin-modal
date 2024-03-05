import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './styles'
import { isMobile } from '../../core/utils/mobile'
import { getModal, subModal } from '../../core/modal/store'
import type { View } from '../../core/modal/types'

@customElement('routes-modal')
export class RotesModal extends LitElement {
	static styles = styles

	@state() protected _view: View = 'main'

	protected unsubscribe: () => void

	private async _handleView(newView: View) {
		this._view = newView
	}

	constructor() {
		super()
		this._view = getModal.view()
		this.unsubscribe = subModal.view(this._handleView.bind(this))
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.unsubscribe()
	}

	getCurrentView() {
		if (isMobile() && this._view !== 'account') {
			return html`<mobile-connect-view></mobile-connect-view>`
		}
		switch (this._view) {
			case 'account':
				return html`<account-view></account-view>`
			case 'main':
				return html`<main-view></main-view>`
			case 'qr-code':
				return html`<qr-code></qr-code>`
			case 'extension':
				return html`<extension-view></extension-view>`
			case 'SIWE':
				return html`<siwe-view></siwe-view>`
			default:
				throw new Error('View is not defined - ronin-modal')
		}
	}

	render() {
		return html`${this.getCurrentView()}`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'routes-modal': RotesModal
	}
}
