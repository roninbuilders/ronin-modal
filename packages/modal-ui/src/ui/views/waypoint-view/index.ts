import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { styles } from './styles'

import { retry } from '../../../assets/try'
import { WAYPOINT_ID } from '../../../core/utils/constants'
import { closeModal, connectModal } from '../../../core/modal'
import { roninShiny } from '../../../assets/roninShiny'
import type { CoreStatus } from '../../../core/wallet/types'
import { getCore, subCore } from '../../../core/wallet/store'

@customElement('waypoint-view')
export class WaypointView extends LitElement {
	static styles = styles

	@state() protected _status: CoreStatus

	protected _unsubscribeStatus: () => void

	protected _onStatus(status: CoreStatus) {
		this._status = status
	}

	constructor() {
		super()
		this._status = getCore.status()
		this._unsubscribeStatus = subCore.status(this._onStatus.bind(this))
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this._unsubscribeStatus()
	}

	private statusTemplate() {
		switch (this._status) {
			case 'Connecting':
				return html`
				${roninShiny}
				<div class="text">
					<span class="status" >Requesting Connection</span>
					<span class="description" >
						Sign in with Ronin Waypoint.
					</span>
				</div>`
			case undefined:
				if (getCore.address()) {
					closeModal()
					return
				}
				return html`
      	<span class="fail-svg">
				${roninShiny}</span>
				<div class="text">
					<span>Failed to connect</span>
					<div class="button" @click="${() => connectModal(WAYPOINT_ID)}">${retry} Try Again</div>
				</div>
        `
		}
	}

	render() {
		return html`
      <span id="title" >
        <back-rmc></back-rmc>
        <title-rmc>
          Ronin Waypoint
        </title-rmc>
        <cross-rmc></cross-rmc>
      </span>
      ${this.statusTemplate()}
    `
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'waypoint-view': WaypointView
	}
}
