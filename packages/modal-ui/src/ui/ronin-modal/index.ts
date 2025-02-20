import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styles } from './styles'

import './imports'
import { isMobile } from '../../core/utils/mobile'
import { classMap } from 'lit/directives/class-map.js'
import { closeModal } from '../../core/modal'
import { subModal } from '../../core/modal/store'

@customElement('ronin-modal')
export class RoninModal extends LitElement {
	static styles = styles

	@property()
	classes = { deskCard: true, mobileCard: false }

	@state() protected _open: boolean = false

	protected unsub_open: () => void

	protected _handleOpen(open: boolean) {
		this._open = open
	}

	constructor() {
		super()
		this.unsub_open = subModal.open(this._handleOpen.bind(this))

		const mobile = isMobile()
		this.classes = { deskCard: !mobile, mobileCard: mobile }
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.unsub_open()
	}

	render() {
		if (!this._open) return

		return html`
      <div id="container" @click="${closeModal}" >
        <div class="${classMap(this.classes)}" @click="${(e: Event) => e.stopPropagation()}" >
          <routes-modal></routes-modal>
        </div>
      </div>`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ronin-modal': RoninModal
	}
}
